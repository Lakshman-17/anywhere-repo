
class Node{

	constructor(val){
		this.value = val;
		this.next = null;
	}

}

class LinkedList{
	
	constructor(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	insertAtEnd(val){
		let node = new Node(val);
		if(this.head == null){
			this.head = node;
			this.tail = node;
			this.size++;
		}
		else {
			this.tail.next = node;
			this.tail = node;
			this.size++;
		}
	}

	deleteAtBeg(){

	}

	isEmpty(){
		if(this.head == null){
			return true;
		}
		else{
			return false;
		}
	}

	printList(){
		if(this.head == null){
			return "list empty";
		}
		else {
			let cur = this.head;
			let arr = [];
			while(cur != null){
				arr.push(cur.value);
				cur = cur.next;
			}
			return arr;
		}
	}

	printAsString(){
		if(this.head == null){
			return "list empty";
		}
		else {
			let cur = this.head;
			let str = "";
			while(cur != null){
				str += cur.value;
				cur = cur.next;
			}
			return str;
		}	
	}

	reverseList(){
		let cur = this.head;
		let prev = null, next = null;
		while(cur != null){
			next = cur.next;
			cur.next = prev;
			prev = cur;
			cur = next;
		}
		this.tail = this.head;
		this.head = prev;
	}

}

function checkMacro(cname,mname){

	let n = macro_classes.length;
	var label  = 0;	

	for(let i = 0; i< n ; i++){
		if(macro_classes[i].class_name == cname){
			for(let j = 0; j < macro_classes[i].method.length ; j++){
				if(macro_classes[i].method[j].mname == mname){
					label = 1;
					return macro_classes[i].method[j].returns;
				}
			}
		}
	}

	if(label == 0){
		let varn = var_details.length;
		for(let i = 0; i < varn; i++)
		{
			if(var_details[i].var_name == cname){
				label = 1;
				return checkMacro(var_details[i].var_type,mname);
			}
		}
		if(label == 0){
			return null;
		}
	}
	
}

function parseCode(ls){

	let brackcount = 0;

	let lslen = ls.length;
	for(let i = 0; i < lslen ; i++){

		if(ls[i] == "("){
			// brackcount++;
			let check_str = checkMacro(ls[i-3] , ls[i-1]);

			if(check_str == null){
				answer = "not found";
				return;
			}

			else if(check_str != null){
				
				answer = check_str;
				let whileiter = i;
				let dotindex = 0;
				let dotlabel = 0;

				while( whileiter < lslen){		console.log("inside while whileiter");
					if(ls[whileiter] == "("){	
						brackcount++;				console.log("brackcount in ( : " + brackcount);
					}
					if(ls[whileiter] == ")"){
						brackcount--;				console.log("brackcount in ) : " + brackcount);
					}
					if(ls[whileiter-1] == ")" && ls[whileiter] == "." && brackcount == 0){		console.log("if passed of brackcount = 0");
						dotindex = whileiter;
						dotlabel = 1;
						break;
					}
					whileiter++;
				}
console.log( "in parse code");
				if(dotlabel == 1){
					if(ls[dotindex] == "." && ls[dotindex+2] == "("){
console.log("in if of dotlabel");
						let temparr = [];
						temparr.push(answer);
						console.log("answer : " + answer);					console.log("concat string ... : " + temparr.concat( ls.slice(dotindex,lslen+1) ));
						answer = parseCode(temparr.concat( ls.slice(dotindex,lslen+1) ) );

						return answer;

					}
				}	//end of dot label
				
				for(let temp = i; temp < lslen ; temp++){
					if(ls[temp] == ";"){
						return answer;
					}
				}
		/*		
				if( ls[i+2] == ";" || ls[i+3] == ";" || ls[i+4] == ";" || ls[i+5] == ";" || ls[i+6] == ";" || ls[i+7] == ";" || ls[i+8] == ";" ) {
					return answer;
				}			
				else{
					return "not found ;";
				}		*/
			}
		}	// end of 1st if
	}	// end of for 
}