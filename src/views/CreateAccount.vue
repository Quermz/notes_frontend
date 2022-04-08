<template>
  <div class="loginOuterContainer">
    <div class="loginContainer">
      <div class="loginHeader">
        <h1>co Notes</h1>
        <i class="fa-solid fa-square-pen"></i>
      </div>
      <h4>Create Account</h4>
      <label for="" class="loginLabel">Email</label>
      <input type="email" v-model="email" class="loginBox" />
      <label for="" class="loginLabel">Password</label>
      <input type="password" v-model="password" class="loginBox" />
      <label for="" class="loginLabel">Confirm Password</label>
      <input type="password" v-model="confirmPassword" class="loginBox" />
      <div class="passwordError" v-if="passwordError">
        Issue With Passwords!
      </div>
      <div class="createError" v-if="createdError">
        Error creating an account!
      </div>
      <button @click="createAccount()" class="loginButton">Submit</button>
      <div class="loginLine"></div>
      <router-link to="/login" class="loginLink"
        ><div>Already have an account?</div></router-link
      >
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
