<template>
  <router-view v-if="!loading" />
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";
  const store = useStore();
  const loading = ref(true);
  onMounted(async () => {
    console.log("this");
    loading.value = true;
    if (sessionStorage.getItem("email")) {
      await store.dispatch("refreshLogin");
    }
    loading.value = false;
  });
  console.log(store.state.notes);
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    font-family: "Karla", sans-serif;
    color: black;
    text-decoration: none; /* no underline */
  }
</style>
