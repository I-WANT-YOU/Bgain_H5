const vVisible = {
  install(Vue) {
    Vue.directive('visible', (el, binding) => {
      const { value } = binding;

      if (value) {
        el.style.visibility = 'visible';
      } else {
        el.style.visibility = 'hidden';
      }
    });
  },
};

export default vVisible;
