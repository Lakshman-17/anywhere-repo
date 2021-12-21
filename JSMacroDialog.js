"use strict";


if("content" in document.createElement("template")){
	var template = document.getElementById("JSMACRO-GRID");
	var clone = template.content.cloneNode(true);
	document.body.appendChild(clone);

var container = document.getElementById("grid-container");


	var template = document.getElementById("JSMACRO-TITLE");
	var clone = template.content.cloneNode(true);
	container.appendChild(clone);

	var template = document.getElementById("JSMACRO-LEFTPANE");
	var clone = template.content.cloneNode(true);
	container.appendChild(clone);
		
	var template = document.getElementById("JSMACRO-EDITORMENU");
	var clone = template.content.cloneNode(true);
	container.appendChild(clone);

	// var template = document.getElementById("JSMACRO-EDITORBLOCK");
	// var clone = template.content.cloneNode(true);
	// container.appendChild(clone);

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
}
