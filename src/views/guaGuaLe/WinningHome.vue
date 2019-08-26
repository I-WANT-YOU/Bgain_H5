<template>
  <div class="winning">
    <div class="registerOne-container">
      <RegisterOne v-if ="state === 'registerOne'" v-on:toNextStep="toRegisterTwo"/>
      <RegisterTwo v-if="state === 'registerTwo'"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import RegisterOne from './components/RegisterOne.vue';
import RegisterTwo from './components/RegisterTwo.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'WinningHome',
  data() {
    return {
      state: 'registerOne',
    };
  },
  components: {
    RegisterOne,
    RegisterTwo,
    Footer,
  },
  methods: {
    /* 跳转到注册的第二步 */
    toRegisterTwo() {
      this.state = 'registerTwo';
    },
  },
};
</script>

<style lang="scss" scoped>
.winning{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../../assets/images/guaGuaLe/bg-gugugle.png") no-repeat;
  background-size: 100% 100%;
  /*注册页面1*/
  .registerOne-container{
    margin-top: 287px;
  }
}
</style>
