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
  </div>
</template>

<script>
import { Button, Toast } from 'vant';
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
      mobile: '',
      email: '',
      country: {
        key: 'China',
        text: '中国',
        value: '+86',
        label: '+86',
      },
    };
  },
  methods: {
    tabFun(text) {
      this.tab = text;
    },
    submit() {
      if (this.tab === 'mobile') {
        const re = /^[0-9]{1,15}$/;
        if (re.test(this.mobile)) {
          this.$router.push({ name: 'forgetPasswordSet', params: { mobile: this.mobile } });
        } else {
          Toast('请输入正确的手机号');
        }
      } else {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
        if (re.test(this.email)) {
          this.$router.push({ name: 'forgetPasswordSet', params: { email: this.email } });
        } else {
          Toast('请输入正确的邮箱号');
        }
      }
    },
    skip() {
      this.$router.push({ name: 'country', params: { fromPath: 'forgetPassword' } });
    },
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
    width: 7px;
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
          border-bottom: 1px solid #eeeeee;
          position: relative;
          &.mobile {
            display: flex;
            box-sizing: border-box;
            align-items: center;
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
                right: 0;
                bottom: 4px;
              }
            }
          }
          .input {
            height: 50px;
            padding: 7px 8px;
            box-sizing: border-box;
            border: 0;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            letter-spacing: 0;
          }
          .icon {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            right: 0;
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
