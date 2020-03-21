<template>
    <div class="lyrics">
        <div class="content">
            <h2>{{ metadata.trackTitle }}</h2>
            <h4>{{ metadata.trackArtist }}</h4>
              <section v-if="loading" class="loading">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </section>
            <section v-else>
                <p v-for="line in lyrics.split('\n')" v-bind:key="lyrics.split('\n').indexOf(line)">
                    <br v-if="line == ''" />
                    <span v-else>{{ line }}</span>  
                </p>
            </section>
        </div> 
    </div>
</template>

<script>
module.exports = {
    props: {
        metadata: Object
    },
  data () {
    return {
      lyrics: null,
      loading: true
    }
  },
    mounted () {
    axios
      .get(`https://api.chickenfm.com/lyrics/${this.metadata.premid}`)
      .then(response => {
        this.lyrics = response.data.lyrics
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => this.loading = false)
  }
}
</script>

<style scoped>
.lyrics {
  margin: 1rem;
  background-color: white;
  border-radius: 10px;
}
.content {
    padding:2rem
}
h4 {
    margin-bottom: 2rem;
}
.loading {
    text-align: center;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: black;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

</style>