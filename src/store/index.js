import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";

export default createStore({
  state: {
    notes: [],
    loggedIn: false,
    email: "",
    jsonToken: "default",
  },
  getters: {
    findNote: (state) => (id) => {
      return state.notes.find((note) => note._id === id);
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
            email: sessionStorage.getItem("email").toString(),
          },
          headers: {
            token: sessionStorage.getItem("token").toString(),
          },
        });

        if (refresh.status === 200) {
          commit("setToken", sessionStorage.getItem("token"));

          commit("setEmail", sessionStorage.getItem("email"));
          commit("setLogin", true);
          dispatch("fetchNotes");
        }
      } catch (error) {
        router.push("/login");
        console.log(error);
        sessionStorage.clear();
      }
    },

    async updateNote({ commit, dispatch }) {
      try {
        let refresh = await axios({
          method: "post",
          url: "http://localhost:5000/api/user/reload",
          data: {
            email: sessionStorage.getItem("email").toString(),
          },
          headers: {
            token: sessionStorage.getItem("token").toString(),
          },
        });

        if (refresh.status === 200) {
          commit("setToken", sessionStorage.getItem("token"));

          commit("setEmail", sessionStorage.getItem("email"));
          commit("setLogin", true);
          dispatch("fetchNotes");
        }
      } catch (error) {
        router.push("/login");
        console.log(error);
        sessionStorage.clear();
      }
    },
  },
});
