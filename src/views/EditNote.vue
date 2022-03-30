<template>
  <div>
    <div>testsololo</div>
    <h2></h2>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  import { useStore } from "vuex";
  const store = useStore();
  const router = useRoute();
  const note = ref();
  onMounted(() => {
    store.dispatch("refreshLogin");
    note.value = ref(store.getters.findNote(router.params.id));
    console.log(note.value);
  });
</script>

<style scoped></style>
