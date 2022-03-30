<template>
  <div>
    <input type="text" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="login()">submit</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";
  const store = useStore();
  let email = ref();
  let password = ref();
  function login() {
    store.dispatch("login", { password: password.value, email: email.value });
  }
  if (store.state.loggedIn) {
    router.push("/notes");
  }
</script>

<style lang="scss" scoped></style>
