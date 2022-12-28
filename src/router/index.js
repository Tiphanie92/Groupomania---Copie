import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import profil from "../components/profil.vue";
import compte from "../components/compte.vue";
import posts from "../components/posts.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/Profil",
      component: profil,
    },
    {
      path: "/Compte",
      component: compte,
    },
    {
      path: "/Posts",
      component: posts,
    },
  ],
});

export default router;
