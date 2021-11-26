
var macro_classes = [
	{ 
		"class_name" : "SpreadSheet" , 
		"type" : "Class",
		"method" : [ 
				{"mname" : "getActive" , "returns" : "String" , "type" : "method" , "paramcount" : 0 , "parameters" : [] , "about" : "this returns the active sheet object"},
				{"mname" : "open" , "returns" : "SpreadSheet" , "type" : "method" , "paramcount" : 1 ,"parameters" : ["file: Drive.file"] , "about" : "opens the given sheet"},
				{"mname" : "openCurrent" , "returns" : "SpreadSheet" , "type" : "method" , "paramcount" : 4  , "parameters" : ["file: Drive.file" , "bool: newTab" , "retFun: function" , "etc etc"] , "about" : "opens current sheet in another tab"}
		], 
		"about" : "Returns data at the cell"
	} , 
	{ 
		"class_name" : "String" , 
		"type" : "Class",
		"method" : [ 
				{"mname" : "count" , "returns" : "number" , "type" : "method" , "paramcount" : 0 , "parameters" : [] , "about" : "count the characters of string"},
		], 
		"about" : "Related to Strings"
	} ,
];


var classList = [
	{"name" : "SpreadSheet" , "type" : "Class" , "about" : "contains methods related to SpreadSheet"},
	{"name" : "String" , "type" : "Class" , "about" : "work with strings and has related functions"},
	{"name" : "number" , "type" : "Class" , "about" : "work with numbers and has related functions"},
];

var javascriptKeywords = [
	{"name" : "var" , "type" : "keyword" , "about" : "keyword to declare a variable gloablly"},
	{"name" : "let" , "type" : "keyword" , "about" : "keyword to declare a variable locally"},
	{"name" : "break" , "type" : "keyword" , "about" : "used to  break the loop or switch control"},
	{"name" : "function" , "type" : "keyword" , "about" : "used to declare a function"},
];

var arrayProps = [
	{"name" : "length" , "type" : "method of array" , "about" : "find no of elem of the array"},
	{"name" : "concat" , "type" : "method of array" , "about" : "concat 2 or more arrays passed"},
	{"name" : "filter" , "type" : "method of array" , "about" : "filter contents based on conditions"},
];

var stringProps = [
	{"name" : "charAt" , "type" : "method of string" , "about" : "returns the character at the given pos"},
	{"name" : "trim" , "type" : "method of string" , "about" : "trims out the white space at start and end"},
	{"name" : "replace" , "type" : "method of string" , "about" : "replace part of string passed with new string"},
];

