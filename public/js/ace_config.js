var mp = {
  "C":"c_cpp",
  "C++":"c_cpp",
  "Java":"java",
  "Python":"python"
}

$(document).ready(function(){
 ace.require('ace/ext/language_tools');
 var editor = ace.edit("editor");
 document.getElementById("txtar").value=""; 
 editor.setTheme("ace/theme/twilight");
 editor.session.setMode("ace/mode/c_cpp");
 editor.setFontSize(14);
 editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
  });

 //theme change

 $("#theme_s").on('change',function(){
   var str="ace/theme/";
   str+=this.value;
   editor.setTheme(str);
 });

//language change

$("#lang_s").on('change',function(){
   var str="ace/mode/";
   str+=mp[this.value];
   editor.session.setMode(str);
 });

});

function post() {
	var editor  = ace.edit("editor").getValue();
  var input   = document.getElementById("txtar").value;
  var output  = document.getElementById("output");
  var lang    = document.getElementById("lang_s").value;
  var ver     = document.getElementById("ver");
  var tim     = document.getElementById("tim");
  var mem     = document.getElementById("mem");
  //AJAX request to server
  $.ajax({
      url: '/compile',
      type: 'POST',
      data: {code:editor,input:input,lang:lang},
      success: function(result){
        console.log("request sent to server");
      }
    });
   
  $.get("/getOutput", function(data) {
         var obj = JSON.parse(data);
         output.innerHTML=obj.output;
         ver.innerHTML=obj.verdict;
         tim.innerHTML=obj.time+" ms";
         mem.innerHTML=obj.memory+" KB";     
     }); 
  
}

//helper

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
