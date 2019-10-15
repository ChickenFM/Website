function streamQuality() {
  var radioQuality = document.getElementsByName('streamQuality');

  for (var i = 0, length = radioQuality.length; i < length; i++)
  {
   if (radioQuality[i].checked)
   {
    //alert(radioQuality[i].value);
    localStorage.setItem('streamQuality', radioQuality[i].value)
    break;
   }
  }
}

function checkStorage(){
  var checkedRadio = localStorage.getItem('streamQuality');
  if (checkedRadio) {
    $('input[value="'+checkedRadio+'"]').attr("checked", '');
  }
}
