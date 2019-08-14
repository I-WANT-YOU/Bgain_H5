import Vue from 'vue';
import Vuex from 'vuex';

import coin from '@modules/coin';
import app from '@modules/app';
import auth from '@modules/auth';
import home from '@modules/home';
import product from '@modules/product';
import user from '@modules/user';
import message from '@modules/message';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    auth,
    home,
    product,
    user,
    coin,
    message,
  },
});
