<template>
  <div class="createPageContainer">
    <div class="createInnerContainer">
      <h2>Create Note</h2>
      <h4>Title</h4>
      <textarea
        class="createTitleBox"
        maxlength="20"
        v-model="newNote.title"
      ></textarea>
      <h4>Content</h4>
      <textarea
        class="createContentBox"
        :class="{ createContentRequired: createContentRequired }"
        maxlength="400"
        v-model="newNote.content"
      ></textarea>
      <div class="createContentRequiredText" v-if="createContentRequired">
        Content is required to create note!
      </div>
      <div class="createFavouriteContainer">
        <h4>Favourite</h4>
        <input type="checkbox" v-model="newNote.favourite" />
      </div>
      <button @click="createNote" class="createButtons">Create Note</button>

      <button class="createButtons">
        <router-link to="/notes" class="delete">Discard</router-link>
      </button>
      <h3 class="createErrorText" v-if="createError">
        Server error creating note!
      </h3>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onUnmounted } from "vue";
  import { useStore } from "vuex";
  onUnmounted(() => {
    store.commit("setCreateContentRequired", false);
  });

  const createContentRequired = computed(() => {
    return store.state.createContentRequired;
  });
  const createError = computed(() => {
    return store.state.createError;
  });
  const store = useStore();
  const newNote = ref({ title: "", favourite: false, content: "" });
  function createNote() {
    store.dispatch("createNote", newNote.value);
  }
</script>

<style>
  textarea {
  }
  .createPageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .createInnerContainer {
    margin-top: 1rem;
    max-width: 500px;
    width: 100%;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .innerContainer > * {
  }

  .createButtons {
    height: 2rem;
    font-size: 1rem;
    font-weight: bold;
    background: none;
    border: none;
    border-bottom: 1px solid black;
  }

  .createButtons:hover {
    cursor: pointer;
  }

  .createTitleBox {
    padding: 0.5rem;
    width: 100%;
    min-height: 2rem;
    resize: none;
  }

  .createContentBox {
    padding: 0.5rem;
    width: 100%;
    min-height: 10rem;
    resize: none;
  }

  .createContentRequired {
    border: 1px solid #c93434;
  }

  .createFavouriteContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  @media screen and (max-width: 600px) {
    .createInnerContainer {
      width: 100%;
      padding: 0.5rem;
    }

    .createButtons {
      max-width: 250px;
    }
  }
</style>
