<template>
  <div class="winning">
    <div class="registerOne-container">
      <div class="registerTwo">
        <!--验证码提示-->
        <div class="identifyingCode">
          <span>验证码已发送至</span>
          <span>{{'&nbsp;&nbsp;'+'&nbsp;&nbsp;'+changeShowPhone}}</span>
        </div>
        <!--验证码-->
        <div class="identifyingCodeInputContainer">
          <IdentifyingCodeInput
            v-model="codeInputValue"
            placeHolderValue = '请输入验证码'
            v-on:sendCodeAgain ="sendCode"/>
        </div>
        <!--密码-->
        <div class="baseInputContainer">
          <BaseInput
            v-model="passwordInputValue"
            placeHolderValue="8-20位字母及数字组成的密码"
            maxlength='20'
            typeValue="password"
          />
        </div>
        <!--服务协议-->
        <div class="protocol">
          <span>兑换即视为已阅读并同意</span>
          <span class="protocol-special" @click="onSkip('/agreement/service')">服务协议</span>
          <span>和</span>
          <span class="protocol-special"  @click="onSkip('/agreement/privacy')">隐私政策</span>
        </div>
        <div class="buttons" >
          <button @click="exchange">立即兑换</button>
        </div>
      </div>
    </div>
    <div class="footerContainer">
      <Footer/>
    </div>
    <ExchangeSuccess
      v-if="isShowPop"
      :showInfo="codeExchangeInfo"
      v-on:hidePop="()=>{this.isShowPop = false}"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import * as Auth from '@utils/auth';
import { mapActions, mapState } from 'vuex';
import Footer from './components/Footer.vue';
import BaseInput from './components/BaseInput.vue';
import IdentifyingCodeInput from './components/IdentifyingCodeInput.vue';
import errorMessage from '../../constants/responseStatus';
import ExchangeSuccess from './ExchangeSuccess.vue';

export default {
  name: 'RegisterStepTwo',
  data() {
    return {
      countryCode: '',
      showPhone: '',
      passwordInputValue: '', // 密码
      codeInputValue: '', // 验证码
      exchangeCode: '', // 兑换码
      isShowPop: false,
    };
  },
  components: {
    BaseInput,
    IdentifyingCodeInput,
    Footer,
    ExchangeSuccess,
  },
  watch: {
    codeInputValue() {
      if (this.codeInputValue.length > 6) {
        this.codeInputValue = this.codeInputValue.substring(0, this.codeInputValue.length - 1);
      }
    },
  },
  computed: {
    ...mapState('user', [
      'codeExchangeInfo',
    ]),
    changeShowPhone() {
      if (this.showPhone.length !== 0) {
        const phoneList = this.showPhone.split('');
        const newPhoneList = phoneList.map((item, index) => {
          if (index > 2 && index < phoneList.length - 3) {
            return '*';
          }
          return item;
        });
        return newPhoneList.join('');
      }
      return '';
    },
  },
  methods: {
    ...mapActions('user', [
      'codeExchange',
      'getActiveVerificationCode',
    ]),
    /* 跳转到服务协议 */
    onSkip(router) {
      this.$router.push(router);
    },
    /* 重新发送验证码 */
    sendCode() {
      // 发送验证码
      const requestParams = {
        target: this.showPhone,
        country_calling_code: this.countryCode,
      };
      this.getActiveVerificationCode(requestParams).then(
        () => { Toast('发送成功'); },
        (err) => {
          if (err) {
            Toast(err);
          } else {
            Toast('网络错误');
          }
        },
      );
    },
    /* 校验验证码的格式 */
    checkCode(code) {
      if (!code || code.length < 6) {
        Toast('验证码格式不对');
        return false;
      }
      return true;
    },
    /* 校验密码 */
    checkPassword(password) {
      // 密码校验
      if (!password
        || password.length < 8
        || password.length > 20) {
        Toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      if (!regPassword.test(password)) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      return true;
    },
    /* 校验密码是否一致 */
    exchange() {
      if (this.checkCode(this.codeInputValue)) {
        if (this.checkPassword(this.passwordInputValue)) {
          // 验证通过 调用接口进行兑换
          const exchangeParams = {
            ticket_code: this.exchangeCode,
            phone_number: this.showPhone,
            type: 0, // 注册页面发起
            country_calling_code: this.countryCode,
            validation_code: this.codeInputValue, // 验证码
            password: this.passwordInputValue,
          };
          this.codeExchange(exchangeParams).then(
            () => {
              if (this.codeExchangeInfo.code === 0) {
                // 兑换成功 调用弹窗
                this.isShowPop = true;
                Auth.setToken(this.codeExchangeInfo.data.access_token);
              } else if (this.codeExchangeInfo.msg) {
                Toast(this.codeExchangeInfo.msg);
              } else {
                Toast(errorMessage[this.codeExchangeInfo.code]);
              }
            },
            (err) => {
              // 提示错误信息
              if (err) {
                Toast('网络错误');
              } else {
                Toast('网络错误');
              }
            },
          );
        }
      }
    },
  },
  mounted() {
    if (this.$route.query.phoneNum && this.$route.query.countryCode) {
      this.showPhone = this.$route.query.phoneNum;
      this.countryCode = this.$route.query.countryCode;
      this.exchangeCode = this.$route.query.exchangeCode;
    }
  },
  beforeDestroy() {
  },
  // 修改列表页的meta值，false时再次进入页面会重新请求数据。
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
};
</script>

<style lang="scss" scoped>
.winning{
  position: relative;
  width: 100vw;
  height: 667px;
  overflow-y: scroll;
  background: url("../../assets/images/guaGuaLe/bg_all.jpg") no-repeat;
  background-size: 100% 100%;
  /*注册页面1*/
  .registerOne-container{
    margin-top: 287px;
    .registerTwo{
      font-family:PingFang SC sans-serif;
      /*验证码提示*/
      .identifyingCode{
        display: flex;
        padding: 0 0 15px 36px;
        >span{
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
      /*y验证码输入框*/
      .identifyingCodeInputContainer{
        margin-bottom: 15px;
      }
      /*密码输入框*/
      .phoneInputContainer{
        margin-bottom: 20px;
      }
      /*服务协议*/
      .protocol{
        padding: 16px 36px 0 36px;
        display: flex;
        justify-content: center;
        >span{
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:11px;
        }
        .protocol-special{
          text-decoration: underline;
          color: #FCCB13;
        }
      }
      /*button*/
      /*button*/
      .buttons{
        margin-top: 25px;
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
  .footerContainer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
