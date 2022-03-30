<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script setup>
  import { useStore } from "vuex";
  const store = useStore();
  if (sessionStorage.getItem("token")) {
    store.dispatch("refreshLogin");
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    font-family: "Comfortaa", cursive;
    color: black;
    text-decoration: none; /* no underline */
  }
</style>
