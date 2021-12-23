"use strict";


if("content" in document.createElement("template")){
	var title = document.getElementById("title");
	var container = document.getElementById("container");
	var leftpane = document.getElementById("leftpane");
	var tools = document.getElementById("tools");
	var editorbox = document.getElementById("editorbox");

	var template = document.getElementById("JSMACRO-TITLE");
	var clone = template.content.cloneNode(true);
	title.appendChild(clone);

	var template = document.getElementById("JSMACRO-LEFTPANE");
	var clone = template.content.cloneNode(true);
	leftpane.appendChild(clone);

	var template = document.getElementById("JSMACRO-EDITORMENU");
	var clone = template.content.cloneNode(true);
	tools.appendChild(clone);

	var template = document.getElementById("JSMACRO-EDITORBLOCK");
	var clone = template.content.cloneNode(true);
	editorbox.appendChild(clone);

	var template = document.getElementById("test-template");
	var clone = template.content.cloneNode(true);
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

var plusButtons = document.getElementsByClassName("plusbtn");
for(var iter = 0; iter < plusButtons.length; iter++){
	plusButtons[iter].addEventListener("click",function(){
		var temp = document.getElementById("sub-options");
		if(temp.style.display == "block")
			temp.style.display = "none";
		else
			temp.style.display = "block";
	})
}