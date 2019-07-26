<template>
  <div class="register-two">
    <Header></Header>
    <div class="verification-code">
      <div class="code">
        <Field
          maxlength="6"
          v-model="verificationCode" placeholder="请输入验证码" />
      </div>
      <div class="send">
        <span>发送验证码</span>
      </div>
    </div>
    <div class="button">
      <Button :disabled='activeButton'  @click="confirm()">确定</Button >
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import {
  Field,Button,
} from 'vant';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

export default {
  name: 'RegisterStepTwo',
  components: {
    Header,
    Footer,
    Field,
    Button,
  },
  data() {
    return {
      verificationCode: '',
      activeButton: true,
    };
  },
  methods: {
    confirm() {
      console.log('77777');
      this.$router.push('/RegisterSuccess');
    },
  },
  watch: {
    verificationCode() {
      // this.verificationCode = val;
      if (this.verificationCode.length === 6) {
        this.activeButton = false;
      } else {
        this.activeButton = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
  .register-two{
    .verification-code{
      height: 55px;
      margin:36px 23px 0px 23px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #EEEEEE;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #CCCCCC;
      letter-spacing: 0;
      .code{
        width: 180px;
        margin-left: 8px;
        >div{
          padding: 0;
          input:{
            border: none;
          }
        }
      }
      .send{
        display: flex;
        justify-content: flex-end;
        >span{
          color: #3C64EE;
          text-align: right;
        }
      }


    }
    .button{
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 62px;
      >button{
        width: 331px;
        height: 46px;
        border: none;
        background: #3C64EE;
        border-radius: 4px;
        color: #ffffff;
        font-size: 16px;
      }

    }
  }

</style>
