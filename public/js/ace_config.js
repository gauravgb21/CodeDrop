$(document).ready(function(){
 var editor = ace.edit("editor");
 document.getElementById("txtar").value=""; 
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

function post() {
	var editor = ace.edit("editor").getValue();
  var input= document.getElementById("txtar").value;
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "/compile");

    // program
  var hiddenField = document.createElement("textarea");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "code");
  hiddenField.value="";
  hiddenField.value=editor;
  form.appendChild(hiddenField);    
    
    //input 
  var hiddenField1 = document.createElement("textarea");
  hiddenField1.setAttribute("type", "hidden");
  hiddenField1.setAttribute("name", "input");
  hiddenField1.value="";
  hiddenField1.value=input;
  form.appendChild(hiddenField1);

  document.body.appendChild(form);
  form.submit();
}
