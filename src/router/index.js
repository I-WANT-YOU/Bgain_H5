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
      path: '/forgetpassword',
      name: 'forgetPassword',
      component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/forgetPassword/ForgetPassword.vue'),
    },
    {
      path: '/forgetpasswordset',
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
          name: 'current',
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
      path: '/product/fund/subscribe/:id',
      name: 'subscribe',
      component: () => import('../views/product/fund/Subscribe.vue'),
    },
    {
      path: '/product/fund/initial/:id',
      name: 'initial',
      component: () => import('../views/product/fund/Initial.vue'),
    },
    {
      path: '/product/fund/noinitial/:id',
      name: 'noinitial',
      component: () => import('../views/product/fund/NoInitial.vue'),
    },
    {
      path: '/product/fund/result',
      name: 'result',
      component: () => import('../views/product/fund/BuyResult.vue'),
    },
    // 活期交易记录
    {
      path: '/product/current/trade-records',
      name: 'trade-records',
      component: () => import('../views/product/current/TradeRecords.vue'),
    },
    // 活期历史年化收益率
    {
      path: '/product/current/history-rates/',
      redirect: '/product/current',
    },
    {
      path: '/product/current/history-rates/:currency',
      name: 'history-rates',
      component: () => import('../views/product/current/HistoryRates.vue'),
    },
    // 活期历史收益
    {
      path: '/product/current/history-profit/',
      redirect: '/product/current',
    },
    {
      path: '/product/current/history-profit/:currency',
      name: 'history-profit',
      component: () => import('../views/product/current/HistoryProfit.vue'),
    },
    // 活期转出
    {
      path: '/product/current/sell/',
      redirect: '/product/current',
    },
    {
      path: '/product/current/sell/:currency',
      name: 'current-sell',
      component: () => import('../views/product/current/CurrentSell.vue'),
    },
    {
      path: '/product/current/buy/',
      redirect: '/product/current',
    },
    {
      path: '/product/current/buy/:currency',
      name: 'current-buy',
      component: () => import('../views/product/current/CurrentBuy.vue'),
    },
    {
      path: '/product/current/buy/:currency/result',
      name: 'current-buy-result',
      component: () => import('../views/product/current/CurrentBuyResult.vue'),
    },
    {
      path: '/product/current/sell/:currency/result',
      name: 'current-sell-result',
      component: () => import('../views/product/current/CurrentSellResult.vue'),
    },
    {
      path: '/passwordconfig',
      name: 'passwordConfig',
      component: () => import('../views/passwordConfig/PasswordConfig.vue'),
    },
    {
      path: '/passwordconfig/reset/loginpassword',
      name: 'resetLoginPassword',
      component: () => import('../views/passwordConfig/ResetLoginPassword.vue'),
    },
    {
      path: '/passwordconfig/reset/tradepassword',
      name: 'resetTradePassword',
      component: () => import('../views/passwordConfig/ResetTradePassword.vue'),
    },
    {
      path: '/passwordconfig/set/tradepassword',
      name: 'setTradePassword',
      component: () => import('../views/passwordConfig/SetTradePassword.vue'),
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('../views/mine/Mine.vue'),
    },
    {
      path: '/mine/safety/kyc',
      name: 'kyc',
      component: () => import('../views/mine/kyc/Kyc.vue'),
    },
    {
      path: '/mine/safety/kyc-result',
      name: 'kyc-result',
      component: () => import('../views/mine/kyc/KycResult.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
