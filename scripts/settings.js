function changeStation() {
  var radioStationChanger = document.getElementsByName('radioStationChanger');

  for (var i = 0, length = radioStationChanger.length; i < length; i++)
  {
   if (radioStationChanger[i].checked)
   {
    var value = radioStationChanger[i].value
    localStorage.setItem('radioStation', value)
    var id = radioStationChanger[i].id
    localStorage.setItem('api', id)
    ws.close()
    setTimeout(function(){playingNew(id)}, 100)
    if (!stream.paused){
      pauseRadio();
      playRadio();
    }
    break;
   }
  }
}

function checkStorage(){
  var checkedRadio = localStorage.getItem('radioStation');
  if (checkedRadio) {
    $('input[value="'+checkedRadio+'"]').attr("checked", '');
  }
}
window.addEventListener('storage', function(e) { 
  console.log(e)
})

function setItems(){
  //checkStorage()
  var div = document.getElementById('changeStationContent')
  div.innerHTML = ''
  axios.get('https://radio.chickenfm.com/api/stations')
  .then(res => {
    var data = res.data
    for (var i = 0, len = data.length; i < len; i++) {
      var station = res.data[i]
      var mountpoint = searchMountpoint(true, station.mounts)
      //.split is for removing the ? and everything that comes after it
      var mountpointurl = mountpoint.url.split('?')[0]
      var apiId = station.shortcode
      //console.log(mountpoint)
      var htmlData = `<input type="radio" class="streamRadio" onclick="changeStation()" name="radioStationChanger" id="${apiId}" value="${mountpointurl}"> ${station.name}<br>`
      div.innerHTML += htmlData
      checkStorage()
      //playingNew()
    }
  })

}
//https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
function searchMountpoint(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].is_default === nameKey) {
          return myArray[i];
      }
  }
}