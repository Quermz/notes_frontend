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
    passwordError: false,
    creationError: false,
    emailCreationError: false,
    loginError: false,
    accountCreated: false,
    createContentRequired: false,
    createError: false,
    deleteNoteError: false,
    updateNoteError: false,
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
    setLogin(state, swap) {
      state.loggedIn = swap;
    },
    setPasswordError(state, swap) {
      state.passwordError = swap;
    },
    setCreationError(state, swap) {
      state.creationError = swap;
    },
    setEmailCreationError(state, swap) {
      state.emailCreationError = swap;
    },
    setLoginError(state, swap) {
      state.loginError = swap;
    },
    setAccountCreation(state, swap) {
      state.accountCreated = swap;
    },
    setCreateContentRequired(state, swap) {
      state.createContentRequired = swap;
    },
    setCreateError(state, swap) {
      state.createError = swap;
    },
    setDeleteError(state, swap) {
      state.deleteNoteError = swap;
    },
    setUpdateError(state, swap) {
      state.updateNoteError = swap;
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
      commit("setLoginError", false);
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
        await dispatch("fetchNotes");
        router.push("/notes");
      } catch (err) {
        commit("setLoginError", true);
      }
    },
    logout({ commit }) {
      sessionStorage.clear();
      commit("setToken", "");
      commit("setEmail", "");
      commit("setLogin", false);
      commit("setNotes", []);
      router.push("/");
    },
    async createAccount({ commit }, accountData) {
      commit("setPasswordError", false);
      commit("setCreationError", false);
      commit("setEmailCreationError", false);
      try {
        let newAccount = await axios({
          method: "post",
          url: "http://localhost:5000/api/user/register",
          data: {
            email: accountData.email,
            password: accountData.password,
            confirmPassword: accountData.confirmPassword,
          },
        });
        commit("setAccountCreation", true);
        router.push("/login");
      } catch (error) {
        if (error.response.status == 401) {
          commit("setPasswordError", true);
        } else if (error.response.status == 500) {
          commit("setCreationError", true);
        } else if (error.response.status == 400) {
          commit("setEmailCreationError", true);
        }
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

    async updateNote({ state, commit, dispatch }, updatedNote) {
      commit("setUpdateError", false);
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
        commit("setUpdateError", true);
        console.log(error);
      }
    },
    async deleteNote({ commit, state, dispatch }, deletedNote) {
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
        commit("setDeleteError", true);
        console.log(error);
      }
    },
    async createNote({ commit, state, dispatch }, newNote) {
      if (newNote.content.length == 0) {
        commit("setCreateContentRequired", true);
      }
      if (newNote.content.length > 0) {
        try {
          let createdNote = await axios({
            method: "post",
            url: "http://localhost:5000/api/notes/createNote",
            data: {
              email: state.email,
              title: newNote.title,
              content: newNote.content,
              favourite: newNote.favourite,
            },
            headers: {
              token: state.jsonToken,
            },
          });

          commit("setCreateError", false);
          commit("setCreateContentRequired", false);
          await dispatch("fetchNotes");
          router.push("/notes");
        } catch (error) {
          commit("setCreateError", true);
          console.log(error);
        }
      }
    },
  },
});
