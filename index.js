var editor = CodeMirror.fromTextArea(document.getElementById("editorarea"), {
	lineNumbers : true,
	tabSize : 4,
	mode : {name: "javascript", globalVars: true},
	theme : "material-darker",
	matchBrackets : true,
	autofocus : true,
	foldGutter : true,
	autohint: true,
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] ,
	extraKeys : {"Ctrl-Space" : "autocomplete",
				"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
				"Shift-Tab" : "indentLess"
				},
	scrollbarStyle : "overlay",
	// gutters: ["CodeMirror-lint-markers"],
	// lint: true
});

var var_count = 0;
var var_name_list = [];

function changetheme(){
	if(editor.getOption("theme") == "default"){
		editor.setOption("theme","material-darker");
	}
	else{
		editor.setOption("theme","default");	
	}
}

function togglelineno(){
	if(editor.getOption("lineNumbers") == true){
			editor.setOption("lineNumbers",false);
		}
		else{
			editor.setOption("lineNumbers",true);
		}
}

function changetabsize(){
	let val = document.getElementById('selecttabsize').value;
	editor.setOption("tabSize",val);
}

function doundo(){
	editor.execCommand("undo");
}

function doredo(){
	editor.execCommand("redo");
}

function dogoto(){
	editor.execCommand("jumpToLine");	
}

function doFind(){
	editor.execCommand("find");
}

function doReplace(){
	editor.execCommand("replace");
}

function doPrettyPrint(){
	editor.execCommand("indentAuto");	
//	autoFormatSelection();
}

function doSelectAll(){
  	editor.execCommand("selectAll");
	}

	function getCursorPos(){
		let obj = editor.getCursor();
		document.getElementById("dispCursor").innerHTML =	"obj values " + obj.line;
	}

const STATUS_CURRENT_LINE = document.getElementById('line-no.');

const onCursorActivity = (instance) => {
  const cursor = editor.getCursor();
  STATUS_CURRENT_LINE.textContent = cursor.line + 1;
  document.getElementById("total-line").textContent = editor.lineCount();
}

editor.on("cursorActivity", onCursorActivity);

const STATUS_VAR_COUNT = document.getElementById("varcount");
const STATUS_VAR_LIST = document.getElementById("varlist");
const STATUS_VAR_TYPE_DETAILS = document.getElementById("vardetails");

var var_details = [];

function getV(){
	STATUS_VAR_COUNT.innerHTML = 0;
	var_details = [];
	var_name_list = [];
	let totallines = editor.lineCount();
	let curs = editor.getCursor();
console.clear();
	for(let iter = 0; iter < totallines ; iter++){
		let tokenlist = editor.getLineTokens(iter);
		let tokcount = tokenlist.length;
		let semicolon_found = -1;	
		let pending = 0;
		let skip = false;
		if( pending == 0 ){
			for(let t = 0 ; t < tokcount && skip== false ; t++){
				if(tokenlist[t].string == "var" || tokenlist[t].string == "let" || tokenlist[t].string == "const"){
					++varcount;
					let type_found = 0;
					let equal_sign_found = 0;
					let is_variable = 0;
					let is_operator = 0;
					pending = 1;
					let tname = "";
					if(tokcount >= 3){
						if(typeof(tokenlist[t+2]) != "undefined"){
							tname = tokenlist[t+2].string;
						}
					}							
					let ttype = "undefined";
					let tvalue =  "";
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
									let vdetails = isVariable(tokenlist[t].string); 
									if(vdetails.found == true){
										ttype = vdetails.vtype;
									}
									else{
										let cdetails = isClass(tokenlist[t].string); 
										if(cdetails.found == true){
											ttype = cdetails.ctype;
										}	
									}
								}
								else if (tokenlist[t+1].string == "."){
									
						// break here			
									let stop = false;
									let curline = iter;
									let linlist = new LinkedList();
									let toklist = editor.getLineTokens(curline);
									let tokcount = toklist.length;
									let itr = t;
									let notfound = true;
									let start = 0;
									let semicolonfound = 0;

									while(stop != true && curline < totallines && notfound == true && semicolonfound == 0){
										let toklist = editor.getLineTokens(curline);			console.log("curline : " + curline);
										for( ; itr < tokcount ; itr++){	
											if(curline == iter){
												if(toklist[itr].type == "variable" && start == 0){
													linlist.insertAtEnd(toklist[itr].string);
													start = 1;
												}
											}
											if(start == 1){
												if(typeof(toklist[itr]) != "undefined") {		console.log(toklist[itr].string);
													if(toklist[itr].type == "keyword" || toklist[itr].string == "="){
														stop = true;
														continue;
													}
													if(toklist[itr].string.trim() == ""){
														continue;
													}
													linlist.insertAtEnd(toklist[itr].string);	console.log("inserted : " + toklist[itr].string);
													if(toklist[itr].string ==";"){		console.log("found ;");
														semicolonfound = 1;
														stop = true;
														notfound = false;
														break;
													}
												}
											}
										}

										if(stop == false){	console.log("stop is false after for loop with curline = " + curline);
											if(curline+1 <= totallines){
												curline++;	console.log("go to next line : " + curline);
												itr = 0; 
											}
											else{
												stop = true;
											}
										}
									}
									if(notfound == false){
										iter = curline;
										let exparr = linlist.printList();	console.log(exparr);
										let typereturned = parseCode(exparr);
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
						
					}	// end of if
					if(pending == 0){
						STATUS_VAR_COUNT.innerHTML = ++var_count;
						var_name_list.push(tname);
						addObj(tname,ttype,tvalue);	
console.log(tname + " , " + ttype + " , " + tvalue);
					}
				}
			}
		}
	}
	if(var_name_list.length != 0){
		STATUS_VAR_LIST.innerHTML = JSON.stringify(var_name_list);
		STATUS_VAR_TYPE_DETAILS.innerHTML = JSON.stringify(var_details);
	}
	else{
		STATUS_VAR_LIST.innerHTML = "list emptty";
	}
}

editor.on("cursorActivity", getV);

function isClass(cstr){
	for(let citer = 0 ; citer < macro_classes.length ; citer++){
		if(macro_classes[citer].class_name == cstr){
			return {"found" : true, "ctype" : macro_classes[citer].class_name};
		}
	}
	return {"found" : "false"};
}

function isVariable(vstr){
	for(let variter = 0 ; variter < var_details.length ; variter++){
		if(var_details[variter].var_name == vstr){
			console.log("found and " + var_details[variter].var_type);
			return {"found" : true, "vtype" : var_details[variter].var_type};
		}
	}
	return {"found" : "false"};
}

function checkIfVar(){
	let cur = editor.getCursor();
	// if(containsVar(cur.line) == true && containsSemicolon(cur.line) == true){
		if(containsSemicolon(cur.line) == true){
			getVariables();
		}
}


editor.on("inputRead", function(instance) {
    if (instance.state.completionActive) {
            return;
    }
    let cur = instance.getCursor();
    let token = instance.getTokenAt(cur);
    if (token.type && token.type != "comment") {
            CodeMirror.commands.autocomplete(instance);
    }
});



function containsVar(curline){
	let curtokelist = editor.getLineTokens(curline);
	let ntoke = curtokelist.length;
	for(let tc = 0; tc < ntoke ; tc++){
		if(curtokelist[tc].string == "var" || curtokelist[tc].string == "let" || curtokelist[tc].string == "const"){
			return true;
		}
	}
}

function containsSemicolon(curline){
	let curtokelist = editor.getLineTokens(curline);
	let ntoke = curtokelist.length;
	for(let tc = 0; tc < ntoke ; tc++){
		if(curtokelist[tc].string == ";"){
			console.log("returned true");				return true;	
		}
	}
}

function checkSemicolon(){
	let cur = editor.getCursor();
	let curtoke = editor.getTokenAt(cur);
	if(curtoke.string == ";"){
		getVariables();
	}
console.log(curtoke.string);
}

function addObj(vname,vtype,vvalue){
	let obj = { "var_name" : vname , "var_type" : vtype , "var_value" : vvalue };
	var_details.push(obj);
console.log(JSON.stringify(obj));
}

function dispContent(){
	document.getElementById("dispContent").innerHTML = editor.getValue();
}

function dispCharCount(){
	let str = editor.getValue();
	document.getElementById("charCount").innerHTML = str.length;
}

const countChars = (instance) => {
	let str = editor.getValue();
	document.getElementById("liveCharCount").innerHTML = str.length;	
}

editor.on("change",countChars);

function doRefresh(){
	editor.refrsh();
}

function changeFontSize(size){
	editor.getWrapperElement().style["font-size"] = size+"px";
}
