<template>
  <div>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <input type="password" v-model="confirmPassword" />
    <button @click="createAccount()">Submit</button>
    <div class="passwordError" v-if="passwordError">Password Issue!</div>
    <div class="createError" v-if="createdError">
      Error creating an account!
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";
  const store = useStore();
  let email = ref();
  let password = ref();
  let confirmPassword = ref();
  const passwordError = computed(() => {
    return store.state.passwordError;
  });
  const createdError = computed(() => {
    return store.state.creationError;
  });
  function createAccount() {
    store.dispatch("createAccount", {
      password: password.value,
      email: email.value,
      confirmPassword: confirmPassword.value,
    });
  }
</script>

<style scoped></style>
