<template>
  <div class="guideContainer">
    <div class="guide">
      <div class="guide-title">
        <span>新手引导</span>
      </div>
      <div class="steps">
        <div class="step" v-for="(step,index) in steps" :key="index">
          <div class="img-container"><svg-icon :icon-class="step.img[0]" class="img-style"/></div>
          <div class="text-container">{{step.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeGuide',
  data() {
    return {
      steps: [
        {
          img: ['register_light', 'register_dark '],
          text: '注册',
        },
        {
          img: ['identity_light', 'identity_dark'],
          text: '身份认证',
        },
        {
          img: ['password_light', 'password_dark'],
          text: '设置交易密码',
        },
        {
          img: ['coin_light', 'coin_dark'],
          text: '充币',
        }],
      currentStep: 0,
    };
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
  .guideContainer{
    padding:10px 0;
    background: #F8F8F8;
    .guide {
      font-family: PingFangSC-Regular;
      background: #FFFFFF;
      letter-spacing: 0;
      text-align: left;
      padding-bottom: 16px;
      .guide-title {
        height: 21px;
        padding:12.4px 0 0 25px;
        font-size: 15px;
        color: #002262;
        line-height: 21px;
        text-align: left;
      }
      .steps {
        display: flex;
        flex-direction: row;
        margin-top: 21.6px;
        color: #676C8D;
        .step{
          width: 25%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          font-size: 11px;
          color: #676C8D;
          >div:nth-child(2){
            margin-top: 11px;
          }
          .img-style{
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }

</style>
