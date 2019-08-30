<template>
  <div class="exchangeSuccess">
      <div class="exchangeInfo">
        <span class="info-title">恭喜您获得</span>
        <div class="info-text">
          <span>{{showInfo.data.amount}}</span>
          <span>USDT</span>
        </div>
        <span class="info-date">获取时间：{{formatDate(showInfo.timestamp)}}</span>
        <div class="success">
          <img alt="" src="../../assets/images/guaGuaLe/success.png"/>
        </div>
      </div>
      <div class="buttons" @click="confirm">
        <button>立即查看</button>
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
      this.$router.push({ name: 'Mine' });
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
    min-height: 667px;
    background-color: rgba(1,1,1,0.8);
    font-family:PingFang SC sans-serif;
    .exchangeInfo{
      position: relative;
      width: 265px;
      height: 129px;
      margin:200px auto 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: url("../../assets/images/guaGuaLe/font_container.png") no-repeat;
      background-size: 265px 129px;
      .info-title{
        margin-top: 18px;
        font-size: 18px;
        color:#C1A188;
      }
      .info-text{
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
      .info-date{
        margin-top: 5px;
        font-size:12px;
        font-weight:500;
        color:rgba(108,87,78,1)
      }
      .success{
        position: absolute;
        top: 10px;
        left: 8px;
        >img{
          width: 37px;
          height: 38px;
        }
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
</style>
