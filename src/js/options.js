$(function(){
  var setting = localStorage.getItem("setting");
  if (!setting) {
    setting   = '{\n\t"example":{\n\t\t"host": "proxy.example.com",\n\t\t"port": 3128,\n\t\t"targets": [\n\t\t\t"http://target.example.com",\n\t\t\t"https://target2.example.com/foo/bar"\n\t\t]\n\t}\n}';
    var targetMap = '{"http://target.example.com":"example","https://target2.example.com/foo/bar":"example"}';
    localStorage.setItem('setting',   setting);
    localStorage.setItem('targetMap', targetMap);
  }

  $("#inputSetting").val(setting);
});

$("#inputSetting").on('keydown', function(e){
  if (e.keyCode != 9) { return; }

  e.preventDefault();
  $(this).insertAtCaret("\t");
});

$("#save").on('click', function(){
  var inputSetting = $("#inputSetting").val();
  var setting = {};
  var targetMap = {};
  var targetMapJson = "";

  try {
    setting = JSON.parse(inputSetting);
    for (var key in setting) {
      var targets = setting[key].targets;
      for (var i = 0; i < targets.length; i++) {
        targetMap[targets[i]] = key;
      }
    }
    targetMapJson = JSON.stringify(targetMap);
  } catch(e) {
    alert("invalid json?");
    return ;
  }

  localStorage.setItem("setting", inputSetting);
  localStorage.setItem("targetMap", targetMapJson);

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