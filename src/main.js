import Vue from 'vue';
import { Dialog } from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import 'normalize.css';
import './assets/css/common.css';

import './assets/scripts/geetest';
import './icons';

Vue.config.productionTip = false;
Vue.use(Dialog);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
