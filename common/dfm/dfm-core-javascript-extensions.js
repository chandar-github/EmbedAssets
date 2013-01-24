/*-- ###################################################################### --*/
/*-- # STRING CLASS EXTENSIONS                                            # --*/
/*-- ###################################################################### --*/
//
// Function: String.contains
// Overview: See if a string contains a substring.
// Examples: var myBoolean = new String("This is a string").contains("string");     =>  true
//           var myBoolean = navigator.userAgent.contains("Mozilla|Gecko|Camino");  =>  true|false
//
String.prototype.contains = function(){
  var a=arguments[0]+""; a=((a.indexOf('|')>-1)?(a.split('|')):(new Array(a)));
  for(var x=0; x<a.length; x++) if(this.indexOf(a[x])>-1) return(true);
  return(false);
};


//
// Function: String.startsWith
// Overview: See if a string begins with another substring.
// Examples: var myBoolean = new String("This is a string").startsWith("This is");    =>  true
//           var myBoolean = navigator.userAgent.startsWith("Mozilla|Gecko|Camino");  =>  true|false
//
String.prototype.startsWith = function(){
  var a=arguments[0]+""; a=((a.indexOf('|')>-1)?(a.split('|')):(new Array(a)));
  for(var x=0; x<a.length; x++) if(this.indexOf(a[x])==0) return(true);
  return(false);
};


//
// Function: String.qsa2ary
// Overview: Convert querystring arguments into an array
// Examples: var myArray = new String("http://url/?key1=value1&key2=value2").qsa2ary();  =>  ["key1=value1","key2=value2"]
//           var myArray = new String("http://url/?name1&name2&name3&name4").qsa2ary();  =>  ["name1","name2","name3","name4"]
//
String.prototype.qsa2ary = function(){
  var x=((this.indexOf('?')>-1)?((this.split('?'))[1]):(this));
  return(x.split('&'));
};


//
// Function: String.trimString
// Overview: Delete all whitespace from the beginning and end of a string.
// Examples: var myString = new String("  This is a string  ").trimString();  =>  "This is a string"
//
String.prototype.trimString = function(){ return(this.replace(/^\s+|%20|\s+$/g,"")); };


//
// Function: String.capitalize
// Overview: Capitalize the first letter of a string.
// Examples: var myString = new String("this is a string").capitalize();  =>  "This is a string"
//
String.prototype.capitalize = function(){
  if(this.length==0) return('');
  var a=this.charAt(0).toUpperCase();
  return(a+this.substring(1,this.length).toLowerCase());
};


//
// Function: String.removeTags
// Overview: Remove all HTML tags from a string.
// Examples: var myString = new String("This is a <b>string</b>").removeTags();  =>  "This is a string"
//
String.prototype.removeTags = function(){ return(this.replace(/<\/?[^>]+>/gi, '')); };


//
// Function: String.removeAllBreaks
// Overview: Remove all line breaks from a string.
// Examples: var myString = new String("This is
//                                      a string").removeAllBreaks();  =>  "This is a string"
//
String.prototype.removeAllBreaks = function(){ return(this.replace(/\r|\n/g,"")); };


//
// Function: Array.getObject
// Overview: In an array of objects, search on either a key or a value and return the object it belongs to.
// Examples: var myValue = [{a:1},{b:2},{c:3}].getValue("b");  =>  {b:2}
//
Array.prototype.getObject = function(){
  for(var x=0; x<this.length; x++){
    for(p in this[x]) if(p==arguments[0]||this[x][p]==arguments[0]) return(this[x]);
  };
  return(false);
};


//
// Function: Array.getValue
// Overview: In a key=value array, search on a key and return its value.
// Examples: var myValue = ["a=1","b=2","c=3"].getValue("b");  =>  "2"
//
Array.prototype.getValue = function(){
  for(var x=y=k=v=0; x<this.length; x++){
    y=(((this[x]).split)?((this[x]).split('=')):(false));
    k=((y)?(y[0]):(false)); v=((k)?(y[1]):(false));
    if(k==arguments[0]) return(v);
  };
  return(false);
};


//
// Function: Array.setValue
// Overview: In a key=value array, search on a key and set its value.
// Examples: var myValue = ["a=1","b=2","c=3"].setValue("b",4);  =>  "4"
//
Array.prototype.setValue = function(){
  for(var x=y=0; x<this.length; x++) if((this[x]).indexOf(arguments[0])==0) y=(this[x])=arguments[0]+'='+arguments[1];
  if(!y) y=this[this.length]=arguments[0]+'='+arguments[1];
  return(y);
};


//
// Function: Array.getValAt
// Overview: In a key=value array, return a value at a specific position.
// Examples: var myValue = ["a=1","b=2","c=3"].getValAt(1);  =>  "2"
//
Array.prototype.getValAt = function(){
  var t=this[arguments[0]],v=((t.contains('='))?((t.split('='))[1]):(t)); return(v);
};


//
// Function: Array.getKeyAt
// Overview: In a key=value array, return a key at a specific position.
// Examples: var myKey = ["a=1","b=2","c=3"].getKeyAt(1);  =>  "b"
//
Array.prototype.getKeyAt = function(){
  var t=this[arguments[0]],v=((t.contains('='))?((t.split('='))[0]):(t)); return(v);
};


//
// Function: Array.getIndex
// Overview: In an array, search on a value and return its position in the array.
// Examples: var myPosition = ["a","b","c"].getIndex("c");  =>  2
//
Array.prototype.getIndex = function(){
  if(arguments[0]) for(var x=0; x<this.length; x++) if(this[x].contains(arguments[0])) return(x);
  return(-1);
};


//
// Function: Array.insertAt
// Overview: Insert a new value into an array at a specific position.
// Examples: ["a","b","c"].insertAt(2,"d");  =>  ["a","b","d","c"]
//
Array.prototype.insertAt = function(){ this.splice(arguments[0],0,arguments[1]); return(this); };


//
// Function: Array.deleteAt
// Overview: Delete an array value at a specific position.
// Examples: ["a","b","c"].deleteAt(2);  =>  ["a","b"]
//
Array.prototype.deleteAt = function(){ this.splice(arguments[0],1); return(this); };


/*-- ###################################################################### --*/
/*-- # REGEX OBJECT DEFINITION                                            # --*/
/*-- ###################################################################### --*/
//
// Object:   RegEx.xxxx
// Overview: Test if a value matches a predefined regular expression.
// Examples: var myBoolean = RegEx.email("dfm@digitalfirstmedia.com");  =>  true
//           var myBoolean = RegEx.phone("800-123-4567");               =>  true
//           var myBoolean = RegEx.ipv4("129.168.1.1");                 =>  true
//           var myBoolean = RegEx.ssn("123-45-6789");                  =>  true
//           var myBoolean = RegEx.url("http://www.url.com");           =>  true
//           var myBoolean = RegEx.zip("10011");                        =>  true
//
RegEx = {
  email : function(){ return(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(arguments[0])); },
  phone : function(){ return(/^[01]?[- .]?(\([2-9]\d{2}\)|[2-9]\d{2})[- .]?\d{3}[- .]?\d{4}$/.test(arguments[0])); },
  ipv4  : function(){ return(/\b(([0-2]?\d{1,2}\.){3}[0-2]?\d{1,2})\b/.test(arguments[0])); },
  ssn   : function(){ return(/^\d{3}-\d{2}-\d{4}$/.test(arguments[0])); },
  url   : function(){ return(/^(http|ftp|ssh|smb|cifs|afp|nfs|gopher|sftp|rsync)(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/.test(arguments[0])); },
  zip   : function(){ return(/^(\d{5}-\d{4}|\d{5}|\d{9})$|^([a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d)$/.test(arguments[0])); }
};


/*-- ###################################################################### --*/
/*-- # TIME OBJECT DEFINITION                                             # --*/
/*-- ###################################################################### --*/
//
// Object:   Time.xxxx
// Overview: Output different types of timestamps.
// Examples: var myString = Time.now();     =>  Tue Mar 20 2012 23:47:16 GMT-0600 (Mountain Daylight Time)
//           var myString = Time.stamp();   =>  12/11/10 @ 09:08:07
//           var myString = Time.ymdhms();  =>  121110090807
//           var myString = Time.yymmdd();  =>  121110
//           var myString = Time.hhmmss();  =>  090807
//
Time = {
  now    : function(){ return(new Date()); },
  stamp  : function(){ var t,d=new Date(); d.s=''; t=d.getMonth()+1;  d.s=((t<10)?('0'+t):(t))+'/'; t=d.getDate(); d.s+=((t<10)?('0'+t):(t))+'/'; t=d.getYear()-100; d.s+=((t<10)?('0'+t):(t))+' @ '; t=d.getHours(); d.s+=((t<10)?('0'+t):(t))+':'; t=d.getMinutes(); d.s+=((t<10)?('0'+t):(t))+':'; t=d.getSeconds(); d.s+=((t<10)?('0'+t):(t)); return(d.s); },
  ymdhms : function(){ var t,d=new Date(); d.s=''; t=d.getYear()-100; d.s=((t<10)?('0'+t):(t)); t=d.getMonth()+1;  d.s+=((t<10)?('0'+t):(t));     t=d.getDate();     d.s+=((t<10)?('0'+t):(t));       t=d.getHours(); d.s+=((t<10)?('0'+t):(t));     t=d.getMinutes(); d.s+=((t<10)?('0'+t):(t));     t=d.getSeconds(); d.s+=((t<10)?('0'+t):(t)); return(d.s); },
  yymmdd : function(){ return(this.ymdhms().substring(0,6));  },
  hhmmss : function(){ return(this.ymdhms().substring(6,12)); }
};

/*-- ###################################################################### --*/
/*-- # COLOR OBJECT DEFINITION                                            # --*/
/*-- ###################################################################### --*/
//
// Object:   Color.xxxx
// Overview: Convert between different color values
// Examples: var myString = Color.rgb2hex(255,0,0);    =>  "ff0000"
//
Color = {
  rgb2hex : function(r,g,b){
      r=jQuery.num2hex(r).toString();  if(r.length==1) r='0'+r+'';
      g=jQuery.num2hex(g).toString();  if(g.length==1) g='0'+g+'';
      b=jQuery.num2hex(b).toString();  if(b.length==1) b='0'+b+'';
      return(r+g+b+'');
  }
};
