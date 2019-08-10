<template>
  <div class="home-tip" v-show = !!announcement>
    <img src="../../assets/images/home_tip.svg" alt="."/>
    <span>{{announcement}}</span>
    <img src="../../assets/images/home_next.svg" alt="."/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeTip',
  computed: {
    ...mapGetters('home', [
      'announcement',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .home-tip{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    width: 340px;
    height: 30px;
    font-family: PingFangSC-Regular sans-serif;
    letter-spacing: 0;
    text-align: center;
    background: url(../../assets/images/home/backRectangle.svg);
    >img{
      width: 20px;
      height: 20px;
    }
    >img:nth-child(1){
      margin-left: 15px;
    }
    /*>img:nth-child(2){*/
      /*margin-left: 40px;*/
    /*}*/
    >span{
      font-size: 14px;
      color: #2A55E7;
      margin-left: 12px;
      margin-right: 40px;
    }
  }
</style>
