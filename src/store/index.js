import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";

export default createStore({
  state: {
    notes: [],
    loggedIn: false,
    email: "",
    jsonToken: "default",
    editNote: {},
  },
  getters: {
    findNote: (state) => (id) => {
      return state.notes.find((note) => note._id === id);
    },
    getNotes: (state) => {
      return state.notes;
    },
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    setToken(state, jsonToken) {
      state.jsonToken = jsonToken;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setLogin(state, email) {
      state.loggedIn = true;
    },
  },
  actions: {
    async fetchNotes({ state, commit }) {
      try {
        let returnNotes = await axios({
          method: "put",
          url: "http://localhost:5000/api/notes/getNotes",
          data: {
            email: state.email,
          },
          headers: {
            token: state.jsonToken,
          },
        });
        commit("setNotes", returnNotes.data);
      } catch (err) {
        console.log(err);
      }
    },
    async login({ commit, dispatch }, loginData) {
      try {
        let loginReturn = await axios({
          method: "post",
          url: "http://localhost:5000/api/user/login",
          data: {
            email: loginData.email,
            password: loginData.password,
          },
        });
        commit("setToken", loginReturn.data.accessToken);
        commit("setEmail", loginReturn.data.user.email);
        commit("setLogin", true);
        sessionStorage.setItem("token", loginReturn.data.accessToken);
        sessionStorage.setItem("email", loginReturn.data.user.email);

        dispatch("fetchNotes");
        router.push("/notes");
      } catch (err) {
        console.log(err);
      }
    },
    async refreshLogin({ commit, dispatch }) {
      try {
        let refresh = await axios({
          method: "post",
          url: "http://localhost:5000/api/user/reload",
          data: {
            email: sessionStorage.getItem("email"),
          },
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        commit("setToken", sessionStorage.getItem("token"));
        commit("setEmail", sessionStorage.getItem("email"));
        commit("setLogin", true);
        await dispatch("fetchNotes");
      } catch (error) {
        router.push("/login");
        console.log(error);
        sessionStorage.clear();
      }
    },

    async updateNote({ state, dispatch }, updatedNote) {
      try {
        let updateNote = await axios({
          method: "put",
          url: "http://localhost:5000/api/notes/updateNote",
          data: {
            noteId: updatedNote._id,
            email: state.email,
            title: updatedNote.title,
            content: updatedNote.content,
            favourite: updatedNote.favourite,
          },
          headers: {
            token: state.jsonToken,
          },
        });
        await dispatch("fetchNotes");
        router.push("/notes");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNote({ state, dispatch }, deletedNote) {
      try {
        let deleteNote = await axios({
          method: "put",
          url: "http://localhost:5000/api/notes/deleteNote",
          data: {
            noteId: deletedNote._id,
            email: state.email,
          },
          headers: {
            token: state.jsonToken,
          },
        });
        await dispatch("fetchNotes");
        router.push("/notes");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
