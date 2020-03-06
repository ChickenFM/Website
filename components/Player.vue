<template>
  <div class="player player-body" id="player">
    <img
      class="djimage"
      id="coverimg"
      style="float:left;"
      :src="data.cover_medium"
    />
    <div class="nowplaying">
      <h1 class="dj" id="dj" style=" color:white;">{{ data.dj }}</h1>
      <h3 id="track" class="track" style=" color:white;">
        {{ data.trackTitle }}
      </h3>
      <h5 id="artist" class="artist" style=" color:white;">
        {{ data.trackArtist }}
      </h5>
      <h5 id="time" class="time" style=" color:white;">
        <span id="elapsed">{{ data.trackElapsed }}</span> /
        <span id="duration">{{ data.trackDuration }}</span>
      </h5>
    </div>
    <p style="display: none;" id="premidstationname">{{ data.premid }}</p>
    <div style="color:white;width:fit-content;">
      <div class="togglr" @click="toggleRadio()">
        <i class="togl fa fa-play" style="text-align: center;"></i>
      </div>
      <input
        id="volumeslider"
        class="volume displaynone"
        type="range"
        min="0"
        max="100"
        step="1"
        @input="changeVolume($event)"
      />
    </div>
  </div>
</template>

<script>
module.exports = {
  data: {
    playerUrl: ""
  },
  props: {
    data: Object
  },
  methods: {
    changeVolume(volume) {
      stream.volume = volume.target.value / 100
    },
    toggleRadio() {
      var stream = document.getElementById("audioplayer");
      if (stream.paused) {
        playRadio();
      } else {
        pauseRadio();
      }
    }
  }
};
var stream = document.getElementById("audioplayer");

function pauseRadio() {
  stream.pause();
  stream.volume = 0;
  stream.src = "";
  $(".togl").attr("class", "togl fa fa-play");
  $(".volume").attr("class", "volume displaynone");
}

function pauseRadioKey() {
  stream.pause();
  stream.volume = 0;
  $(".togl").attr("class", "togl fa fa-play");
  $(".volume").attr("class", "volume displaynone");
}
</script>

<style scoped>
.player {
  margin-top: 4rem;
}
</style>