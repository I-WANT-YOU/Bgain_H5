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
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '../views/register/Register.vue'),
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
      path: '/unLoginHome/:status',
      name: 'UnLoginHome',
      component: () => import(/* webpackChunkName: "unLogin" */ '../views/home/UnLoginHome.vue'),
    },
    {
      path: '/loginHome/:status',
      name: 'LoginHome',
      component: () => import(/* webpackChunkName: "loginHome" */ '../views/home/LoginHome.vue'),
    },
    {
      path: '/registerHome/:status',
      name: 'RegisterHome',
      component: () => import(/* webpackChunkName: "unLogin" */ '../views/home/RegisterHome.vue'),
    },
    {
      path: '/homeToLogin/',
      name: 'HomeToLogin',
      component: () => import(/* webpackChunkName: "HomeToLogin" */ '../components/home/HomeToLogin.vue'),
    },
    {
      path: '/fixedPurchaseStepOne',
      name: 'FixedPurchaseStepOne',
      component: () => import(/* webpackChunkName: "fixedPurchaseStepOne" */ '../views/product/fixed/FixedPurchaseStepOne.vue'),
    },
    {
      path: '/fixedPurchaseStepTwo',
      name: 'FixedPurchaseStepTwo',
      component: () => import(/* webpackChunkName: "fixedPurchaseStepTwo" */ '../views/product/fixed/FixedPurchaseStepTwo.vue'),
    },
    {
      path: '/subscriptionResults/',
      name: 'SubscriptionResults',
      component: () => import(/* webpackChunkName: "subscriptionResults" */ '../views/product/fixed/SubscriptionResults.vue'),
    },
    {
      path: '/test/',
      name: 'fixedPop',
      component: () => import(/* webpackChunkName: "fixedPop" */ '../components/fixedDetail/FixedPop.vue'),
    },
    {
      path: '/country',
      name: 'country',
      component: () => import(/* webpackChunkName: "register" */ '../views/country/Country.vue'),
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/forgetPassword/ForgetPassword.vue'),
    },
    {
      path: '/forgetPasswordSet',
      name: 'forgetPasswordSet',
      component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/forgetPasswordSet/ForgetPasswordSet.vue'),
    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ '../views/product/Product.vue'),
      children: [
        {
          path: 'current',
          component: () => import('../views/product/current/Current.vue'),
          meta: {
            title: '活期',
          },
        },
        {
          path: 'fixed',
          component: () => import('../views/product/fixed/Fixed.vue'),
          meta: {
            title: '定期',
          },
        },
        {
          path: 'fund',
          component: () => import('../views/product/fund/Fund.vue'),
          meta: {
            title: '基金',
          },
        },
      ],
    },
    {
      path: '/product/fixed/:id',
      name: 'FixedDetail',
      component: () => import('../views/product/fixed/FixedDetail.vue'),
    },
    {
      path: '/product/fund/initial/:id',
      name: 'initial',
      component: () => import('../views/product/fund/Initial/Initial.vue'),
    },
    {
      path: '/product/fund/noinitial/:id',
      name: 'noinitial',
      component: () => import('../views/product/fund/NoInitial/NoInitial.vue'),
    },
    {
      path: '/product/current/trade-records',
      name: 'trade-records',
      component: () => import('../views/product/current/TradeRecords.vue'),
    },
    {
      path: '/product/current/history-rates/',
      redirect: '/product/current',
    },
    {
      path: '/product/current/history-rates/:currency',
      name: 'history-rates',
      component: () => import('../views/product/current/HistoryRates.vue'),
    },
    {
      path: '/product/current/history-profit/',
      redirect: '/product/current',
    },
    {
      path: '/product/current/history-profit/:currency',
      name: 'history-profit',
      component: () => import('../views/product/current/HistoryProfit.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
