$(function(){
  var setting = localStorage.getItem("setting");
  if (!setting) { return; }

  $("#inputSetting").val(setting);
});

$("#inputSetting").on('keydown', function(e){
  if (e.keyCode != 9) { return; }

  e.preventDefault();
  $(this).insertAtCaret("\t");
});

$("#save").on('click', function(){
  var inputSetting = $("#inputSetting").val();
  try {
    JSON.parse(inputSetting);
  } catch(e) {
    alert("invalid json?");
    return ;
  }
  localStorage.setItem("setting", inputSetting);
  alert("saved.");
});

jQuery.fn.extend({
  insertAtCaret: function(myValue){
    return this.each(function(i) {
      if (document.selection) {
        //For browsers like Internet Explorer
        this.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        this.focus();
      }
      else if (this.selectionStart || this.selectionStart == '0') {
        //For browsers like Firefox and Webkit based
        var startPos = this.selectionStart;
        var endPos = this.selectionEnd;
        var scrollTop = this.scrollTop;
        this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
        this.focus();
        this.selectionStart = startPos + myValue.length;
        this.selectionEnd = startPos + myValue.length;
        this.scrollTop = scrollTop;
      } else {
        this.value += myValue;
        this.focus();
      }
    });
  }
});