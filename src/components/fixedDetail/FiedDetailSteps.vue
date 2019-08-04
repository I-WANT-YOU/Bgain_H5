<template>
  <div class="guide">
    <div class="steps">
      <div class="step" v-for="step in steps" :key="step">
        <div class="drawing" >
          <div class="circle" :class="{activeCircle:step<fatherCurrentStep}"></div>
          <div class="x-line"  :class="{activeXLine:step<fatherCurrentStep}"></div>
        </div>
      </div>
      <div class="step">
        <div class="drawing">
          <div class="circle" :class="{activeCircle:fatherCurrentStep===4}">
          </div>
        </div>
      </div>
    </div>
    <div class="step-text">
      <div v-for="item in fromFatherDate" :key="item.type">
        <span>{{item.type}}</span>
        <span>{{item.big}}</span>
        <span>{{item.small}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiedDetailSteps',
  data() {
    return {
      steps: [0, 1, 2],
    };
  },
  props: ['fatherCurrentStep', 'fromFatherDate'],
  components: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .guide {
    width: 100%;
    height: 122px;
    overflow: hidden;
    font-family: PingFangSC-Regular;
    letter-spacing: 0;
    text-align: center;
    border-bottom: 0.51px solid #E5E9F6;
    .steps {
      display: flex;
      flex-direction: row;
      margin:32px 39px 0 39px;
      .step{
        width: 96px;
        .drawing {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 96px;
          height: 14px;
          .activeCircle{
            border: 2px solid  #3C64EE!important;
          }
          .circle {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            border: 2px solid #E5E9F6;
          }
          .x-line{
            width: 87px;
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
      margin-left: 19.5px;
      margin-top: 12px;
      >div{
        height: 18px;;
        font-size: 11px;
        color: #676C8D;
        letter-spacing: 0;
        line-height: 18px;
        >span{
          display: block;
          height: 14px;
          line-height: 14px;
        }
        >span:nth-child(1){
          height: 18px;
          line-height: 18px;
          color: #0F3256;
          margin-bottom: 3px;
        }
      }
      >div:nth-child(1){
        width: 68px;
        line-height: 18px;
        text-align: left;
      }
      >div:nth-child(2){
        margin-left: 35.5px;
        width:68px;
        height: 18px;
        text-align: left;
      }
      >div:nth-child(3){
        margin-left: 29px;
        width:68px;
        text-align: left;
      }
      >div:nth-child(4){
        margin-left: 17px;
        width:68px;
        text-align: left;
      }
    }
  }
</style>
