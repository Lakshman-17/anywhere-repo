// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function(CodeMirror) {
    var Pos = CodeMirror.Pos;

    function forEach(arr, f) {
        //   console.log("in for each");
        for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
    }

    function arrayContains(arr, item) {
        if (!Array.prototype.indexOf) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === item) {
                    return true;
                }
            }
            return false;
        }
        return arr.indexOf(item) != -1;
    }



    function scriptHint(editor, keywords, getToken, options) {
        //    console.log("in scriptHint");
        // Find the token at the cursor
        var cur = editor.getCursor(),
            token = getToken(editor, cur);

        console.log("token : " + token.string + " token type : " + token.type);

        if (/\b(?:string|comment)\b/.test(token.type)) return;
        var innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
        // console.log("innermode : " + JSON.stringify(innerMode));
        if (innerMode.mode.helperType === "json") return;
        token.state = innerMode.state;
        console.log("token state : " + JSON.stringify(token.state));
        // If it's not a 'word-style' token, ignore the token.
        if (!/^[\w$_]*$/.test(token.string)) {
            token = {
                start: cur.ch,
                end: cur.ch,
                string: "",
                state: token.state,
                type: token.string == "." ? "property" : null
            };
        } else if (token.end > cur.ch) {
            token.end = cur.ch;
            token.string = token.string.slice(0, cur.ch - token.start);
        }

        var tprop = token;
        console.log("tprop : " + tprop.string + " , tprop type : " + tprop.type);
        // If it is a property, find out what it is a property of.
        while (tprop.type == "property") {

            tprop = getToken(editor, Pos(cur.line, tprop.start));
            console.log("tprop getToken : " + JSON.stringify(tprop));
            if (tprop.string != ".") return;
            tprop = getToken(editor, Pos(cur.line, tprop.start));
            if (!context) var context = [];
            context.push(tprop);
            console.log("context : " + JSON.stringify(context));
        }
        //        console.log("in scriptHint func");

        return {
            list: getCompletions(token, context, keywords, options),
            from: Pos(cur.line, token.start),
            to: Pos(cur.line, token.end)
        };
    }
    //console.log("in js file");
    function javascriptHint(editor, options) {
        //   console.log("inside jsscript hint");
        let curs = editor.getCursor();
        let toke = editor.getTokenAt(curs);
        let toke2 = editor.getTokenAt(curs);
        let tokenlist = editor.getLineTokens(curs.line);
        for (let i = 0; i < tokenlist.length; i++)

            console.log(tokenlist[i].string);

        console.log("in jshint : toke is : " + toke.string);
        console.log("line tokens : " + JSON.stringify(tokenlist));
        console.log("var details length : " + var_details.length);
        // console.log("var details : "+ JSON.stringify(var_details));

        if (toke.string == ".") {
            return scriptHint(editor, classProps, function(e, cur) {
                return e.getTokenAt(cur);
            }, options);
        }
        // else if(toke.string == "]"){
        //   return scriptHint(editor, arrayProps, function (e, cur) {return e.getTokenAt(cur);}, options);  
        // }
        else {
            return scriptHint(editor, classList.concat(arrayProps, stringProps, javascriptKeywords), function(e, cur) {
                return e.getTokenAt(cur);
            }, options);
        }

        return scriptHint(editor, keyw, function(e, cur) {
            return e.getTokenAt(cur);
        }, options);
    };
    CodeMirror.registerHelper("hint", "javascript", javascriptHint);

    //      console.log("in js script hint file");


    function getCoffeeScriptToken(editor, cur) {
        // This getToken, it is for coffeescript, imitates the behavior of
        // getTokenAt method in javascript.js, that is, returning "property"
        // type and treat "." as independent token.
        //        console.log("in getCoffeeScriptHint");
        var token = editor.getTokenAt(cur);
        if (cur.ch == token.start + 1 && token.string.charAt(0) == '.') {
            token.end = token.start;
            token.string = '.';
            token.type = "property";
        } else if (/^\.[\w$_]*$/.test(token.string)) {
            token.type = "property";
            token.start++;
            token.string = token.string.replace(/\./, '');
        }
        //    return token;
    }

    function coffeescriptHint(editor, options) {
        //    console.log("inside coffeescript hint");
        return scriptHint(editor, coffeescriptKeywords, getCoffeeScriptToken, options);
    }
    CodeMirror.registerHelper("hint", "coffeescript", coffeescriptHint);

    // var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
    //                    "toUpperCase toLowerCase split concat match replace search").split(" ");

    // var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
    //                   "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");

    var funcProps = "prototype apply call bind".split(" ");

    var classProps = ("getActive getSelection count toString getRow addEditor addMenu copy deleteRow " +
        "deleteColumn updateRow updateTable mergeSheet").split(" ");

    // var classList = ("SpreadSheet Array ArrayBuffer Date Boolean Number Math Charts Edit").split(" ");

    // var javascriptKeywords = ("break case catch class const continue debugger default delete do else export extends false finally for function " +
    // "if in import instanceof let new null return super switch this throw true try typeof var void while with yield").split(" ");

    var coffeescriptKeywords = ("and break catch class continue delete do else extends false finally for if in instanceof" +
        " isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");

    var numberKeywords = "isZero isDecimal toString isInt isFloat ".split(" ");

    /*var classDetails = [
      {"name" : "SpreadSheet" , "methods" : "getActive,getColor,open,createMenu,setActiveRange,create,flush" , "objects" : ""},
      {"name" : "Charts" , "methods" : "getType,setType,getAverage,applyDefault,changeDefault" , "objects" : ""},
      {"name" : "Edit" , "methods" : "changeColor,changeSize,addBullet,getSize" , "objects" : ""}

    ];*/



    function forAllProps(obj, callback) {
        if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
            for (var name in obj) callback(name)
        } else {
            for (var o = obj; o; o = Object.getPrototypeOf(o))
                Object.getOwnPropertyNames(o).forEach(callback)
        }
    }

    function getCompletions(token, context, keywords, options) {
        console.log("inside getCompletions");
        var found = [],
            start = token.string,
            global = options && options.globalScope || window;
        console.log("start : " + start);
        console.log("keywords : " + keywords);

        function maybeAdd(det) {
            let str = det.name;
            if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(det);
        }

        function gatherCompletions(obj) {
            console.log("in gatherCompletions");

            if (typeof obj == "string") forEach(stringProps, maybeAdd);
            else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
            else if (obj instanceof Function) forEach(funcProps, maybeAdd);
            forAllProps(obj, maybeAdd)
        }

        if (context && context.length) {
            // If this is a property, see if it belongs to some object we can
            // find in the current environment.
            var obj = context.pop(),
                base;
            console.log("typeof obj : " + typeof obj);
            console.log("obj is : " + JSON.stringify(obj));
            console.log("obj.string : " + obj.string + " obj.type : " + obj.type);

            if (obj.string == "]" && obj.type == null) {
                // console.log("in null if");
                // to check balancing of [] brackets then only add arrayProps   
                // keywords = [];
                // for(let ait = 0 ; ait < arrayProps.length ; ait++){
                //   keywords.push()
                // }
                keywords = arrayProps;
                console.log("key >> " + keywords);
                forEach(keywords, maybeAdd);
            }
            // if(obj.string == ")" && obj.type == null)
            if (obj.string == ")" || obj.string.trim() == "") {
                console.log("ob.string is " + obj.string);
                // iterate upto start of expression i.e '=' sign 
                // keywords = ["a","adg","bf","hn","ads","asf"];
                // break here  
                let equalisreached = 0;
                let curcurs = editor.getCursor();
                console.log(curcurs);
                let curline = curcurs.line;
                let curchar = curcurs.ch;
                let linlist = new LinkedList();
                let toklist = editor.getLineTokens(curline);
                let tokcount = toklist.length;
                let itr = 0;
                let tpos;
                let skip = false;
                let notfound = true;
                let stop = false;

                for (; itr < tokcount; itr++) {
                    if (toklist[itr].end == curchar) {
                        tpos = itr;
                        break;
                    }
                }
                itr = tpos - 1;

                while (equalisreached == 0 && skip == false && notfound == true && stop == false) {

                    for (; itr >= 0 && equalisreached != 1; itr--) {

                        if (typeof(toklist[itr]) == "undefined") {
                            continue;
                        }
                        console.log("hehe" + toklist[itr].string + "hehe");

                        if (toklist[itr].string.trim() == "" || toklist[itr].string == "\t") {
                            continue;
                        }

                        if (toklist[itr].type == "keyword") {
                            skip = true;
                            stop = true;
                            break;
                        }

                        if (toklist[itr].string == "=") {
                            equalisreached = 1;
                            stop = true;
                            notfound = false;
                            break;
                        }
                        linlist.insertAtEnd(toklist[itr].string);
                    } // end of for inside while

                    if (stop == false) {
                        if (curline - 1 >= 0) {
                            curline = curline - 1;
                            toklist = editor.getLineTokens(curline);
                            tokcount = toklist.length;
                            itr = tokcount - 1;
                        } else {
                            stop = true;
                        }
                    }

                } // end of while

                if (notfound == false) {
                    console.log("printing as string");
                    console.log(linlist.printAsString());
                    linlist.reverseList();
                    linlist.insertAtEnd(";");
                    console.log("printing as string");
                    console.log(linlist.printAsString());
                    let explist = linlist.printList()
                    let ret = parseCode(explist);
                    let n = macro_classes.length;
                    var label = 0;

                    for (let i = 0; i < n && label == 0; i++) {
                        if (macro_classes[i].class_name == ret) {
                            keywords = [];
                            label = 1;
                            for (let j = 0; j < macro_classes[i].method.length; j++) {
                                let temp = macro_classes[i].method[j];
                                let tobj = {
                                    "name": temp.mname,
                                    "type": temp.type,
                                    "about": temp.about
                                };
                                keywords.push(tobj);
                                // keywords.push(macro_classes[i].method[j].mname);  console.log("runtime " + j);
                            }
                        }
                    } // end of for 
                } // end of notfound if

                // break here  
            } else if (obj.type && obj.type.indexOf("variable") === 0) {
                console.log("inside");
                // console.log("opt.additionalContext : " + options.additionalContext);

                let label = 0;

                let n = macro_classes.length;
                for (let i = 0; i < n && label == 0; i++) {
                    if (macro_classes[i].class_name == obj.string) {
                        keywords = [];
                        label = 1;
                        for (let j = 0; j < macro_classes[i].method.length; j++) {
                            let temp = macro_classes[i].method[j];
                            let tobj = {
                                "name": temp.mname,
                                "type": temp.type,
                                "about": temp.about
                            };
                            keywords.push(tobj);
                            // keywords.push(macro_classes[i].method[j].mname);  console.log("runtime " + j);
                        }
                    }
                }

                if (label == 0) {

                    keywords = [];

                    for (let iter = 0; iter < var_details.length; iter++) {

                        if (var_details[iter].var_name == obj.string) {
                            let vtype = var_details[iter].var_type;
                            console.log(obj.string + " and " + vtype);
                            switch (vtype) {
                                case "number":
                                    keywords = numberKeywords.sort();
                                    break;
                                case "string":
                                    keywords = stringProps.sort();
                                    break;
                                case "array":
                                    keywords = arrayProps.sort();
                                    break;
                                default:
                                    let cn = macro_classes.length;
                                    for (let ci = 0; ci < cn; ci++) {
                                        if (macro_classes[ci].class_name == var_details[iter].var_type) {
                                            for (let mi = 0; mi < macro_classes[ci].method.length; mi++) {
                                                let temp = macro_classes[ci].method[mi];
                                                let tobj = {
                                                    "name": temp.mname,
                                                    "type": temp.type,
                                                    "about": temp.about
                                                };
                                                keywords.push(tobj);
                                                // keywords.push(macro_classes[ci].method[mi].mname);
                                            }
                                        }
                                    }
                            }
                        }
                    }
                }
            }

            if (options && options.additionalContext) {

                console.log("inside 1");
                base = options.additionalContext[obj.string];
                // console.log("base : " + base);
            }

            if (!options || options.useGlobalScope !== false) {
                console.log("inside 2");
                base = base || global[obj.string];

                // console.log(typeof obj.string);
                // console.log(obj.string instanceof Array);
                forEach(keywords, maybeAdd);
            }

            // else {

            // }
            else if (obj.type == "string") {
                console.log("inside");
                base = "";
            } else if (obj.type == "atom") {
                console.log("inside");
                base = 1;
            } else if (obj.type == "function") {
                console.log("inside");
                if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
                    (typeof global.jQuery == 'function'))
                    base = global.jQuery();
                else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
                    base = global._();
            }
            while (base != null && context.length) {
                console.log("inside");
                base = base[context.pop().string];
            }
            if (base != null) {
                console.log("inside");
                console.log("base : " + base);
                gatherCompletions(base);
            }
        } else {
            // If not, just look in the global object, any local scope, and optional additional-context
            // (reading into JS mode internals to get at the local and global variables)
            // for (var v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
            // for (var c = token.state.context; c; c = c.prev)
            //   for (var v = c.vars; v; v = v.next) maybeAdd(v.name)
            // for (var v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
            // if (options && options.additionalContext != null)
            //   for (var key in options.additionalContext)
            //     maybeAdd(key);
            // if (!options || options.useGlobalScope !== false)
            //   gatherCompletions(global);
            console.log("inside else ");
            forEach(keywords, maybeAdd);
        }
        return found;
    }

});