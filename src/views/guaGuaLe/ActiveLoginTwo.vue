<template>
  <div class="winning">
    <div class="registerOne-container">
      <div class="registerOne">
        <!--输入验证码-->
        <div class="baseInputContainer" >
          <BaseInput v-model="baseInputValue" placeHolderValue="请输入兑换码" typeValue="text"/>
        </div>
        <div class="userContainer">
          <BaseInput v-model="baseInputValue" placeHolderValue="请输入登录密码" typeValue="password"/>
        </div>
        <!--忘记密码-->
        <div class="forgetPassword" @click="toLogin">
          <div>
            <span>忘记密码</span>
          </div>
        </div>
        <div class="nextStep" @click="toRegisterTwo">
          <BaseButton title="立即兑换"/>
        </div>
      </div>
    </div>
    <div class="footerContainer"><Footer/></div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import BaseInput from './components/BaseInput.vue';
import BaseButton from './components/BaseButton.vue';

export default {
  name: 'ActiveLoginTwo',
  data() {
    return {
      state: 'registerOne',
      baseInputValue: '',
      phoneInputValue: '',
    };
  },
  components: {
    Footer,
    BaseInput,
    BaseButton,
  },
  methods: {
    /* 跳转到注册的第二步 */
    toRegisterTwo() {
      this.$router.push({
        name: 'ActiveLoginTwo',
        query: {
          phoneNum: '122333',
        },
      });
    },
    /* 进入登录界面 */
    toLogin() {
      this.$router.push({
        name: 'ActiveForgetPasswordOne',
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../../assets/images/guaGuaLe/bg-gugugle.png") no-repeat;
  background-size: 100% 100%;
  /*注册页面1*/
  .registerOne-container{
    margin-top: 287px;
    .registerOne{
      font-family:PingFang SC sans-serif;
      padding-top: 32px;
      /*y验证码输入框*/
      .baseInputContainer{
        margin-bottom: 15px;
      }
      /*电话输入框*/
      .userContainer{
        margin-bottom: 10px;
      }
      /*注册登陆切换*/
      .forgetPassword{
        padding-right: 35px;
        display: flex;
        justify-content: flex-end;
        >div{
          display: inline-block;
          height:28px;
          >span{
            font-size:12px;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:11px;
          }
          >span:nth-child(2){
            text-decoration: underline;
          }
        }
      }
    }
    .nextStep{
      margin-top: 20px;
    }
  }
  /*button*/
  .footerContainer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
