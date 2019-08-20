<template>
  <div class="more-products">
    <div @click="go">
      <span>更多产品</span>
      <img alt="." src="../../../assets/images/blue_next.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMoreProducts',
  props: {
    statu: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    go() {
      if (this.statu === 0) {
        this.$router.push('/product/fund');
      } else if (this.statu === 1) {
        this.$router.push('/product/current');
      } else if (this.statu === 2) {
        this.$router.push('/product/fixed');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.more-products {
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
  display: flex;
  height: 20px;
  margin-top: 21px;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      color: #3c64ee;
      text-align: center;
    }
    > img {
      width: 6px;
      height: 10px;
      margin-left: 6px;
    }
  }
}
</style>
