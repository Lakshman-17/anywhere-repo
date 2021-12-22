"use strict";

if("content" in document.createElement("template")){
	var titleTemplate = document.getElementById("titlebar-template");
	var clone = titleTemplate.content.cloneNode(true);
	document.body.appendChild(clone);

	var sideBarTemplate = document.getElementById("sidebar-template");
	var clone = sideBarTemplate.content.cloneNode(true);
	document.body.appendChild(clone);	

	var addonBarTemplate = document.getElementById("addon-list-template");
	var clone = addonBarTemplate.content.cloneNode(true);
	document.body.appendChild(clone);	

	var editorMenuBarTemplate = document.getElementById("editor-menu-template");
	var clone = editorMenuBarTemplate.content.cloneNode(true);
	document.body.appendChild(clone);	
	
	var editorTemplate = document.getElementById("editor-template");
	var clone = editorTemplate.content.cloneNode(true);
	document.body.appendChild(clone);
}

var editor = CodeMirror.fromTextArea(document.getElementById("editorarea"), {
	lineNumbers : true,
	tabSize : 4,
	mode : {name: "javascript", globalVars: true},
	theme : "material-darker",
	matchBrackets : true,
	autoCloseBrackets : true,
	autofocus : true,
	foldGutter : true,
	autohint: true,
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] ,
	extraKeys : {"Ctrl-Space" : "autocomplete",
				"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
				"Shift-Tab" : "indentLess"
				},
	scrollbarStyle : "overlay",
});