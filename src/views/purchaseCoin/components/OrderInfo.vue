<template>
  <div class="orderInfo">
    <div v-for="(item,index) in orderInformation" :key="index">
      <span>{{item.title}}</span>
      <span>{{item.content}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'orderInfo',
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInformation',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .orderInfo{
    margin-top: 20px;
    padding:0 30px;
    background: #FFFFFF;
    border-radius: 6px;
    >div{
      display: flex;
      justify-content: space-between;
      >span{
        height: 41px;
        line-height: 41px;
        font-size: 15px;
      }
      >span:nth-child(1){
        color: #666666;
      }
      >span:nth-child(2){
        color: #0F3256;
      }
    }
  }
</style>
