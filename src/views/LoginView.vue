<template>
  <div class="loginOuterContainer">
    <div class="loginContainer">
      <div class="loginHeader">
        <h1>co Notes</h1>
        <i class="fa-solid fa-square-pen"></i>
      </div>
      <h3 v-if="accountCreated">Account Created!</h3>
      <h4>Log In</h4>
      <label class="loginLabel">Email Address</label>
      <input class="loginBox" type="text" v-model="email" />
      <label class="loginLabel">Password</label>
      <input class="loginBox" type="password" v-model="password" />
      <div class="loginError" v-if="loginError">Details not recognised!</div>
      <button class="loginButton" @click="login()">Submit</button>
      <div class="loginLine"></div>
      <router-link to="/createAccount" class="loginLink"
        ><div>Haven't got an account?</div></router-link
      >
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";
  const loginError = computed(() => {
    return store.state.loginError;
  });

  const accountCreated = computed(() => {
    return store.state.accountCreated;
  });
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

<style>
  .loginOuterContainer {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginContainer {
    padding: 2rem;
    border: 2px solid;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 300px;
    width: 500px;
    margin-top: 1rem;
  }

  .loginContainer > * {
    width: 80%;
    text-align: center;
    color: #03071e;
  }

  .loginHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  .loginHeader > * {
    font-size: 2rem;
  }

  .loginHeader > .fa-square-pen {
    font-size: 2.5rem;
  }

  .loginLable {
    color: #03071e;
  }

  .loginLink {
    text-decoration: underline;
  }

  .loginLine {
    height: 1px;
    background: #03071e;
  }

  .loginBox {
    height: 3rem;
    border: 1px solid #03071e;
  }

  .loginButton {
    background: white;

    font-size: 1.5rem;
    height: 3rem;
    border: 1px solid #03071e;
  }

  .loginButton:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    .loginContainer {
      max-width: 100%;
      border: none;
      padding: 0.3rem;
    }

    .loginContainer > * {
      max-width: 100%;
    }
  }
</style>
