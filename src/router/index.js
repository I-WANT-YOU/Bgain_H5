import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router;
