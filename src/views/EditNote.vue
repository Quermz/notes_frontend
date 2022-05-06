<template>
  <div class="createPageContainer">
    <div class="createInnerContainer">
      <h2>Edit Note</h2>
      <h4>Title</h4>
      <textarea
        v-model="note.title"
        maxlength="20"
        class="createTitleBox"
      ></textarea>
      <h4>Content</h4>
      <textarea
        v-model="note.content"
        maxlength="400"
        :class="{ createContentRequired: createContentRequired }"
        class="createContentBox"
      ></textarea>
      <div class="createContentRequiredText" v-if="createContentRequired">
        Content is required to update a note!
      </div>
      <div class="createFavouriteContainer">
        <h4>Favourite</h4>
        <input type="checkbox" v-model="note.favourite" />
      </div>
      <button @click="updateNote" class="createButtons">Update Note</button>
      <button @click="deleteNote" class="createButtons">Delete</button>
      <h3 v-if="deleteNoteError">Error deleting note!</h3>
      <h3 v-if="updateNoteError">Error updating note!</h3>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { ref, computed, onUnmounted } from "vue";
  import { useStore } from "vuex";
  onUnmounted(() => {
    store.commit("setCreateContentRequired", false);
  });

  const createContentRequired = computed(() => {
    return store.getters.getContentRequire;
  });

  const updateNoteError = computed(() => {
    return store.state.updateNoteError;
  });
  const deleteNoteError = computed(() => {
    return store.state.deleteNoteError;
  });
  const store = useStore();
  const router = useRoute();
  const note = JSON.parse(
    JSON.stringify(store.getters.findNote(router.params.id))
  );
  console.log(note);
  function updateNote() {
    store.dispatch("updateNote", note);
  }
  function deleteNote() {
    store.dispatch("deleteNote", note);
  }
</script>

<style scoped></style>
