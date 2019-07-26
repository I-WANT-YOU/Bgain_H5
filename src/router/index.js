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
      component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/forgetPassword/ForgetPassword.vue'),
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ '../views/product/Product.vue'),
      children: [
        {
          path: 'current',
          component: () => import('../views/product/current/Current.vue'),
        },
        {
          path: 'fixed',
          component: () => import('../views/product/fixed/Fixed.vue'),
        },
        {
          path: 'fund',
          component: () => import('../views/product/fund/Fund.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
