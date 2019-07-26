import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "home" */ '../views/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "home" */ '../views/Register.vue'),
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import(/* webpackChunkName: "home" */ '../views/ForgetPassword.vue'),
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
