import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () =>
          import(/* webpackChunkName: "Welcome" */ "../views/welcome/Welcome")
      },
      {
        path: "/write",
        name: "WriteArticle",
        component: () =>
          import(/* webpackChunkName: "WriteArticle" */ "../views/write/WriteArticle")
      },
      {
        path: "/edit",
        name: "EditView",
        component: () =>
          import(/* webpackChunkName: "EditView" */ "../views/edit/EditView")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
