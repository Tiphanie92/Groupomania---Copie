import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import profil from "../components/profil.vue";
import compte from "../components/compte.vue";
import posts from "../components/posts.vue";
import about from "../view/abouts.vue";
import comments from "../view/comments.vue";
import contact from "../view/contact.vue";

import { getUserState } from "../firebase";

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
      meta: { requiresAuth: true },
    },
    {
      path: "/Compte",
      component: compte,
      meta: { requiresAuth: true },
      children: [
        {
          path: "About",
          component: about,
        },
        {
          path: "Comments",
          component: comments,
        },
        {
          path: "Contact",
          component: contact,
        },
      ],
    },
    {
      path: "/Posts",
      component: posts,
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresUnauth = to.matched.some(
    (record) => record.meta.requiresUnauth
  );

  const isAuth = await getUserState();

  if (requiresAuth && !isAuth) next("/");
  else if (requiresUnauth && isAuth) next("/");
  else next();
});
export default router;
