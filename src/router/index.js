import { createRouter, createWebHashHistory } from "vue-router";

import NotesView from "@/views/NotesView.vue";
import LoginView from "@/views/LoginView.vue";
import EditNote from "@/views/EditNote.vue";
import CreateNote from "@/views/CreateNote.vue";
import CreateAccount from "@/views/CreateAccount.vue";
import HomeView from "../views/HomeView";

const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/notes",
    name: "notes",
    component: NotesView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  { path: "/createAccount", name: "createAccount", component: CreateAccount },
  {
    path: "/editNote/:id",
    name: "editNote",
    component: EditNote,
  },
  { path: "/createNote", component: CreateNote },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
