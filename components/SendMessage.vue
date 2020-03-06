<template>
  <div>
    <form
      name="send a message"
      id="sendMessage"
      method="POST"
      data-netlify="true"
      data-netlify-recaptcha="true"
      @submit.prevent="handleSubmit"
    >
      <p style="display: none;">
        <label
          >Don’t fill this out if you're human: <input name="bot-field"
        /></label>
      </p>
      <p>
        <label
          >Your Name: <input type="text" name="name" required="required" v-model="form.name"
        /></label>
      </p>
      <p>
        <label
          >Your Email: <input type="email" name="email" required="required" v-model="form.email"
        /></label>
      </p>
      <p>
        <label
          >Message: <textarea name="message" required="required" v-model="form.message"></textarea
        ></label>
      </p>
      <div data-netlify-recaptcha="true"></div>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </div>
</template>

<script>
module.exports = {
  name: "SendMessage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: ""
      }
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      axios.post(
        "/",
        this.encode({
          "form-name": "Send a message",
          ...this.form
        }),
        axiosConfig
      );
    }
  }
};
</script>

<style scoped>
div {
  margin: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
form {
    width: auto;
}
</style>
