<template>
  <div class="winning">
    <div class="registerOne-container">
      <div class="registerOne">
        <!--忘记密码-->
        <div class="baseInputContainer" >
          <BaseInput v-model="accountInputValue"
                     placeHolderValue="请输入手机号或邮箱"
                     typeValue="text"
                     maxlength="30"
          />
        </div>
        <div class="buttons" >
          <button @click="toForgetPasswordTwo">下一步</button>
        </div>
      </div>
    </div>
    <div class="footerContainer">
      <Footer/>
    </div>
    <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError"/>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions } from 'vuex';
import Footer from './components/Footer.vue';
import BaseInput from './components/BaseInput.vue';
import errorMessage from '../../constants/responseStatus';
import Geetest from '../../components/Geetest.vue';

export default {
  name: 'ActiveForgetPasswordOne',
  data() {
    return {
      accountInputValue: '',
    };
  },
  components: {
    Footer,
    BaseInput,
    Geetest,
  },
  methods: {
    ...mapActions('user', [
      'getUserNameInfo',
      'getActiveVerificationCode',
    ]),
    /* 调用接口 判断用户名是否注册 */
    checkUserName(params) {
      return this.getUserNameInfo(params);
    },
    /* 跳转到注册的第二步 */
    toForgetPasswordTwo() {
      const { geetest } = this;
      // 验证用户账号非空
      if (this.accountInputValue === '') {
        Toast('账号不能为空');
        return false;
      }
      // 调用接口 判断用户名是否已经注册
      const userNameParams = {
        username: this.accountInputValue,
        invitation_code: '',
      };
      this.checkUserName(userNameParams).then(
        () => {
          Toast('用户不存在');
        },
        (err) => {
          if (err.status === 2) {
            geetest.verify();
          } else {
            Toast(errorMessage[err.status]);
          }
        },
      );
      return true;
    },
    // 滑动验证
    onLoaded(geetest) {
      this.geetest = geetest;
    },
    onSuccess(options) {
      // 发送验证码
      const requestParams = {
        target: this.accountInputValue,
        country_calling_code: '+86',
        ...options,
      };
      this.getActiveVerificationCode(requestParams).then(
        () => {
          // 跳转到下一个页面
          this.$router.push({
            name: 'ActiveForgetPasswordTwo',
            query: {
              accountNum: this.accountInputValue,
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
    onError() {},
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
  min-height: 677px;
  overflow-y: scroll;
  background: url("../../assets/images/guaGuaLe/bg_all.jpg") no-repeat;
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
      /*button*/
      .buttons{
        margin-top: 26px;
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
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
