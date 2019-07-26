<template>
    <div class="register-success">
      <Header></Header>
      <div class="imageStyle">
        <img alt="." src="../../assets/images/register_success.svg">
      </div>
      <div class="success-tips"><span>注册成功</span></div>
      <div class="info">
        <span>为了保证您在平台交易的资金安全</span>
        <span>还需完成KYC身份认证</span>
      </div>
      <div class="continue-button"><button>继续身份验证</button></div>
      <div class="goToNext">
        <a href="#">跳过次步，先去浏览平台产品</a>
        <img alt="." src="../../assets/images/next.svg">
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../../components/Footer.vue';
import Header from '../../components/Header.vue';

export default {
  name: 'RegisterSuccess',
  components: {
    Header,
    Footer,
  },
  methods: {

  },
};

</script>

<style lang='scss' scoped>
  .register-success{
    >div{
      width: 100%;
      display: flex;
      justify-content: center;
      font-family: PingFangSC-Semibold;
      letter-spacing: 0;
    }
    .imageStyle{
      height: 78px;
      margin-top:35px;
      >img{
        width: 73px;
        height: 75px;
      }
    }
    .success-tips{
      margin-top:16px;
      height: 25px;
      >span{
        font-size: 18px;
        color: #333333;
        font-weight: 600;
      }
    }
    .info{
      height: 40px;
      font-size: 13px;
      color: #797979;
      flex-direction: column;
      >span{
        text-align: center;
        line-height: 20px;
      }
    }
    .continue-button{
      margin-top:33px;
      height: 46px;
      >button{
        width: 331px;
        background: #3C64EE;
        border-radius: 4px;
        font-size: 16px;
        color: #FFFFFF;
        border: none;
      }
    }
    .goToNext{
      height: 24px;
      margin-top:51px;
      >a{
        text-decoration-line: none;
        font-size: 14px;
        color: #3C64EE;
        text-align: center;
        line-height: 24px;
      }
      >img{
        color: #3C64EE;
        margin-left: 5.5px;
      }
    }
  }
</style>
