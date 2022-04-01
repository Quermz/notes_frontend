import { createRouter, createWebHashHistory } from "vue-router";

import NotesView from "@/views/NotesView.vue";
import LoginView from "@/views/LoginView.vue";
import EditNote from "@/views/EditNote.vue";

const routes = [
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
  {
    path: "/editNote/:id",
    name: "editNote",
    component: EditNote,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
