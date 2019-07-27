<template>
  <div class="home">
    注册
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError" />
    <button @click="onClick">Geetest</button>
    <div @click="$router.push({name:'country',params:{fromPath:'home'}})">country</div>
  </div>
</template>

<script>
import Geetest from '../../components/Geetest.vue';

export default {
  name: 'home',
  components: {
    Geetest,
  },
  data() {
    return {
      geetest: null,
      options: null,
    };
  },
  methods: {
    onLoaded(geetest) {
      this.geetest = geetest;
    },
    onSuccess(options) {
      this.options = options;
    },
    onError() { },
    onClick() {
      this.geetest.verify();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  font-size: 18px;
}
</style>
