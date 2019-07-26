import Vue from 'vue';
import SvgIcon from '@component/SvgIcon.vue';

Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);

requireAll(req);
