  function playing() {
    axios.get('https://radio.chickenfm.com/api/nowplaying/1')
    .then(res =>{
      var data = res.data
    var song = data.now_playing.song.artist + " - " +data.now_playing.song.title;
    var track = data.now_playing.song.title;
    var artist = data.now_playing.song.artist;

    document.getElementById("track").innerHTML = track.toString();
    document.getElementById("artist").innerHTML = artist.toString();
    //var dj = data.live.streamer_name + ":";
    var djstat = data.live.streamer_name;
    document.getElementById("dj").innerHTML = dj.toString()
    if(djstat == "") {
      document.getElementById("dj").innerHTML = "AutoDJ";
      //document.getElementById("request").innerHTML = `<a href="#" id="myBtn">Request songs</a>`;
    } else {
      document.getElementById("dj").innerHTML = djstat.toString();
      //document.getElementById("request").innerHTML = `<a href="#popup1">Suggest songs</a>`;
    }

    coversrc = data.now_playing.song.art;
    //imagesrc = cover.toString();
    //imagehtml = '<img src="'+imagesrc+'"></img>'
    image = document.getElementById('coverimg');
    image.src = coversrc.toString();
    //image.innerHTML = imagehtml.toString()
    //image.innerHTML = cover.toString();

    // When audio starts playing...
    if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: track,
        artist: artist,
        album: 'ChickenFM',
        artwork: [
            { src: coversrc.toString(), type: 'image/png' },
      ]
        });
    navigator.mediaSession.setActionHandler('play', function(){
      playRadioKey()
    });
    navigator.mediaSession.setActionHandler('pause', function(){
      pauseRadioKey()
        });
      }
   });
   setTimeout(playing, 5000);
 } 	playing();

 var stream = document.getElementById("player");
 stream.pause()
 //loadRadio()
 volumeslider = document.getElementById("volumeslider");
 volumeslider.addEventListener("mousemove", setvolume);
function setvolume(){
  stream.volume = volumeslider.value / 100;
}
$('.togl').click(function(){
  toggleRadio();
});
function toggleRadio(){
  if (stream.paused){
    playRadio();
  } else {
    pauseRadio();
  }
}
function playRadio(){
  stream.src = "";
  var streamQuality = localStorage.getItem('streamQuality');
  if(streamQuality) {
    var streamLink = "https://radio.chickenfm.com/radio/8000/"+streamQuality;
  } else {
    var streamLink = "https://radio.chickenfm.com/radio/8000/radio.mp3";
  }
  stream.src = streamLink;
  //stream.volume = 0;

  $('.togl').attr("class", "togl fas fa-circle-notch fa-spin");
  stream.play().then(function() {
    stream.volume = 0.6;
    $('.togl').attr("class", "togl fa fa-pause");
    $('.volume').attr("class", "volume")
    stream.volume = volumeslider.value / 100;


  }).catch(function() {
    pauseRadio();
  });
}

function pauseRadio(){
  stream.pause();
  stream.volume = 0;
  stream.src = "";
  $('.togl').attr("class", "togl fa fa-play");
  $('.volume').attr("class", "volume displaynone")
}

function pauseRadioKey() {
  stream.pause();
  stream.volume = 0;
  //stream.src = "";
  $('.togl').attr("class", "togl fa fa-play");
  $('.volume').attr("class", "volume displaynone")
}

function playRadioKey() {
  stream.src = "";
  playRadio()
}

function volumeChange(){
  volumeslider = document.getElementById("volumeslider");
  stream.volume = volumeslider.value / 100;
  setTimeout(volumeChange, 1000);
} volumeChange()
