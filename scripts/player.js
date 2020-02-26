if(!localStorage.getItem('radioStation')) {
  localStorage.setItem('radioStation', 'https://radio.chickenfm.com/radio/8000/radio.mp3')
}
if(!localStorage.getItem('api')) {
  localStorage.setItem('api', 'chickenfm')
}
var api = localStorage.getItem('api')

var metadata = new Vue({
  el: '#player',
  data: {
    cover_medium: '/images/default.png',
    cover_xl: '/images/default.png',
    dj: 'Loading...',
    trackTitle: 'Loading...',
    trackArtist: 'Loading...',
    trackDuration: 'Loading...',
    trackElapsed: 'Loading...',
    premid: 'Loading...',
    radioUrl: localStorage.getItem('radioStation')
  }
})
var bg = new Vue({
  el: '#bg',
  data: {
    image: ''
  }
})
 var ws;
 function playingNew(api) {
   if("WebSocket" in window) {
    ws = new WebSocket("wss://radio.chickenfm.com/api/live/nowplaying/"+api);

    ws.onmessage = function(evt) {
      nowPlaying = JSON.parse(evt.data);
      //updateNowplaying(nowPlaying)
      metadata.trackTitle = nowPlaying.now_playing.song.title;
      metadata.trackArtist = nowPlaying.now_playing.song.artist;
      metadata.dj = nowPlaying.live.is_live ? nowPlaying.live.streamer_name : 'AutoDJ';
      metadata.premid = nowPlaying.station.id;
      axios.get(`https://api.chickenfm.com/api.php?station=${nowPlaying.station.shortcode}`)
      .then(r => {
        metadata.cover_medium = r.data.cover_medium;
        metadata.cover_xl = r.data.cover_xl;
        bg.image = r.data.cover_xl
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
              title: metadata.trackTitle,
              artist: metadata.trackArtist,
              album: nowPlaying.station.name,
              artwork: [
                  { src: r.data.cover_medium, sizes: '250x250', type: 'image/jpg'},
                  { src: r.data.cover_xl, sizes: '1000x1000', type: 'image/jpg' },
            ]
          });
          navigator.mediaSession.setActionHandler('play', function(){
            playRadioKey()
          });
          navigator.mediaSession.setActionHandler('pause', function(){
            pauseRadioKey()
          });
          try {
            navigator.mediaSession.setActionHandler('stop', function() {
              pauseRadio()
            });
          } catch(error) {
            console.log(error)
          }
        }
      })

      var played_at = nowPlaying.now_playing.played_at
      var duration = nowPlaying.now_playing.duration
      if(nowPlaying.live.is_live == true){
        if(countTime.interval) clearTimeout(countTime.interval);
        metadata.trackDuration = '';
        metadata.trackElapsed = '';
        return;
      }
      if(countTime.interval)
          clearTimeout(countTime.interval);
      
      countTime(played_at, duration)
     }
     ws.onerror = () => {
      setTimeout(function(){playingNew(localStorage.getItem('api'))}, 500)
     }
     ws.onclose = () => {
        setTimeout(function(){playingNew(localStorage.getItem('api'))}, 1000)
     }
   }

 }

 function countTime(played_at, total){
  var ts = Math.round((new Date()).getTime() / 1000);
  var seconds = ts - played_at
  if(seconds < 0)
    seconds = 0
  
  if(seconds !== total){
    second = seconds
    metadata.trackElapsed = getTime(seconds * 1000)
    metadata.trackDuration = getTime(total * 1000)
  }
  countTime.interval = setTimeout(function(){ countTime(played_at, total); }, 1000);
}

 var getTime = (millisec) => {
  // Credit: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
  var seconds = (millisec / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = (hours >= 10) ? hours : "0" + hours;
    minutes = minutes - (hours * 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }
  // Normally I'd give notes here, but I actually don't understand how this code works.
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours != "") {
    return hours + ":" + minutes + ":" + seconds;
  }
  return minutes + ":" + seconds;
}

 var stream = document.getElementById("audioplayer");
 stream.pause()
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

  stream.src = metadata.radioUrl;

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
  $('.togl').attr("class", "togl fa fa-play");
  $('.volume').attr("class", "volume displaynone")
}

function playRadioKey() {
  playRadio()
}

function volumeChange(){
  volumeslider = document.getElementById("volumeslider");
  stream.volume = volumeslider.value / 100;
  setTimeout(volumeChange, 1000);
} volumeChange()
