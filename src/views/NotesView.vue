// tests
<template>
  <div class="pageContainer">
    <router-link to="/" class="noteContainer">
      <i class="fa-solid fa-circle-plus"></i>
    </router-link>
    <div class="gridContainer">
      <div
        v-for="note in store.state.notes"
        :key="note._id"
        class="note"
        :class="note.favourite ? 'favouriteNote' : ''"
      >
        <div class="headElement">
          <h1 class="title">
            {{ note.title }}
          </h1>
          <router-link :to="{ name: 'editNote', params: { id: note._id } }"
            ><i class="fa-solid fa-pen-to-square"></i
          ></router-link>
        </div>
        <p class="content">
          {{ note.content }}
        </p>
        <div class="updatedAt">
          Updated:
          {{ note.updatedAt.split("T")[0] }}
          at
          {{ note.updatedAt.split("T")[1].split(".")[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useStore } from "vuex";
  import axios from "axios";

  const store = useStore();
  // if (store.state.loggedIn) {
  //   store.dispatch("fetchNotes");
  // }
</script>

<style scoped>
  .pageContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .noteContainer {
    border-radius: 1rem;
    justify-content: center;
    position: fixed;
    bottom: 0%;
    right: 0%;
    margin-bottom: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    transition: all 0.25s ease;
    opacity: 0.6;
    border-radius: 10rem;
  }
  .noteContainer:hover {
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .fa-circle-plus {
    font-size: 64px;
    position: sticky;
    top: 20px;
    color: black;
  }
  .gridContainer {
    padding: 2rem;
    max-width: 1500px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;
  }
  .note {
    width: 100%;
    min-height: 300px;
    overflow: hidden;
    background: lightblue;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .favouriteNote {
    border: 1px solid black;
    background: lightyellow;
  }

  .headElement {
    display: flex;
  }
  .title {
    font-size: 24px;
    background: none;
    border: none;
    width: 100%;
    overflow-wrap: break-word;
    resize: none;
  }

  .fa-pen-to-square {
  }
  .content {
    background: none;
    word-break: break-all;
    width: 100%;
    border: none;
    overflow-wrap: break-word;
    resize: none;
  }

  .updatedAt {
    margin-top: 1rem;
    font-style: italic;
    justify-self: end;
    align-self: flex-end;
    font-size: 0.8rem;
  }

  @media screen and (max-width: 1200px) {
    .gridContainer {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 800px) {
    .gridContainer {
      grid-template-columns: 1fr;
    }
  } ;
</style>
