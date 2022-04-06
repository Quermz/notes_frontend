<template>
  <div class="pageContainer">
    <div class="innerContainer">
      <h2>Edit Note</h2>
      <h4>Title</h4>
      <textarea v-model="note.title" maxlength="20" class="titleBox"></textarea>
      <h4>Content</h4>
      <textarea
        v-model="note.content"
        maxlength="400"
        class="contentBox"
      ></textarea>
      <h4>Favourite</h4>
      <input type="checkbox" v-model="note.favourite" />
      <button @click="updateNote">Update Note</button>
      <button @click="deleteNote">Delete</button>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { ref, onUpdated, computed } from "vue";
  import { useStore } from "vuex";
  const store = useStore();
  const router = useRoute();
  const note = ref(store.getters.findNote(router.params.id));

  function updateNote() {
    store.dispatch("updateNote", note.value);
  }
  function deleteNote() {
    store.dispatch("deleteNote", note.value);
  }
</script>

<style scoped>
  textarea {
    resize: none;
  }
  .innerContainer {
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .innerContainer > * {
    width: 100%;
  }

  .titleBox {
    min-height: 2rem;
  }

  .contentBox {
    min-height: 10rem;
  }

  button {
    height: 2rem;
  }
</style>
