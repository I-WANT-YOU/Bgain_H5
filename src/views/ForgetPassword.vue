<template>
  <div class="forget-password">
    <Header title="找回登录密码" :backPath="'/login'" />
    <div class="tab">
      <div class="tab-nav">
        <div :class="tab === 'mobile' ? 'active' : ''" @click="tabFun('mobile')">手机号</div>
        <span class="line">|</span>
        <div :class="tab === 'email' ? 'active' : ''" @click="tabFun('email')">邮箱</div>
      </div>
      <div class="tab-con">
        <div class="tab-con-form">
          <div class="tab-con-form-input mobile">
            <p>
              <span class="text">{{mobile.text}}</span>
              <span class="phone">{{mobile.phone}}</span>
              <i class="skip" @click="skip"></i>
            </p>
          </div>
          <div class="tab-con-form-input"></div>
        </div>
        <div class="tab-con-button">
          <Button
            tag="div"
            :class="['sure-btn', disabled ? 'button-disabled':'']"
            :disabled="disabled"
            type="info"
            @click="submit"
          >下一步</Button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { Button } from 'vant';
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';

export default {
  name: 'ForgetPassword',
  components: {
    Header,
    Footer,
    Button,
  },
  data() {
    return {
      disabled: false,
      tab: 'mobile',
      mobile: {
        text: '中国大陆',
        phone: '+86',
      },
    };
  },
  methods: {
    tabFun(text) {
      this.tab = text;
    },
    submit() {

    },
    skip() {

    },
  },
};
</script>

<style lang="scss">
.bg-back {
  width: 8px;
  height: 13px;
  margin-left: 31px;
  background: url("../assets/images/back.svg");
}
.tab {
  margin-top: 25px;
  .tab-nav {
    display: flex;
    box-sizing: border-box;
    padding-left: 30px;
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #999999;
    letter-spacing: 0;
    div {
      &.active {
        color: #333333;
      }
    }
    .line {
      margin: 0 26px;
    }
  }
  .tab-con {
    .tab-con-form {
      height: 172px;
      box-sizing: border-box;
      padding: 16px 22px 0;
      .tab-con-form-input {
        height: 50px;
        // padding: 0 6px;
        border-bottom: 1px solid #eeeeee;
        .skip {
          display: inline-block;
          margin-left: 18px;
          width: 7px;
          height: 11px;
          background: url("../assets/images/next.svg");
        }
        &.mobile {
          display: flex;
          align-items: center;
          .text {
            margin-right: 210px;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
          }
          .phone {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
          }
        }
      }
    }
    .tab-con-button {
      width: 331px;
      height: 46px;
      border-radius: 4px;
      overflow: hidden;
      margin-left: 22px;
      .sure-btn {
        width: 100%;
        height: 100%;
        border: 0;
        font-size: 16px;
        color: #fbfcfb;
        letter-spacing: 0;
        text-align: center;
        line-height: 46px;
        background: #3c64ee;
      }
      .button-disabled {
        background: #d2d8eb;
      }
    }
  }
}
</style>
