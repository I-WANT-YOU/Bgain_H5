<template>
  <header class="bg-head">
    <div v-if="back" class="bg-back" @click="backFun"></div>
    <div v-else class="bg-back bg-back-no"></div>
    <h3>{{title}}</h3>
    <div></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    back: {
      type: Boolean,
      default: true,
    },
    backPath: {
      type: String,
      default: '/',
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    backFun() {
      this.$router.history.push(this.backPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-head {
  height: 44px;
  display: flex;
  align-items: center;
  background: #fff;
  .bg-back {
    width: 8px;
    height: 13px;
    margin-left: 31px;
    background: url("../assets/images/back.svg");
  }
  .bg-back-no {
    background: none;
  }
  h3 {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: 400;
    margin-left: 107px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 37.36px;
  }
}
</style>
