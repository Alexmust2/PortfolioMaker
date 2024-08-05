import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import ResumeBuilder from "../views/ResumeBuilder.vue";
import ResumeView from "../views/ResumeView.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/resume/create",
    name: "ResumeBuilder",
    component: ResumeBuilder,
    meta: { requiresAuth: true },
  },
  {
    path: "/resume/:id",
    name: "ResumeView",
    component: ResumeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
