<template>
  <div class="guide">
    <div class="guide-title">
      <span>新手引导</span>
    </div>
    <div class="steps">
      <div class="step" v-for="step in steps" :key="step">
        <div class="drawing" >
          <div class="circle" :class="{activeCircle:step<=currentStep}"></div>
          <div class="x-line"  :class="{activeXLine:step<=currentStep}"></div>
        </div>
      </div>
      <div class="step">
        <div class="drawing">
          <div class="circle" :class="{activeCircle:currentStep===3}">
          </div>
        </div>
      </div>
    </div>
    <div class="step-text">
      <div>注册</div>
      <div>身份认证</div>
      <div>设置交易密码</div>
      <div>充币</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeGuide',
  data() {
    return {
      steps: [0, 1, 2],
      currentStep: 0,
    };
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
.guide {
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
  text-align: center;
  .guide-title {
    width: 60px;
    height: 38px;
    margin-left: 24px;
    font-size: 15px;
    color: #002262;
    line-height: 37.36px;
    text-align: left;
  }
  .steps {
    display: flex;
    flex-direction: row;
    margin-left: 30px;
    margin-right: 31px;
    margin-top: 16px;
    .step{
      width: 100px;
      .drawing {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100px;
        height: 14px;
        .activeCircle{
          background: #3C64EE!important;
        }
        .circle {
          background: #E5E9F6;
          width: 14px;
          height: 14px;
          border-radius: 25px;
        }
        .x-line{
          width: 86px;
          height: 2px;
          background: #E5E9F6;
        }
        .activeXLine{
          background: #3C64EE!important;
        }
      }
    }

  }
  .step-text{
    display: flex;
    font-size: 11px;
    margin-left: 24px;
    margin-top: 16px;
    >div{
      height: 34px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #676C8D;
      letter-spacing: 0;
      line-height: 18px;
      display: block;
    }
    >div:nth-child(1){
      width: 24px;
      line-height: 18px;
      text-align: center;
    }
    >div:nth-child(2){
      margin-left: 63px;
      width:66px;
      height: 34px;
      text-align: left;
    }
    >div:nth-child(3){
      margin-left: 24px;
      width:75px;
      text-align: left;
    }
    >div:nth-child(4){
      margin-left: 48px;
      width:45px;
      text-align: left;
    }
  }
}
</style>
