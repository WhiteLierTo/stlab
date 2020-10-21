<template>
  <div>
    <button @click="loginHandle">登录</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async loginHandle() {
      let [ok, tokenOrMsg] = await this.$ajax.login.loginSync(
        this.name,
        this.password
      );
      if (ok) {
        this.$utils.cookie.set(tokenOrMsg);
        this.$router.push("/");
      }
    },
  },
};
</script>
