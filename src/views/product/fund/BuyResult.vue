<template>
  <div class="buy-result">
    <BgainNavBar title="购买结果" />
    <Fail v-if="show" class="buy-result-con" />
    <Success v-if="!show" class="buy-result-con" />
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import Fail from './components/Fail.vue';
import Success from './components/Success.vue';

export default {
  name: 'BuyResult',
  components: {
    BgainNavBar,
    Fail,
    Success,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang='scss' scoped>
.buy-result {
  .buy-result-con {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
