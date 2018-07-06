$(document).ready(function(){
 var editor = ace.edit("editor");
 editor.setTheme("ace/theme/twilight");
 editor.session.setMode("ace/mode/c_cpp");

 //theme change

 $("#theme_s").on('change',function(){
   var str="ace/theme/";
   str+=this.value;
   editor.setTheme(str);
 });

//language change

$("#lang_s").on('change',function(){
   var str="ace/mode/";
   str+=this.value;
   editor.session.setMode(str);
 });

});