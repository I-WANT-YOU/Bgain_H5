<template>
  <div class="winning">
    <div class="registerOne-container">
      <div class="registerOne">
        <!--输入验证码-->
        <div class="baseInputContainer" >
          <BaseInput
            v-model="exchangeCodeInputValue"
            placeHolderValue="请输入兑换码"
            typeValue="text"
            maxlength="8"/>
        </div>
        <div class="baseInputContainer">
          <BaseInput
            v-model="accountInputValue"
            placeHolderValue="请输入手机号码或邮箱"
            maxlength="30"
            typeValue="text"/>
        </div>
        <div class="baseInputContainer bottomInputContainer">
          <BaseInput
            v-model="passWordInputValue"
            placeHolderValue="请输入登陆密码"
            maxlength="30"
            typeValue="password"/>
        </div>
        <!--切换登陆注册状态-->
        <div class="userState">
          <div @click="toForgetPassword">
            <span>忘记密码</span>
          </div>
          <div @click="toRegister" >
            <span>还没账户？</span><span>点击注册</span>
          </div>
        </div>
        <div class="buttons" >
          <button @click="exchange">立即兑换</button>
        </div>
      </div>
    </div>
    <div class="footerContainer">
      <Footer/>
    </div>
    <!--成功弹窗-->
    <ExchangeSuccess
      v-show="isShowPop"
      showInfo="popShowInfo"
      v-on:hidePop="(val)=>{this.isShowPop = val}"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions, mapState } from 'vuex';
import Footer from './components/Footer.vue';
import BaseInput from './components/BaseInput.vue';
import errorMessage from '../../constants/responseStatus';
import ExchangeSuccess from './ExchangeSuccess.vue';

export default {
  name: 'ActiveLoginOne',
  data() {
    return {
      exchangeCodeInputValue: '', // 兑换码
      accountInputValue: '', // 用户账号
      passWordInputValue: '', // 密码
      isShowPop: false,
      popShowInfo: {}, // pop弹窗信息
    };
  },
  components: {
    Footer,
    BaseInput,
    ExchangeSuccess,
  },
  computed: {
    ...mapState('user', [
      'codeExchangeInfo',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'codeExchange',
    ]),
    /* 校验兑换码的格式 */
    checkCodeInput(code) {
      const regCode = /^[2-9A-HJ-NP-Z]*$/; // 判断字符串是否为数字和字母组合
      if (!regCode.test(code)) { // 校验code
        Toast('输入的兑换码错误');
        return false;
      }
      if (code.length < 8) { // 校验code
        Toast('输入的兑换码错误');
        return false;
      }
      return true;
    },
    /* 校验账号和密码不能为空 */
    checkAccountAndPassword(account, password) {
      if (account === '') {
        Toast('账号不能为空');
        return false;
      }
      console.log(password);
      if (password === '') {
        Toast('密码不能为空');
        return false;
      }
      return true;
    },
    /* 跳转到注册页面 */
    toRegister() {
      this.$router.push({
        name: 'ActiveRegisterOne',
      });
    },
    /* 忘记密码 */
    toForgetPassword() {
      this.$router.push({
        name: 'ActiveForgetPasswordOne',
      });
    },
    /* 立即兑换 */
    exchange() {
      // 1、校验兑换码用户名和密码格式
      // eslint-disable-next-line max-len
      if (this.checkCodeInput(this.exchangeCodeInputValue) && this.checkAccountAndPassword(this.accountInputValue, this.passWordInputValue)) { // 校验成功
        // 2 、发送请求校验兑换码有效性 和 账号密码错误性
        const exchangeParams = {
          ticket_code: this.exchangeCodeInputValue,
          phone_number: this.accountInputValue,
          type: 1, // 登陆页面发起
          country_calling_code: '',
          validation_code: '', // 验证码
          password: this.passWordInputValue,
        };
        this.codeExchange(exchangeParams).then(
          () => {
            if (this.codeExchangeInfo.code === 0) {
              // 兑换成功 调用弹窗
              this.isShowPop = true;
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
  width: 100vw;
  height: 667px;
  overflow-y: scroll;
  background: url("../../assets/images/guaGuaLe/bg_all.jpg") no-repeat;
  background-size: 100% 100%;
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
      .bottomInputContainer{
        margin-bottom: 10px;
      }
      /*注册登陆切换*/
      .userState{
        padding:0 35px;
        display: flex;
        justify-content: space-between;
        >div{
          display: inline-block;
          >span{
            font-size:12px;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:30px;
            height: 30px;
          }
          >span:nth-child(2){
            text-decoration: underline;
          }
        }
      }
      /*button*/
      .buttons{
        margin-top: 20px;
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
