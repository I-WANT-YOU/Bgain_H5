import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Testing.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
    },
    {
      path: '/',
      redirect: '/test',
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
      path: '/registerHome/:status',
      name: 'RegisterHome',
      component: () => import(/* webpackChunkName: "unLogin" */ '../views/home/RegisterHome.vue'),
    },
    {
      path: '/purchaseCoinHome/',
      name: 'PurchaseCoinHome',
      component: () => import(/* webpackChunkName: "PurchaseCoinHome" */ '../views/purchaseCoin/purchaseCoinHome.vue'),
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
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: () => import(/* webpackChunkName: "confirmOrder" */ '../views/purchaseCoin/confirmOrder.vue'),
    },
    {
      path: '/subscriptionResults/',
      name: 'SubscriptionResults',
      component: () => import(/* webpackChunkName: "subscriptionResults" */ '../views/product/fixed/SubscriptionResults.vue'),
    },
    {
      path: '/pleasePay/orderId', // lihui-请付款支付页面
      name: 'PleasePay',
      component: () => import(/* webpackChunkName: "PleasePay" */ '../views/purchaseCoin/PleasePay.vue'),
    },
    {
      path: '/toBeRelease/', // lihui-待放行
      name: 'ToBeRelease',
      component: () => import(/* webpackChunkName: "ToBeRelease" */ '../views/purchaseCoin/EbankTool.vue'),
    },
    {
      path: '/buyingRecord/', // lihui-买币记录
      name: 'BuyingRecord',
      component: () => import(/* webpackChunkName: "BuyingRecord" */ '../views/purchaseCoin/BuyingRecord.vue'),
    },
    {
      path: '/fillingRecord/', // lihui-冲币记录
      name: 'FillingRecord',
      component: () => import(/* webpackChunkName: "FillingRecord" */ '../views/purchaseCoin/FillingRecord.vue'),
    },
    {
      path: '/fillingDetail/', // lihui-冲币详情
      name: 'FillingDetail',
      component: () => import(/* webpackChunkName: "FillingDetail" */ '../views/purchaseCoin/FillingDetail.vue'),
    },
    {
      path: '/appeal/', // lihui-申诉
      name: 'Appeal',
      component: () => import(/* webpackChunkName: "Appeal" */ '../views/purchaseCoin/Appeal.vue'),
    },
    {
      path: '/buyingIllustration/', // lihui-冲币说明
      name: 'BuyingIllustration',
      component: () => import(/* webpackChunkName: "BuyingIllustration" */ '../views/purchaseCoin/BuyingIllustration.vue'),
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
            title: '天天赚',
          },
        },
        {
          path: 'fixed',
          component: () => import('../views/product/fixed/Fixed.vue'),
          meta: {
            title: '定期盈',
          },
        },
        {
          path: 'fund',
          component: () => import('../views/product/fund/Fund.vue'),
          meta: {
            title: '冠军基金',
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
    {
      path: '/product/fund/product-files',
      name: 'product-files',
      component: () => import('../views/product/fund/ProductFiles.vue'),
    },
    {
      path: '/product/fund/trade-rules',
      name: 'trade-rules',
      component: () => import('../views/product/fund/TradeRules.vue'),
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
    // 我的
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('../views/mine/Mine.vue'),
    },
    // 安全中心
    {
      path: '/mine/safety',
      name: 'security-center',
      component: () => import('../views/mine/safety/SecurityCenter.vue'),
    },
    {
      path: '/mine/safety/password',
      name: 'password',
      component: () => import('@views/mine/password/Password.vue'),
    },
    {
      path: '/mine/safety/password/login/change',
      name: 'change-login-password',
      component: () => import('@views/mine/password/ChangeLoginPassword.vue'),
    },
    {
      path: '/mine/safety/password/payment/reset',
      name: 'reset-payment-password',
      component: () => import('@views/mine/password/ResetPaymentPassword.vue'),
    },
    {
      path: '/mine/safety/password/payment/set',
      name: 'set-payment-password',
      component: () => import('@views/mine/password/SetPaymentPassword.vue'),
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
    {
      path: '/mine/safety/kyc/fields',
      name: 'kyc-fields',
      component: () => import('../views/mine/kyc/KycFields.vue'),
    },
    {
      path: '/mine/safety/address',
      name: 'receiving-address',
      component: () => import('../views/mine/address/ReceivingAddress.vue'),
    },
    {
      path: '/mine/balance',
      name: 'balance',
      component: () => import('../views/mine/balance/Balance.vue'),
    },
    {
      path: '/mine/balance/:currency',
      name: 'balance-detail',
      component: () => import('../views/mine/balance/BalanceDetail.vue'),
    },
    // 我的基金
    {
      path: '/mine/fund',
      name: 'MineFund',
      component: () => import('../views/mine/fund/MineFund.vue'),
    },
    // 基金交易历史记录
    {
      path: '/mine/fund/trade-record-history',
      name: 'TradeRecordHistory',
      component: () => import('../views/mine/fund/TradeRecordHistory.vue'),
    },
    // 待确定交易
    {
      path: '/mine/fund/trade-pending-record',
      name: 'TradePendingRecord',
      component: () => import('../views/mine/fund/TradePendingRecord.vue'),
    },
    // 交易详情
    {
      path: '/mine/fund/transaction-details',
      name: 'TransactionDetails',
      component: () => import('../views/mine/fund/TransactionDetails.vue'),
    },
    // 在持基金详情
    {
      path: '/mine/fund/fund-hold-detail/:id',
      name: 'FundDetail',
      component: () => import('../views/mine/fund/FundDetail.vue'),
    },
    // 基金赎回
    {
      path: '/mine/fund/fund-sell',
      name: 'FundSell',
      component: () => import('../views/mine/fund/FundSell.vue'),
    },
    // 赎回结果
    {
      path: '/mine/fund/fund-sell-result',
      name: 'FundSellResult',
      component: () => import('../views/mine/fund/SellResult.vue'),
    },
    // 我的定期
    {
      path: '/mine/fixed',
      name: 'MineFixed',
      component: () => import('../views/mine/fixed/MineFixed.vue'),
    },
    // 我的定期详情
    {
      path: '/mine/fixed-detail/:status',
      name: 'MineFixedDetail',
      component: () => import('../views/mine/fixed/FixedDetail.vue'),
    },
    // 消息中心
    {
      path: '/message/:type',
      name: 'Message',
      component: () => import('../views/message/Message.vue'),
    },
    // 消息中心详情
    {
      path: '/message-detail/:type',
      name: 'MessageDetail',
      component: () => import('../views/message/MessageDetail.vue'),
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/activity/ActivityCenter.vue'),
    },
    {
      path: '/BGPRecord',
      name: 'BGPRecord',
      component: () => import('../views/activity/BGPRecord.vue'),
    },
    {
      path: '/BGPDetailList',
      name: 'BGPDetailList',
      component: () => import('../views/activity/BGPDetailList.vue'),
    },
    {
      path: '/activity/product/:id',
      name: 'product-detail',
      component: () => import('../views/activity/product/ProductDetail.vue'),
    },
    {
      path: '/activity/product/:id/buy',
      name: 'product-buy',
      component: () => import('../views/activity/product/ProductBuy.vue'),
    },
    {
      path: '/activity/product/result/:orderId',
      name: 'product-result',
      component: () => import('../views/activity/product/ProductResult.vue'),
    },
    {
      path: '/activity/product/:id/result-fail',
      name: 'product-result-fail',
      component: () => import('../views/activity/product/ProductResultFail.vue'),
    },
    // 会员中心
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/member/Member.vue'),
    },
    // 更多福利
    {
      path: '/more-welfare',
      name: 'welfare',
      component: () => import('../views/member/MoreWelfare.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
