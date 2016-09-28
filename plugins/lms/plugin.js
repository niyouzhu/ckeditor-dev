( function() {
	var dataTableIdentifier="dataTable";
	var fieldIdentifier="field";
	CKEDITOR.plugins.add( "lms", {
		requires: 'dialog',
		//icons: '123.png', // %REMOVE_LINE_CORE%
		// jscs:disable maximumLineLength
		lang: 'en', // %REMOVE_LINE_CORE%
		// jscs:enable maximumLineLength		
		init: function( editor ) {
			CKEDITOR.dialog.add( dataTableIdentifier, CKEDITOR.getUrl( this.path + 'dialogs/lms.js' ) );
			CKEDITOR.dialog.add( fieldIdentifier, CKEDITOR.getUrl( this.path + 'dialogs/lms.js' ) );
			editor.addCommand( dataTableIdentifier, new CKEDITOR.dialogCommand( dataTableIdentifier) );
			editor.addCommand( fieldIdentifier, new CKEDITOR.dialogCommand( fieldIdentifier) );
			editor.ui.addButton && editor.ui.addButton( fieldIdentifier, {
				label: editor.lang.lms.buttonDataTable,
				command: dataTableIdentifier,
				icon:this.path+'icons/templates.png'
			} );
			editor.ui.addButton && editor.ui.addButton( dataTableIdentifier, {
				label: editor.lang.lms.buttonField,
				command: fieldIdentifier,
				icon:this.path+'icons/templates.png'
			} );
		}
	} );
} )();