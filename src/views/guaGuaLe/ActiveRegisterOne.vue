<template>
  <div class="winning">
    <div class="tips" @click="()=>{this.isShowTipPop = true}">兑换说明</div>
    <div class="registerOne-container">
      <div class="registerOne">
        <!--输入验证码-->
        <div class="baseInputContainer" >
          <BaseInput v-model="codeInputValue"
                     placeHolderValue="请输入兑换码"
                     maxlength="8"
                     typeValue="text"/>
        </div>
        <div class="phoneInputContainer">
          <PhoneInput :phoneInputValue="phoneInputValue"
                      v-on:input="phoneInputValue = $event"
                      @countryCode = 'getCountryCode'/>
        </div>
        <!--切换登陆注册状态-->
        <div class="userState" @click="toLogin">
          <div>
            <span>已有账号？</span><span>点击登录</span>
          </div>
        </div>
        <div class="buttons" >
          <button @click="toRegisterTwo">下一步</button>
        </div>
      </div>
    </div>
    <div class="footerContainer"><Footer/></div>
    <!--弹窗验证-->
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError"/>
    <tipPop v-on:close="()=>{this.isShowTipPop = false}" v-show="isShowTipPop"/>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState, mapActions } from 'vuex';
import Footer from './components/Footer.vue';
import BaseInput from './components/BaseInput.vue';
import PhoneInput from './components/PhoneInput.vue';
import Geetest from '../../components/Geetest.vue';
import tipPop from './components/ExchangeIllustration.vue';

export default {
  name: 'ActiveRegisterOne',
  data() {
    return {
      state: 'registerOne',
      codeInputValue: '',
      phoneInputValue: '',
      countryCode: '+86',
      isShowTipPop: false,
    };
  },
  components: {
    Footer,
    BaseInput,
    PhoneInput,
    Geetest,
    tipPop,
  },
  watch: {
    phoneInputValue() {
      if (this.phoneInputValue.length > 15) {
        this.phoneInputValue = this.phoneInputValue.substring(0, this.phoneInputValue.length - 1);
      }
    },
  },
  computed: {
    ...mapState('user', [
      'vCodeInfo',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'getActiveVerificationCode',
      'postRedeemCode',
    ]),
    /* 获取国家区号 */
    getCountryCode(val) {
      this.countryCode = val;
    },
    // 滑动验证
    onLoaded(geetest) {
      this.geetest = geetest;
    },
    onSuccess(options) {
      // 1 判断兑换码的有效性
      const redeemCodeParams = {
        ticket_code: this.codeInputValue,
        phone_number: this.phoneInputValue,
        type: 0, // 0注册
        country_calling_code: this.countryCode,
      };
      this.postRedeemCode(redeemCodeParams).then(() => {
        // 1 若兑换码正确 发送验证码
        // 2 判断是否注册
        const requestParams = {
          target: this.phoneInputValue,
          country_calling_code: this.countryCode,
          ...options,
        };
        this.getActiveVerificationCode(requestParams).then(
          () => {
            // 跳转到下一个页面
            this.$router.push({
              name: 'ActiveRegisterTwo',
              query: {
                phoneNum: this.phoneInputValue,
                countryCode: this.countryCode,
                exchangeCode: this.codeInputValue,
              },
            });
          },
          (err) => {
            if (err) {
              Toast(err);
            } else {
              Toast('网络错误');
            }
          },
        );
      },
      (err) => {
        if (err) {
          Toast(err);
        } else {
          Toast('网络错误');
        }
      });
    },
    onError() {},
    /* 校验兑换码和手机号是否符合规则 */
    checkInput(code, phone) {
      const regCode = /^[2-9A-HJ-NP-Z]*$/; // 判断字符串是否为数字和字母组合
      const regPhone = /^[0-9]{8,15}$/;
      if (!regCode.test(code)) { // 校验code
        Toast('输入的兑换码错误');
        return false;
      }
      if (code.length < 8) { // 校验code
        Toast('输入的兑换码错误');
        return false;
      }
      if (!regPhone.test(phone)) {
        Toast('手机号格式不正确');
        return false;
      }
      return true;
    },
    /* 跳转到注册的第二步 */
    toRegisterTwo() {
      if (this.checkInput(this.codeInputValue, this.phoneInputValue)) {
        // 1 若是校验通过 调取极验
        this.geetest.verify();
      }
    },
    /* 进入登录界面 */
    toLogin() {
      this.$router.push({
        name: 'ActiveLoginOne',
      });
    },
  },

  mounted() {
  },
  beforeDestroy() {
  },
};
</script>

<style lang="scss" scoped>
.winning{
  position: relative;
  overflow-y: scroll;
  width: 100vw;
  height: 667px;
  background: url("../../assets/images/guaGuaLe/bg_all.jpg") no-repeat;
  background-size: 100% 100%;
  .tips{
    position: absolute;
    top: 200px;
    right: 15px;
    font-size:14px;
    font-weight:400;
    text-decoration:underline;
    color:rgba(255,255,255,1);
    line-height:15px;
  }
  /*注册页面1*/
  .registerOne-container{
    margin-top: 287px;
    .registerOne{
      font-family:PingFang SC sans-serif;
      /*y验证码输入框*/
      .baseInputContainer{
        margin-bottom: 15px;
      }
      /*电话输入框*/
      .phoneInputContainer{
        margin-bottom: 10px;
      }
      /*注册登陆切换*/
      .userState{
        padding-right: 35px;
        display: flex;
        justify-content: flex-end;
        >div{
          >span{
            height: 35px;
            font-size:12px;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:35px;
          }
          >span:nth-child(2){
            text-decoration: underline;
          }
        }
      }
      /*button*/
      .buttons{
        margin-top: 15px;
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
