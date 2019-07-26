import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "home" */ '../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "home" */ '../views/register/Register.vue'),
    },
    {
      path: '/registerStepTwo',
      name: 'RegisterStepTwo',
      component: () => import(/* webpackChunkName: "registerStepTwo" */ '../views/register/RegisterStepTwo.vue'),
    },
    {
      path: '/registerSuccess',
      name: 'RegisterSuccess',
      component: () => import(/* webpackChunkName: "registerSuccess" */ '../views/register/RegisterSuccess.vue'),
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
