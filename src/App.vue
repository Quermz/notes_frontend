<template>
  <router-view v-if="!loading" />
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useStore } from "vuex";
  const store = useStore();
  const loading = ref(true);
  onMounted(async () => {
    loading.value = true;
    console.log("first");
    await store.dispatch("refreshLogin");
    loading.value = false;
  });
  console.log(store.state.notes);
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
