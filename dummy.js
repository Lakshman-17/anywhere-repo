let linescount = editor.lineCount();
let stop = false;
let curline = iter;
let linlist = new LinkedList();
let toklist = editor.getLineTokens(curline);
let tokcount = toklist.length;
let itr;
let notfound = false;
let start = 0;
while(stop != true && curline < totallines ){
	let toklist = editor.getLineTokens(curline);
	for(itr = t; itr < tokcount ; itr++){
		if(curline == iter){
			if(toklist[itr].type == "variable"){
				linlist.insertAtEnd(toklist[itr].string);
				start = 1;
			}
		}
		if(start == 1){
			if(toklist[itr].type == "keyword" || toklist[itr].string == "="){
				stop = true;
			}
			if(toklist[itr].string.trim() == ""){
				continue;
			}
			linlist.insertAtEnd(toklist[itr].string);
			if(toklist[itr].string ==";"){
				semicolonfound = 1;
			}
		}
	}
	if(semicolonfound == 0){
		if(curline+1 <= linescount){
			curline++;
		}
		else{
			notfound = true;
		}
	}
}
if(notfound == false){
	iter = curline;
	let exparr = linlist.printList();
	let typereturned = parseCode(exparr);
	addObj(tokenlist[t+2].string, typereturned, linlist.printAsString());
	type_found = 1;		
}






//break here	

							/*				let linescount = editor.lineCount();
											let semicolonfound = 0;
											let curline = iter;
											let linlist = new LinkedList();
											let toklist = editor.getLineTokens(curline);
											let tokcount = toklist.length;
											let itr;
											let notfound = false;
											let start = 0;
											while(semicolonfound != 1){
	console.log("while");
												let toklist = editor.getLineTokens(curline);
												for(itr = 0; itr < tokcount ; itr++){
	console.log("if");
													if(curline == iter){
														if(toklist[itr].type == "variable"){
															linlist.insertAtEnd(toklist[itr].string);
															start = 1;
														}
													}
													if(start == 1){
	// console.log("itr val: " + itr + "str :  " + toklist[itr].string);
	// console.log("itr value : " + itr);
														// if(toklist[itr].string.trim() == ""){
															if(typeof(toklist[itr]) == "undefined"){
																continue;	
															}
	// console.log("itr val: " + itr + "str :  " + toklist[itr].string);
	// console.log("itr value : " + itr);
														linlist.insertAtEnd(toklist[itr].string);
														if(toklist[itr].string ==";"){
	console.log("; found");
															semicolonfound = 1;
														}
													}
												}
												if(semicolonfound == 0){
													if(curline+1 <= linescount){
														curline++;
													}
													else{
														notfound = true;
													}
												}
											}
											if(notfound == false){
												iter = curline;
												let exparr = linlist.printList();
												let typereturned = parseCode(exparr);
												ttype = typereturned;
												tvalue = linlist.printAsString();
												//addObj(tokenlist[t+2].string, typereturned, linlist.printAsString());
											} */




// break for next line checking



let stop = false;
let curline = iter;
let linlist = new LinkedList();
let toklist = editor.getLineTokens(curline);
let tokcount = toklist.length;
let itr;
let notfound = true;
let start = 0;
let semicolonfound = 0;


while(stop != true && curline < totallines && notfound == true && semicolonfound == 0){
	let toklist = editor.getLineTokens(curline);
	for(itr = t; itr < tokcount ; itr++){
		if(curline == iter){
			if(toklist[itr].type == "variable" && start == 0){
				linlist.insertAtEnd(toklist[itr].string);
				start = 1;
			}
		}
		if(start == 1){
			if(typeof(toklist[itr]) != "undefined") {
				if(toklist[itr].type == "keyword" || toklist[itr].string == "="){
					stop = true;
					continue;
				}
				if(toklist[itr].string.trim() == ""){
					continue;
				}
				linlist.insertAtEnd(toklist[itr].string);
				if(toklist[itr].string ==";"){
					semicolonfound = 1;
					stop = true;
					notfound = false;
				}
			}
		}
	}

	if(stop == false){	console.log("stop is false after for loop with curline = " + curline);
		if(curline+1 < totallines){
			curline++;	console.log("go to next line : " + curline);
		}
		else{
			stop = true;
		}
	}
}
if(notfound == false){
	iter = curline;
	let exparr = linlist.printList();
	let typereturned = parseCode(exparr);
	ttype = typereturned;
	tvalue = linlist.printAsString();
	pending = 0;
}


// next one


let totallines = editor.lineCount();
let curs = editor.getCursor();

for(let iter = 0; iter < lines ; iter++){
	let tokenlist = editor.getLineTokens(curs);
	let tokcount = tokenlist.length;
	let semicolon_found = -1;	
	let pending = 0;
	if( pending == 0){
		for(let t = 0 ; t < tokcount ; t++){
			if(tokenlist[t].string == "var"){
				++varcount;
				let type_found = -1;
				let equal_sign_found = -1;
				let is_variable = -1;
				let is_operator = -1;
				pending = 1;
				let tname;
				let ttype;
				let tvalue;
				while(t < tokcount){
					if(tokenlist[t].type = "def"){
						var_name_list.push(tokenlist[t].string);
					}
					if(tokenlist[t].string.trim == ""){
						continue;
					}
					if(tokenlist[t].string == "="){
						continue;
					}
					if(tokenlist[t].type == "number"){
						ttype = tokenlist[t].type;
					}
					if(tokenlist[t].type == "string"){
						ttype = tokenlist[t].type;
					}
					if(tokenlist[t].string == "["){
						ttype = "array";
					}
					if(tokenlist[t].type == "variable"){
						let cdetails = isClass(tokenlist[t].string);
						let vdetails = isVariable(tokenlist[t].string); 
						if(cdetails.found == true){
							
						}
						else if(vdetails.found == true){
							ttype = vdetails.vtype;
						}
					}
					if(tokenlist[t].string == ";"){
						pending = 0;
						break;
					}
				}
			}
		}
	}
}



// next one



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

                        if(typeof(toklist[itr]) != "undefined") {		

                          if(toklist[itr].type == "keyword" || toklist[itr].string == "="){
                            stop = true;
                            continue;
                          }

                          if(toklist[itr].string.trim() == ""){
                            continue;
                          }

                          linlist.insertAtEnd(toklist[itr].string);	

                          if(toklist[itr].string ==";"){		

                            semicolonfound = 1;
                            stop = true;
                            notfound = false;
                            break;
                          }
                        }
                      }
                    }	// end of for inside while

                    if(stop == false){	
                      console.log("stop is false after for loop with curline = " + curline);

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

          }	// end of while 
         
          if(pending == 0){
            STATUS_VAR_COUNT.innerHTML = ++var_count;
            var_name_list.push(tname);
            addObj(tname,ttype,tvalue);	
            console.log(tname + " , " + ttype + " , " + tvalue);
          }
        }	// end of 3 condition if
      }	// end of 2nd for
    }	// end of if pending == 0
  }	// end of first for
  if(var_name_list.length != 0){
    STATUS_VAR_LIST.innerHTML = JSON.stringify(var_name_list);
    STATUS_VAR_TYPE_DETAILS.innerHTML = JSON.stringify(var_details);
  }
  else{
    STATUS_VAR_LIST.innerHTML = "list emptty";
  }
}




// break here


function getType(curcurs, tpos, toklist)
{
	let stop = false;
	let curline = curcurs.line;
	let linlist = new LinkedList();
	let tokcount = toklist.length;
	let itr = 0;
	let inputcount = 0;
	let notfound = true;
	itr = tpos;

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
            if(toklist[itr].string == "="){
              stop = true;
              notfound = false;
              break;
            }
            if(toklist[itr].string == ";"){
              stop = true;
              notfound = false;
              break;
            }
        	linlist.insertAtEnd(toklist[itr].string);
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
				stop = true;
			}
		}
	}		// end of while

	if(notfound == false){
		if(inputcount == 1){
			return linlist.printAsString();
		}
		linlist.reverseList();
			console.log("print as string");
			console.log(linlist.printAsString());
	}
}		// end of fun




// break here


function isInsideFunctionCall(){
			let curs = editor.getCursor();					console.log(JSON.stringify(curs));
			let cursToken = editor.getTokenAt(curs);		console.log("curstok : " + cursToken.string);
			let tokenPos = 0;
			let toklist = editor.getLineTokens(curs.line);	

			let brackopen = 0;
			let brackclose = 0;

			// for(let ch = curs.ch ; ch > 0 ; ch--){
				
			// }

			for(let i = 0; i < toklist.length ; i++){
				if(toklist[i].string == "("){
					startLimit = toklist[i].end;
					tokenPos = i;						console.log("okk 1");
					brackopen++;
				}
				else if(toklist[i].string == ")"){
					brackclose++;
					if(brackopen == brackclose){
						startline = curs.line;
						endline = startline ; 
						endLimit = toklist[i].start;		console.log("okkk 2");	
console.log("stline : " + startline + " , stlim : " + startLimit + " , enlim : " + endLimit);
						break;
					}
				}
			}

			if(brackopen != brackclose){
				showParam = false;
				return;
			}
			else {
				showParam = true;
			}

			if(showParam == true){			console.log("curs.ch : " + curs.ch);		console.log("multi condi : " + (startLimit <= curs.ch <= endLimit));
				if( curs.line == startline ) {
					if (startLimit <= curs.ch && curs.ch <= endLimit) {
		console.log("showParam is true");
						let ret = getType(curs, tokenPos, toklist);
		console.log("ret >> "+ ret);

				/*		let dotfound = 0;
						let stop = 0;
						while(dotfound == 0 && stop == 0){				//console.log("while going");
							for(let iter = tokenPos ; iter >= 0 ; iter--){			//console.log("for going");
								if(typeof(toklist[iter]) != "undefined"){
									if(toklist[iter].string == "=" || toklist[iter].type == "keyword"){
										stop = 1;
										break;
									}
									if(toklist[iter].string == "."){
										dotfound = 1;
										stop = 1;		*/
								//		let cls = toklist[iter-1].string;		
										let cls = null; 
										// let fun = toklist[iter+1].string;
										let fun = toklist[tokenPos-1].string ;					console.log("cls : " + cls + " and fun : " + fun);
										let label = 0;
										for(let ci = 0; ci < macro_classes.length && label == 0 ; ci++){			//console.log("for 2 going");
											if(macro_classes[ci].class_name == cls){
												for(let mi = 0 ; mi < macro_classes[ci].method.length ; mi++){			//console.log("for 3 going");
													if(macro_classes[ci].method[mi].mname == fun){
														STATUS_SHOW_PARAM.innerHTML = macro_classes[ci].method[mi].parameters;
														label = 1;
														break;
													}
												}
											}
										}
								/*	}	// end of if( == ".")
								}
							}	// end of for
							stop = 1;
						}		// end of while			*/
					}		// end of multicond if
					else { showParam = false; STATUS_SHOW_PARAM.innerHTML = "" ; return;}
				}
				else {	showParam = false; STATUS_SHOW_PARAM.innerHTML = "" ; return; }
				return;
			}
		}

		// editor.on("cursorActivity",isInsideFunctionCall);

		var showParam = false ;
		var startline = null ;
		var endline = null ;
		var startLimit  = null ;
		var endLimit = null ;

		function dispParam(){

			let curs = editor.getCursor();					
			let cursToken = editor.getTokenAt(curs);		console.log("curstok : " + cursToken.string);

			if(cursToken.string != "("){
				return;
			}

			let tokenPos = 0;
			let toklist = editor.getLineTokens(curs.line);	

			let brackopen = 0;
			let brackclose = 0;

			for(let t = 0 ; t < toklist.length; t++){
				if(toklist[t].string == "(" && toklist[t].end == curs.ch){
					tokenPos = t;
					brackopen++;
					startLimit = curs.ch;
					break;
				}
			}

			for(let t = tokenPos ; t < toklist.length; t++){
				if(toklist[t].string == ")"){
					brackclose++;
					if(brackopen == brackclose){
						endLimit = toklist[t].start;
						break;
					}
				}
			}
		}
			// getType();

		function showTokNow(){
			let str = editor.getTokenAt(editor.getCursor());
			console.log("tok now is : " + str);
		}

		editor.on("inputRead",showTokNow);


// break here

