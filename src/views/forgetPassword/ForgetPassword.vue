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
          <div v-show="tab === 'mobile'" class="tab-con-form-mobile-wrap">
            <div class="tab-con-form-input mobile">
              <p>
                <span class="text">{{country.text}}</span>
                <span class="phone">{{country.value}}</span>
                <i class="next skip" @click="skip"></i>
              </p>
            </div>
            <div class="tab-con-form-input">
              <input class="input" v-model="mobile" type="number" placeholder="请输入手机号" />
            </div>
          </div>
          <div v-show="tab === 'email'" class="tab-con-form-email-wrap">
            <div class="tab-con-form-input">
              <input class="input" v-model="email" type="texts" placeholder="请输入邮箱" />
              <i class="next icon"></i>
            </div>
          </div>
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
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError" />
  </div>
</template>

<script>
import { Button, Toast } from 'vant';
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import Geetest from '@component/Geetest.vue';

export default {
  name: 'ForgetPassword',
  components: {
    Header,
    Footer,
    Button,
    Geetest,
  },
  data() {
    return {
      disabled: false,
      tab: 'mobile',
      mobile: '',
      email: '',
      country: {
        key: 'China',
        text: '中国',
        value: '+86',
        label: '+86',
      },
      geetest: null,
      options: null,
    };
  },
  methods: {
    tabFun(text) {
      this.tab = text;
    },
    submit() {
      const mobileReg = /^[0-9]{1,15}$/;
      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
      const flag = this.tab === 'mobile' ? mobileReg.test(this.mobile) : emailReg.test(this.email);
      if (flag) {
        this.geetest.verify();
      } else {
        Toast(this.tab === 'mobile' ? '请输入正确的手机号' : '请输入正确的邮箱号');
      }
    },
    skip() {
      this.$router.push({ name: 'country', params: { fromPath: 'forgetPassword' } });
    },
    onLoaded(geetest) {
      this.geetest = geetest;
    },
    onSuccess(options) {
      this.options = options;
      let params = {};
      if (this.tab === 'mobile') {
        params = {
          type: 'mobile',
          username: this.mobile,
          countryCode: this.country.value,
          geetestOptions: options,
        };
      } else {
        params = {
          type: 'email',
          username: this.email,
          geetestOptions: options,
        };
      }
      this.$router.push({ name: 'forgetPasswordSet', params });
    },
    onError() { },
  },
  mounted() {
    if (this.$route.params.text) {
      this.country = this.$route.params;
    }
  },
};
</script>

<style lang="scss">
.forget-password {
  .bg-back {
    width: 8px;
    height: 13px;
    margin-left: 31px;
    background: url("../../assets/images/back.svg");
  }
  .next {
    display: inline-block;
    width: 8px;
    height: 11px;
    background: url("../../assets/images/next.svg");
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
          box-sizing: border-box;
          position: relative;
          &.mobile {
            display: flex;
            box-sizing: border-box;
            align-items: center;
            border-bottom: 1px solid #eeeeee;
            p {
              width: 100%;
              margin: 0;
              padding: 0;
              position: relative;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-left: 8px;
              padding-right: 23px;
              .text {
                font-family: PingFangSC-Regular;
                font-size: 15px;
                color: #333333;
                letter-spacing: 0;
              }
              .phone {
                display: inline-block;
                width: 40px;
                text-align: right;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
              }
              .skip {
                position: absolute;
                right: 1px;
                bottom: 4px;
              }
            }
          }
          .input {
            height: 47px;
            width: 100%;
            padding: 6px 8px;
            box-sizing: border-box;
            border: 0;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            letter-spacing: 0;
            border-bottom: 1px solid #eeeeee;
          }
          .icon {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            right: 2px;
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
}
</style>
