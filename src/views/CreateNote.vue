<template>
  <div class="pageContainer">
    <div class="innerContainer">
      <h2>Create Note</h2>
      <h4>Title</h4>
      <textarea
        class="titleBox"
        maxlength="20"
        v-model="newNote.title"
      ></textarea>
      <h4>Content</h4>
      <textarea
        class="contentBox"
        maxlength="400"
        v-model="newNote.content"
      ></textarea>
      <h4>Favourite</h4>
      <input type="checkbox" v-model="newNote.favourite" />
      <button @click="createNote">Create Note</button>
      <router-link to="/notes" class="delete">
        <button>Discard</button></router-link
      >
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useStore } from "vuex";
  const store = useStore();
  const newNote = ref({ title: "", favourite: false, content: "" });
  function createNote() {
    store.dispatch("createNote", newNote.value);
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

  .delete > * {
    width: 100%;
  }
</style>
