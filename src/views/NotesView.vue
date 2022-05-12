<template>
  <div class="pageContainer">
    <div class="header">
      <div class="">{{ store.state.notes.length }} Notes</div>
      <div>{{ store.state.email }}</div>
      <button @click="logout" class="logoutButton">Log Out</button>
    </div>

    <router-link to="/createNote" class="noteContainer">
      <i class="fa-solid fa-circle-plus"></i>
    </router-link>
    <div class="noNotes" v-if="noNotes">
      You currently have no notes. To get started press the add symbol.
    </div>
    <div class="outerGridContainer">
      <div class="gridContainer">
        <div
          v-for="note in notes"
          :key="note._id"
          class="note"
          :class="note.favourite ? 'favouriteNote' : ''"
        >
          <div class="innerNoteContainer">
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
          </div>
          <div class="updatedAt">
            Updated:
            {{ note.updatedAt.split("T")[0] }}
            at
            {{ note.updatedAt.split("T")[1].split(".")[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useStore } from "vuex";
  import axios from "axios";
  import router from "@/router";

  const store = useStore();
  const notes = ref(store.getters.getNotes);
  const noNotes = computed(() => {
    if (store.state.notes.length == 0) {
      return true;
    }
  });
  if (!store.state.loggedIn) {
    router.push("/");
  }
  function logout() {
    store.dispatch("logout");
  }
</script>

<style scoped>
  .pageContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .header {
    display: flex;
    margin-top: 1rem;
    gap: 1rem;
  }

  .noNotes {
    text-align: center;
  }

  .logoutButton {
    font-size: 1rem;
    font-weight: bold;
    background: none;
    border: none;
  }

  .logoutButton:hover {
    cursor: pointer;
  }

  /* {
    position: fixed;
    bottom: 0%;
    right: 0%;
  } */

  .noteContainer {
    border-radius: 1rem;
    justify-content: center;
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

  .outerGridContainer {
    width: 100%;
  }
  .gridContainer {
    margin: auto;
    padding: 0rem 2rem 2rem 2rem;
    max-width: 1400px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 2rem;
  }
  .note {
    border-radius: 15px 0px 0px 0px;
    width: 100%;
    min-height: 300px;
    max-width: 400px;
    overflow: hidden;
    justify-self: center;
    background: lightblue;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-between;
  }

  .innerNoteContainer {
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

    height: 2rem;
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

  @media screen and (max-width: 1300px) {
    .gridContainer {
      max-width: 950px;

      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 840px) {
    .gridContainer {
      grid-template-columns: 1fr;
    }
  }
</style>
