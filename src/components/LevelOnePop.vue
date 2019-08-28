<template>
  <div class="levelOne-pop" :style="{display:show}">
    <van-image :src="boxImage" class="box-class"/>
    <!--关闭-->
    <div class="close-container" @click="closePop">
      <van-image :src="close" class="close-icon"/>
    </div>
    <!--y-line-->
    <div class="line-container"><div class="y-line"></div></div>
    <div class="lightBox">
      <p class="content-title">新人礼 请查收</p>
      <div class="content-info">
          <div class="info-item">
            <div>
              <p class="placeHolder" v-show="!showData.is_register"></p>
              <van-image :src="checkImage" class="check-icon" v-show="showData.is_register" />
              <span>注册Bgain</span>
            </div>
            <div>
              <van-image :src="showData.is_register?coinLight:coinDark" class="coin-icon"/>
              <span>+{{showData.register_reward}}</span>
            </div>
          </div>
        <div class="info-item">
          <div>
            <p class="placeHolder" v-show="!showData.is_kyc"></p>
            <van-image :src="checkImage" class="check-icon" v-show="showData.is_kyc" />
            <span>身份认证</span>
          </div>
          <div>
            <van-image :src="showData.is_kyc?coinLight:coinDark" class="coin-icon"/>
            <span>+{{showData.kyc_reward}}</span>
          </div>
        </div>
        <div class="info-item">
          <div>
            <p class="placeHolder" v-show="!showData.is_recharge"></p>
            <van-image :src="checkImage" class="check-icon" v-show="showData.is_recharge"/>
            <span>首次充币</span>
          </div>
          <div>
            <van-image :src="showData.is_recharge?coinLight:coinDark" class="coin-icon"/>
            <span>+{{showData.recharge_reward}}</span>
          </div>
        </div>
        <div class="info-item">
          <div>
            <p class="placeHolder" v-show="!showData.is_buy"></p>
            <van-image :src="checkImage" class="check-icon" v-show="showData.is_buy"/>
            <span>首次投资</span>
          </div>
          <div>
            <van-image :src="showData.is_buy?coinLight:coinDark" class="coin-icon"/>
            <span>+{{showData.buy_reward}}</span>
          </div>
        </div>
        </div>
      <!--按钮-->
      <div class="button-container">
        <button @click="onKyc">去身份认证</button>
      </div>
      <!--text文字-->
      <div class="text-container">
        <div class="text">
          <span>BGP能做啥</span>
          <span>BGP可以投资、兑换优惠券、兑换实物等</span>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { Image } from 'vant';
import { mapState } from 'vuex';
import boxImage from '../assets/images/levelOnePop/box.png';
import checkImage from '../assets/images/levelOnePop/check.png';
import coinDark from '../assets/images/levelOnePop/coin_dark.png';
import coinLight from '../assets/images/levelOnePop/coin_light.png';
import close from '../assets/images/levelOnePop/close.png';

export default {
  name: 'LevelOnePop',
  data() {
    return {
      boxImage,
      checkImage,
      coinDark,
      coinLight,
      close,
    };
  },
  props: [
    'show',
    'showData',
  ],
  components: {
    'van-image': Image,
  },
  mounted() {
    console.log(this.showData);
  },
  computed: {
    ...mapState('auth', ['authenticated']),
  },
  methods: {
    closePop() {
      this.$emit('close');
    },
    onKyc() {
      if (this.authenticated) {
        this.$router.push('/mine/safety/kyc');
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.levelOne-pop{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  padding:0 25px 0 25px;
  background: rgba(0,0,0,0.8);
  z-index: 99;
  .box-class{
    position: absolute;
    top: 66px;
    left: 106px;
    width: 157px;
    height: 106px;
  }
  /*close*/
  .close-container{
    height: 25px;
    padding-top: 39px;
    .close-icon{
      margin:0 0 0 263px;
      width: 25px;
      height: 25px;
    }
  }
  /*line*/
  .line-container{
    .y-line{
      margin-left:293px;
      height: 72px;
      width: 1px;
      background: #ffffff;
    }
  }
  .lightBox{
    padding-bottom: 20px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    /*信息*/
    .content-title{
      margin: 50px 0 0 0 ;
      font-size:17px;
      font-family :PingFang-SC-Medium sans-serif;
      text-align: center;
    }
    .content-info{
      margin-top: 27px;
      padding:0 20px;
      .info-item{
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        >div:nth-child(1){
          display: flex;
          align-items: center;
          .placeHolder{
            margin: 0;
            width: 18px;
            height: 13px;
          }
          .check-icon{
            width: 18px;
            height: 13px;
          }
          >span{
            margin-left: 10px;
            line-height: 15px;
            font-size:14px;
            color:rgba(102,102,102,1);
          }
        }
        >div:nth-child(2){
          display: flex;
          align-items: center;
          .coin-icon{
            width: 27px;
            height: 27px;
          }
          >span{
            margin-left: 9px;
            font-size:13px;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:11px
          }
        }
      }
    }
    /*按钮*/
    .button-container{
      display: flex;
      justify-content: center;
      >button{
        width: 231px;
        height: 45px;
        background: #3C64EE;
        border: none;
        color: #FFFFFF;
        font-size:15px;
        font-family:PingFang SC sans-serif;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:13px;
      }
    }
    /*文字*/
    .text-container{
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .text{
        width: 295px ;
        height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: url("../assets/images/levelOnePop/background-rectangle.png") no-repeat;
        background-size: 295px 65px;
        font-size:13px;
        font-weight:400;
        color:rgba(42,85,231,1);
        line-height:17px;
        >span{
          padding-left: 22px;
        }
      }
    }

  }
}
</style>
