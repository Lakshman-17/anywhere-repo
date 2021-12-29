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

	var insFuncTemplate = document.getElementById("insertfunction-template");
	var clone = insFuncTemplate.content.cloneNode(true);
	document.body.appendChild(clone);

	var i = 2;
	while(i--){
		var filenameTemplate = document.getElementById("filename-template");
		var clone = filenameTemplate.content.cloneNode(true);
		document.getElementById("fileslist").appendChild(clone);
	}
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

var optBtn = document.getElementsByClassName("plus-btn");
for(var iter = 0; iter < optBtn.length; iter++){
	optBtn[iter].addEventListener("click",toggleOptions);
}

function toggleOptions(ev){
	var parent = ev.target.parentNode;
	parent.parentNode.classList.toggle("options-active");
}

function addOptionsEvent(){
	var subOptBtn = document.getElementsByClassName("addon-list-subitem-options");
	for(var iter = 0; iter < subOptBtn.length; iter++){
		subOptBtn[iter].addEventListener("click",toggleSubOptions);
	}
}
addOptionsEvent();

function toggleSubOptions(ev){
	var parent = ev.target.parentNode;
	parent.parentNode.classList.toggle("sub-options-active");
}

function openSubOptions(ev){
	var parent = ev.target.parentNode;
	parent.parentNode.classList.add("sub-options-active");
}

function closeSubOptions(ev){
	var parent = ev.target.parentNode;
	parent.parentNode.classList.remove("sub-options-active");
}

var insFuncPopupBtn = document.getElementById("insertfuncbtn");
insFuncPopupBtn.addEventListener("click",openFuncPopup);

function openFuncPopup(){
	document.getElementById("InsertFunctionPopup").style.display = "block";
	document.getElementById("funcnameInput").focus();
}

var closeFuncPopupBtn = document.getElementById("popup-close-btn");
closeFuncPopupBtn.addEventListener("click",closeFuncPopup);

function closeFuncPopup(){
	document.getElementById("InsertFunctionPopup").style.display = "none";
}

var funcNameSubmitBtn = document.getElementById("funcNameSubmitBtn");
funcNameSubmitBtn.addEventListener("click",doInsertFunction);

function getFilesList(){
	var list = ['file1.zs','file2.zs'];
	var i = list.length;
	while(i--){
		var filenameTemplate = document.getElementById("filename-template");
		var clone = filenameTemplate.content.cloneNode(true);
		// clone.firstElementChild.firstElementChild.firstElementChild.value = list[i];
		document.getElementById("fileslist").appendChild(clone);
		// document.getElementById("fileslist").lastElementChild.firstElementChild.firstElementChild.firstElementChild.value = list[i];
	}
} 

function enterEvent(){
	var flist = document.getElementsByClassName("filename");
	for(var iter = 0; iter < flist.length; iter++){
		flist[iter].addEventListener('keypress', (event) => {
		  const keyName = event.key;
		  if (keyName === 'Enter') {
		    event.target.setAttribute("readonly",true)
		  }
		}, false);
	}
}
enterEvent();

function addRenameEvent(){
	var renameBtn = document.getElementsByClassName("btnRename");
	for(var iter = 0; iter < renameBtn.length; iter++){
		renameBtn[iter].addEventListener("click",activeRename);
	}
}
addRenameEvent();

function activeRename(ev){
	var ip = ev.target.parentNode.parentNode;
	var field = ip.firstElementChild.firstElementChild;
	field.removeAttribute("readonly");
	field.focus();
  	field.select();
}

function addDeleteEvent(){
	var delBtn = document.getElementsByClassName("btnDelete");
	for(var iter = 0; iter < delBtn.length; iter++){
		delBtn[iter].addEventListener("click",deleteFile);
	}	
}
addDeleteEvent();

function deleteFile(ev){
	var file = ev.target.parentNode.parentNode.parentNode;
	file.remove();
}


document.getElementById("newHTML").addEventListener("click",addNewHtmlFile);

function addNewHtmlFile(){
	var filenameTemplate = document.getElementById("filename-template");
	var clone = filenameTemplate.content.cloneNode(true);
	clone.getElementById("filerename").value = "untitled.html";
	document.getElementById("fileslist").appendChild(clone);
	addOptionsEvent();
	addRenameEvent();
	enterEvent();
	addDeleteEvent();
}

document.getElementById("newScript").addEventListener("click",addNewScriptFile);

function addNewScriptFile(){
	var filenameTemplate = document.getElementById("filename-template");
	var clone = filenameTemplate.content.cloneNode(true);
	clone.getElementById("filerename").value = "untitled.zs";
	document.getElementById("fileslist").appendChild(clone);
	addOptionsEvent();
	addRenameEvent();
	enterEvent();
	addDeleteEvent();
}



// Note: Hint: editor menubar functionalities 

var doc = editor.getDoc();
var func_count = 0;
var func_list = [];

document.getElementById("undobtn").addEventListener("click",doUndo);
document.getElementById("redobtn").addEventListener("click",doRedo);
document.getElementById("findreplacebtn").addEventListener("click",doFindAndReplace);
// document.getElementById("insertfuncbtn").addEventListener("click",doInsertFunction);

document.getElementById("redobtn").disabled = true;
document.getElementById("undobtn").disabled = true;
document.getElementById("savebtn").disabled = true;

function updateDoButtons(){
	if(doc.historySize().undo == 0){
		document.getElementById("undobtn").disabled = true;
	}
	else{
		document.getElementById("undobtn").disabled = false;	
	}
	if(doc.historySize().redo == 0){
		document.getElementById("redobtn").disabled = true;
	}
	else{
		document.getElementById("redobtn").disabled = false;	
	}
	// 	console.log(doc.historySize().undo);
	// 	console.log(doc.historySize().redo);
}
editor.on("change",updateDoButtons);

function updateSaveButton(){
	document.getElementById("savebtn").disabled = false;
}
editor.on("change",updateSaveButton);

function doUndo(){
	editor.execCommand("undo");
}

function doRedo(){
	editor.execCommand("redo");
}

function doFindAndReplace(){
	editor.execCommand("replace");
}

function doInsertFunction(){
	var fnname = document.getElementById("funcnameInput");
	if(fnname.value != ""){
		doc.setValue(doc.getValue() + "function "+ fnname.value + "()\n{\n}\n");
		closeFuncPopup();
		fnname.value = "";
		editor.setCursor(doc.lineCount())
		editor.focus();
	}
	else{
		window.alert("pls enter a func name");
	}
}

function countFunctions(){
	func_count = 0;
	func_list = [];
	var totallines = editor.lineCount();
	for(var iter = 0; iter < totallines ; iter++){
		var tokenlist = editor.getLineTokens(iter);
		var tokcount = tokenlist.length;
		for(var t = 0 ; t < tokcount ; t++){
			if(typeof(tokenlist[t]) != "undefined")
			{
				if(tokenlist[t].string == "function"){
					if(typeof(tokenlist[t+2]) != "undefined"){
						if(t+2 <= tokcount){
							if(tokenlist[t+2].string != "function" && tokenlist[t+2].string != "(" && tokenlist[t+2].string != ")"){
								func_count++;
								var obj = {"fid" : func_count , "fname" : tokenlist[t+2].string , "fline" : iter};
								func_list.push(obj);
							}
						}
					}
				}
			}
		}
	}
	document.getElementById('selectFunction').innerHTML = "";

	if(func_count > 0){
		var select_elem = document.getElementById('selectFunction');
		for(var i = 0 ; i < func_list.length ; i++){
			var option_elem = document.createElement('option');
			option_elem.value = func_list[i].fid ;
			option_elem.textContent = func_list[i].fname ;
			option_elem.style.width = '150px';
			select_elem.appendChild(option_elem);
		}
	}
	else{
		var select_elem = document.getElementById('selectFunction');
		var option_elem = document.createElement('option');
		option_elem.value = null ;
		option_elem.textContent = "-- no func yet --" ;
		option_elem.style.width = '150p';
		select_elem.appendChild(option_elem);
	}
}
editor.on("cursorActivity",countFunctions);

function scrollToFunction(){
	var val = document.getElementById('selectFunction').value;
	var ln = 0;
	if(val != null){
		for(var fi = 0 ; fi < func_list.length ; fi++){
			if(func_list[fi].fid == val){
				ln = func_list[fi].fline ;
				func_list[fi].selectedIndex = fi;
			}
		}
		editor.focus();
		editor.setCursor({line: ln , ch: 0});
	}
}
document.getElementById("selectFunction").addEventListener("change",scrollToFunction);

//
//
// Note:Hint: editor autocomplete feature
//
//

var var_count = 0;
var var_details = [];
var var_name_list = [];

function getV(){
	// STATUS_VAR_COUNT.innerHTML = 0;
	var_count = 0;
	var_details = [];
	var_name_list = [];
	var totallines = editor.lineCount();
	var curs = editor.getCursor();
	var startToken;
	var tokChangeLabel = 0;
	console.clear();
	for(var iter = 0; iter < totallines ; iter++){
		var tokenlist = editor.getLineTokens(iter);
		var tokcount = tokenlist.length;
		var semicolon_found = -1;
		var t;
		var pending = 0;
		if(tokChangeLabel == 0){
			t = 0;
		}
		else{
			t = startToken;			console.log("start token : " + startToken + " iter : " + iter);
			tokChangeLabel = 0;
			startToken = 0;
		}
		var skip = false;
		if( pending == 0 ){
			// for(var t = 0 ; t < tokcount && skip== false ; t++){
			for(; t < tokcount && skip== false ; t++){
				if(tokenlist[t].string == "var" || tokenlist[t].string == "let" || tokenlist[t].string == "const"){
					++var_count;
					var type_found = 0;
					var equal_sign_found = 0;
					var is_variable = 0;
					var is_operator = 0;
					pending = 1;
					var tname = "";
					if(tokcount >= 3){
						if(typeof(tokenlist[t+2]) != "undefined"){
							tname = tokenlist[t+2].string;
						}
					}
					var ttype = "undefined";
					var tvalue =  "";
					while(t < tokcount && skip == false){
						if(typeof(tokenlist[t]) == "undefined"){
							continue;
						}
						if(tokenlist[t].string == ";"){
							t++;
							pending = 0;
							break;
						}
						if(equal_sign_found == 1){
							tvalue += tokenlist[t].string;
						}
						if(tokenlist[t].string == "="){
							equal_sign_found = 1;
							t++;
							continue;
						}
						if(tokenlist[t].type == "number"){
							ttype = tokenlist[t].type;
							type_found = 1;
						}
						if(tokenlist[t].type == "string"){
							ttype = tokenlist[t].type;
							type_found = 1;
						}
						if(tokenlist[t].string == "["){
							ttype = "array";
							type_found = 1;
						}
								//console.log("t val : " + t + " str : " + tokenlist[t].string);
						if(tokenlist[t].type == "variable"){
							if(t+1 < tokcount){
								if(tokenlist[t+1].string != "."){
									var vdetails = isVariable(tokenlist[t].string);
									if(vdetails.found == true){
										ttype = vdetails.vtype;
									}
									else{
										var cdetails = isClass(tokenlist[t].string);
										if(cdetails.found == true){
											ttype = cdetails.ctype;
										}
									}
								}
								else if (tokenlist[t+1].string == "."){
									// break here
									var stop = false;
									var curline = iter;
									var linlist = new LinkedList();
									var toklist = editor.getLineTokens(curline);
									var tokcount = toklist.length;
									var itr = t;
									var notfound = true;
									var start = 0;
									var semicolonfound = 0;
									while(stop != true && curline < totallines && notfound == true && semicolonfound == 0){
										var toklist = editor.getLineTokens(curline);			//console.log("curline : " + curline);
										for( ; itr < tokcount ; itr++){
											if(curline == iter){
												if(toklist[itr].type == "variable" && start == 0){
													linlist.insertAtEnd(toklist[itr].string);
													start = 1;
												}
											}
											if(start == 1){
												if(typeof(toklist[itr]) != "undefined") {		//console.log(toklist[itr].string);
													if(toklist[itr].type == "keyword" || toklist[itr].string == "="){
														stop = true;
														continue;
													}
													if(toklist[itr].string.trim() == ""){
														continue;
													}
													linlist.insertAtEnd(toklist[itr].string);	//console.log("inserted : " + toklist[itr].string);
													if(toklist[itr].string ==";"){		//console.log("found ;");
														semicolonfound = 1;
														stop = true;
														notfound = false;
														break;
													}
												}
											}
										}	// end of for
										if(stop == false){	//console.log("stop is false after for loop with curline = " + curline);
											if(curline+1 <= totallines){
												curline++;	//console.log("go to next line : " + curline);
												itr = 0;
											}
											else{
												stop = true;
											}
										}
									}	// end of while
									if(notfound == false){
										// if(curline - 1 >= 0 ){
											// 	iter = curline - 1;
										// }
										if(curline == iter){
											iter = curline - 1;
											tokChangeLabel = 1;
											startToken = itr;
										}
										else {
											iter = curline - 1;
											tokChangeLabel = 0;
											startToken = 0;
										}
										// iter = curline;
										var exparr = linlist.printList();	console.log(exparr);
										var typereturned = parseCode(exparr);
										ttype = typereturned;
										tvalue = linlist.printAsString(); 	console.log(tvalue);
										pending = 0;
										skip = true;
									}
									// break here
								}	// end of else if
							}
						}
						if(skip == false){
							t++;
						}
						
					}	// end of while
					if(pending == 0){
						// STATUS_VAR_COUNT.innerHTML = ++var_count;
						var_name_list.push(tname);
						addObj(tname,ttype,tvalue);
						console.log(tname + " , " + ttype + " , " + tvalue);
					}
				}
			}
		}
	}
	if(var_name_list.length != 0){
		// STATUS_VAR_LIST.innerHTML = JSON.stringify(var_name_list);
		// STATUS_VAR_TYPE_DETAILS.innerHTML = JSON.stringify(var_details);
	}
	else{
		// STATUS_VAR_LIST.innerHTML = "list emptty";
	}
}
editor.on("cursorActivity", getV);

function addObj(vname,vtype,vvalue){
	var obj = { "var_name" : vname , "var_type" : vtype , "var_value" : vvalue };
	var_details.push(obj);
	console.log(JSON.stringify(obj));
}

function checkAutoComplete(){
	var curs = editor.getCursor();
	if(editor.getTokenAt(curs).string == "."){
		editor.execCommand("autocomplete");
	}
	if(/[a-zA-Z]/.test(editor.getTokenAt(curs).string) == true){
		editor.execCommand("autocomplete");	
	}
}
editor.on("inputRead",checkAutoComplete); 

//
// 
// Note; Hint: editor show parameter of function functionality
//
//

function getType(curcurs, openpos, closepos, toklist){
	console.log("openpos : " + openpos + " , closepos : " + closepos + " ,  toklist : " + toklist);
	var tokenlist = toklist;
	var stop = false;
	var curline = curcurs.line;
	var linlist = new LinkedList();
	var tokcount = toklist.length;0
	var itr = 0;
	var inputcount = 0;
	var notfound = true;
	comma_pos = [];
	// var rem = 3;
	itr = openpos-1;
	// console.log("curcurs : " + curcurs);
	// console.log("toklist count: " + tokcount);
	// console.log("openpos : " + openpos);
			// not finding the rvalue properly when func is in next lines
	while(stop == false && notfound == true){
		for( ; itr >= 0 && stop == false ; itr--){
			if(typeof(toklist[itr]) == "undefined"){
				continue;
			}
			if(toklist[itr].string.trim() == "" || toklist[itr].string == "\t"){
				continue;
			}
			if(toklist[itr].type == "keyword"){
				stop = true;
				break;
			}
			if(toklist[itr].string == "=" || toklist[itr].string == ";" || toklist[itr].string == "{" || toklist[itr].string == "}" ){
				stop = true;
				notfound = false;
				break;
			}
			linlist.insertAtEnd(toklist[itr].string);		//console.log("inserted now : " + toklist[itr].string);
			inputcount++;
		}		// end of for in while
		if(stop == false){
			if(curline -1 >= 0){
				curline = curline-1;
				toklist = editor.getLineTokens(curline);
				tokcount = toklist.length;
				itr = tokcount - 1;
			}
			else{
				notfound = false;
				stop = true;
			}
		}
	}		// end of while
	if(notfound == false){
		// if(inputcount == 1){
			// 	return linlist.printAsString();
		// }
		linlist.reverseList();
		var arrexp = linlist.printList();
		var explen = arrexp.length;
		var expPart = arrexp.slice(0,explen-2);		console.log("expPart leng: " + expPart.length);
		var param;
		if(expPart.length == 1){
			param = getParam(expPart[0],arrexp[explen-1]);
		}
		else{
			expPart.push(";");
			var rvalue = parseCode(expPart);
			console.log("rvalue is : " + rvalue);
			// console.log("print as list");
			// console.log(linlist.printList());
			console.log("print as string");
			console.log(linlist.printAsString());
			param = getParam(rvalue,arrexp[explen-1]);
		}
		var np = param.length;
		// STATUS_SHOW_PARAM.innerHTML = param;
		// STATUS_SHOW_PARAM_COUNT.innerHTML = np;
		// STATUS_SHOW_CUR_PARAM.innerHTML = "";
		console.log("params are : " + param);
		if(np > 0){
			for(var it = openpos; it < closepos; it++){
				// if(typeof(toklist[it]) != "undefined"){
					// console.log("tokenlist printed " + tokenlist[it].string)
				if(tokenlist[it].string == ","){
					comma_pos.push(tokenlist[it].start);
					if(comma_pos.length == np-1){
						break;
					}
				}
			// }
			}
			console.log("comma pos printed " + comma_pos)
			if(typeof(param_hint) != "undefined"){
				if(param_hint.parentNode){
					document.body.removeChild(param_hint);
				}
			}
			console.log("start of box creation");
			param_hint = param_hint = document.createElement("P");
			param_hint.className = HINT_PARAM_CLASS;
			param_hint.id = "parambox";
			curpos = editor.cursorCoords(editor.getCursor());
			param_hint.style.left = curpos.left + "px";
			param_hint.style.top = (curpos.top - 60) + "px";
			document.body.appendChild(param_hint);
			parambox = document.getElementById("parambox");
			//console.log("after append box + comma leng " + comma_pos.length);
			if(comma_pos.length == 0){
				// STATUS_SHOW_CUR_PARAM.innerHTML = param[0];
				// param_hint.innerHTML = param[0];
				parambox.innerHTML = param[0];
				return;
			}
			for(var c = 0; c < comma_pos.length && c < np; c++){			//console.log("wthin loop");
				if(c == 0){
					if(openbrackCh <= curcurs.ch && curcurs.ch <= comma_pos[c]){
						// STATUS_SHOW_CUR_PARAM.innerHTML = param[0];
						parambox.innerHTML = param[0];
						// console.log("within comma 1");
						break;
					}
				}
				if(c == comma_pos.length-1){
					if(comma_pos[c] <= curcurs.ch && curcurs.ch <= closebrackCh){
						if(c == np-1){
							// STATUS_SHOW_CUR_PARAM.innerHTML = param[np-1];
							parambox.innerHTML = param[np-1];
							// param_hint.innerHTML = param[np-1];
							// console.log("within comma last");
						}
						else{
							// STATUS_SHOW_CUR_PARAM.innerHTML = param[c+1];
							parambox.innerHTML = param[c+1];
							// console.log("within comma last");
						}
						break;
					}
				}
				if(c+1 <= comma_pos.length){
					if(comma_pos[c] <= curcurs.ch && curcurs.ch <= comma_pos[c+1]){
						// STATUS_SHOW_CUR_PARAM.innerHTML = param[c+1];
						parambox.innerHTML = param[c+1];
						// console.log("within comma between");
						break;
					}
				}
			}
			console.log("comma pos : " + JSON.stringify(comma_pos));
		}
		return ;
	}
}		// end of fun

var HINT_PARAM_CLASS= "CodeMirror-hint-param";
var parambox;
var curpos;
		
function getParam(cls,fun){			//console.log("getParam args : " + cls + " , " + fun);
	var label = 0;
	for(var ci = 0; ci < macro_classes.length && label == 0 ; ci++){
		if(macro_classes[ci].class_name == cls){
		for(var mi = 0 ; mi < macro_classes[ci].method.length ; mi++){
			if(macro_classes[ci].method[mi].mname == fun){
				// STATUS_SHOW_PARAM.innerHTML = macro_classes[ci].method[mi].parameters;
				label = 1;
				return macro_classes[ci].method[mi].parameters;
			}
		}
	}
}
if(label == 0){
	var varn = var_details.length;
	for(var i = 0; i < varn; i++)
	{
		if(var_details[i].var_name == cls){
			label = 1;
			return getParam(var_details[i].var_type,fun);
		}
	}
	if(label == 0){
		return null;
	}
	// STATUS_SHOW_PARAM.innerHTML = "";
}
}
// break here
var param_hint;
var paramDispOn = false;
var limitStart;
var limitEnd;
var limitLine;
var openbrackTokenPos;
var openbrackCh;
var closebrackCh;
var closebrackTokenPos;
var funOpen = false;
var closeBrackFound = false;
// var n_of_commas = -1;
var comma_pos = [];

function checkFunctionOpen(){			//console.log("in checkFunctionOpen");
	if(paramDispOn == false){
		var cur = editor.getCursor();
		var curToken = editor.getTokenAt(cur);	//console.log(curToken.string);
		if(curToken.string == "("){			//console.log("yes fun open ");
			funOpen = true;
			limitStart = cur.ch;
			limitLine = cur.line;	
			var tokens = editor.getLineTokens(cur.line);
			// var t;
			for(var iter = 0 ; iter < tokens.length; iter++){
				if(tokens[iter].end == cur.ch){
					// t = iter;
					openbrackTokenPos = iter;
					openbrackCh = tokens[iter].end;
					break;
				}
			}
			// checkInsideBrackets(cur);
		}
	}
}
editor.on("cursorActivity",checkFunctionOpen);

// editor.on("inputRead",checkDisplayParam);

// function checkDisplayParam(){
// 	var curs = editor.getCursor();
// 	var token = editor.getTokenAt(curs);
// 	if(token.string == "("){
// 		checkFunctionOpen();
// 		checkInsideBrackets();
// 	}
// }


editor.on("cursorActivity",checkInsideBrackets);

function checkInsideBrackets(){
	if(funOpen == false){
		// STATUS_SHOW_PARAM.innerHTML = "fun open false";
		// STATUS_SHOW_PARAM_COUNT.innerHTML = "";
		// STATUS_SHOW_CUR_PARAM.innerHTML = "";
		// parambox.innerHTML = "";
	
		if(typeof(param_hint) != "undefined"){
			if(param_hint.parentNode){
				document.body.removeChild(param_hint);
			}
		}
		return;
	}
	var brackets = 0;
	var cur = editor.getCursor();
	var tokens = editor.getLineTokens(cur.line);
	for (var iter = openbrackTokenPos; iter < tokens.length; iter++){
		if(tokens[iter].string == "("){
			brackets++;
		}
		if(tokens[iter].string == ")"){
			brackets--;
			if(brackets == 0){
				limitEnd = tokens[iter].start;
				closeBrackFound = true;
				closebrackTokenPos = iter;
				closebrackCh = tokens[iter].start;
				break;
			}
		}
	}
	if(closeBrackFound == false){
		return;
	}
	if(cur.line != limitLine){
		funOpen = false;
		paramDispOn = false;
		// STATUS_SHOW_PARAM.innerHTML = "not at line";
		// STATUS_SHOW_PARAM_COUNT.innerHTML = "";
		// STATUS_SHOW_CUR_PARAM.innerHTML = "";
		parambox.innerHTML = "";
		if(typeof(param_hint) != "undefined"){
			if(param_hint.parentNode){
				document.body.removeChild(param_hint);
			}
		}
		return;
	}
	console.log("ls : " + limitStart); console.log("le : " + limitEnd); console.log("ll : " + limitLine); console.log("cc : " + cur.ch);
	if( limitStart <= cur.ch && cur.ch <= limitEnd){		console.log("yes within limit");
		paramDispOn = true;
		// STATUS_SHOW_PARAM.innerHTML = "parameters can show";
		getType(cur,openbrackTokenPos,closebrackTokenPos,tokens);
	}
	else {
		funOpen = false;
		paramDispOn = false;
		// STATUS_SHOW_PARAM.innerHTML = "not within lmt";
		// STATUS_SHOW_PARAM_COUNT.innerHTML = "";
		// STATUS_SHOW_CUR_PARAM.innerHTML = "";
		parambox.innerHTML = "";
		if(typeof(param_hint) != "undefined"){
			if(param_hint.parentNode){
				document.body.removeChild(param_hint);
			}
		}
		return;
	}
}