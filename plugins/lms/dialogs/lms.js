(function () {
	var dataTableIdentifier = "dataTable";
	var fieldIdentifier = "field";

	function insertTemplate(editor, html) {
		var dialog = CKEDITOR.dialog.getCurrent();
		editor.insertHtml(html);
		dialog.hide();
	}

//field dialog
	CKEDITOR.dialog.add(fieldIdentifier, function (editor) {
		return {
			title: editor.lang.lms.fieldDialogTitle,
			minWidth: CKEDITOR.env.ie ? 440 : 400,
			minHeight: 120,
			contents: [{
                id: "field",
				elements: [{
					type: "text",
					padding: 5,
					label: editor.lang.lms.fieldNameInFieldDialog,
					id: "fieldName",
					validate: function () {
						if (!this.getValue()) {
							window.alert(editor.lang.lms.fieldNameCannotEmpty);
							return false;
						}
					}
				}]
			}],

			buttons: [CKEDITOR.dialog.okButton],
            onOk: function () {
				var fieldName = this.getContentElement('field', 'fieldName');
                insertTemplate(editor, "{{**" + fieldName.getValue() + "**}}");
            }
		};
	});
	CKEDITOR.dialog.add(dataTableIdentifier, function (editor) {
		return {
			title: editor.lang.lms.dataTableDialogTitle,
			minWidth: CKEDITOR.env.ie ? 440 : 400,
			minHeight: 120,
			contents: [{
                id: "dataTable",
                elements: [{
                    id: "tableName",
                    type: "text",
                    padding: 5,
                    label: editor.lang.lms.tableNameInDataTableDialog,
					validate: function () {
						if (!this.getValue()) {
							window.alert(editor.lang.lms.tableNameCannotEmpty);
							return false;
						}
					}
                }, {
						id: "fieldNames",
						type: "text",
						padding: 5,
						label: editor.lang.lms.fieldNamesInDataTableDialog,
						default: "foo,bar"
					}]
            }],

			buttons: [CKEDITOR.dialog.okButton],
            onOk: function () {
				var tableValue = this.getContentElement('dataTable', 'tableName').getValue();
				var fieldValues = this.getContentElement('dataTable', 'fieldNames').getValue();
				var joinedFieldvalues = function () {
					if(fieldValues==null||fieldValues=="") return "";
					var array = fieldValues.split(",");
					var result = "";
					array.forEach(function (element) {
						result = "{{**" + element + "**}}" + result;
					}, this);
					return result;
				}

				var html = '{{$$TableStart:' + tableValue + '$$}}' +
					joinedFieldvalues() +
					'{{$$TableEnd:' + tableValue + '$$}}'
                insertTemplate(editor, html);
            }
		};
	});
})();
