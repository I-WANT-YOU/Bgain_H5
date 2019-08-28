<template>
  <div class="exchangeSuccess">
    <div class="bg-gif">
      <div class="exchangeInfo">
        <div>
          <!--<span>{{showInfo.amount}}</span>-->
          <span>USDT</span>
        </div>
        <!--<span>获取时间：{{formatDate(showInfo.timestamp)}}</span>-->
        <div class="buttons" @click="confirm">
          <button>确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import publicMethods from '@utils/publicMethods';

export default {
  name: 'ExchangeSuccess',
  props: [
    'showInfo',
  ],
  methods: {
    confirm() {
      this.$emit('hidePop', false);
    },
    formatDate(date) {
      return publicMethods.formatGuaGuaLeDate(date);
    },
  },
};
</script>

<style lang="scss" scoped>
  .exchangeSuccess{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    min-height: 100vh;
    background-color: rgba(1,1,1,0.8);
    font-family:PingFang SC sans-serif;
    .bg-gif{
      width: 375px;
      height: 677px;
      background:url("../../assets/images/guaGuaLe/guaguale.gif") no-repeat;
      background-size: 100% 100%;
      .exchangeInfo{
        width: 100%;
        height: 100%;
        padding-top: 73.13%;
        display: flex;
        flex-direction: column;
        align-items: center;
        >div{
          >span:nth-child(1){
            font-size:46px;
            font-weight:800;
            color:rgba(105,43,10,1);
          }
          >span:nth-child(2){
            font-size:22px;
            font-family:Arial sans-serif;
            font-weight:400;
            color:rgba(105,43,10,1);
            line-height:27px;
          }
        }
        >span{
          font-size:12px;
          font-weight:500;
          color:rgba(108,87,78,1)
        }
      }
       .buttons{
        margin-top: 93px;
        display: flex;
        justify-content: center;
        >button{
          width: 211px;
          height: 55px;
          background: url("../../assets/images/guaGuaLe/bg-basebutton.png") no-repeat;
          background-size: 211px 55px;
          font-size:15px;
          font-weight:bold;
          color:rgba(254,254,254,1);
          border:none;
        }
      }
    }
  }
</style>
