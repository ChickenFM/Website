<template>
  <div>
    <iframe
      v-bind:src="data.requestUrl"
      frameborder="0"
      allowtransparency="true"
      style="width: 100%; height: 85%; border: 0;"
      id="songrequestframe"
    ></iframe>
  </div>
</template>

<script>
module.exports = {
  props: ["data"]
};
</script>

<style scoped>
div {
  margin: 1rem;
  background-color: black;
  border-radius: 10px;
}
iframe {
  padding: 1rem;
}
</style>
