Vue.config.devtools = true

var songRequestFrame = new Vue({
  el: '#songrequestframe',
  data: {
    frameUrl: ''
  }
})

var setStationThingies = new Vue({
  el: '#changeStationContent',
  data: {
    stations: [],
    selectedStation: {}
  },
  mounted () {
    axios
      .get('https://radio.chickenfm.com/api/stations')
      .then(r => {
        this.stations = r.data
        this.selectedStation = r.data.find(e => e.shortcode === localStorage.getItem('api'))
        songRequestFrame.frameUrl = `https://radio.chickenfm.com/public/${this.selectedStation.shortcode}/embed-requests`
      })
  },
  methods: {
    changeStation: function () {
      var station = this.selectedStation
      songRequestFrame.frameUrl = `https://radio.chickenfm.com/public/${station.shortcode}/embed-requests`
      metadata.radioUrl = station.listen_url
      localStorage.setItem('radioStation', station.listen_url)
      localStorage.setItem('api', station.shortcode)
      ws.close()
      if (!stream.paused){
        pauseRadio();
        playRadio();
      }
    }
  }
})