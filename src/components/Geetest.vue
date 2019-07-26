<template>
  <div id="bg-geetest"></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Geetest',
  created() {
    this.init();
  },
  methods: {
    ...mapActions({
      getGeetestOptions: 'auth/getGeetestOptions',
    }),
    async init() {
      const response = await this.getGeetestOptions();
      if (response.data && window) {
        window.initGeetest({
          gt: response.data.gt,
          challenge: response.data.geetest_challenge,
          offline: !response.success,
          new_captcha: response.data.new_captcha,
          product: 'bind',
          width: '240px',
        }, this.onGeetestLoad);
      }
    },
    onGeetestLoad(captchaObj) {
      captchaObj.onReady(() => {
        this.$emit('loaded', captchaObj);
      })
        .onSuccess(() => {
          const options = captchaObj.getValidate();
          this.$emit('success', options);
        })
        .onError((error) => {
          this.$emit('error', error);
        });
    },
  },
};
</script>

<style scoped>

</style>
