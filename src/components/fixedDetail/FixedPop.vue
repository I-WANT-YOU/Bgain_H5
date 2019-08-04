<template>
<div class="pop">
  <div class="pob-background"></div>
  <div class="panel">
    <div class="panel-img">
      <svg-icon icon-class='fixed_result_failed' class="result-icon"/>
    </div>
    <div class="panel-text">
      <span>您当前可用余额不足，请先充币</span>
    </div>
    <div class="panel-button">
      <button @click="cancel">取消</button>
      <button @click="rushMoney">立即冲币</button>
    </div>
  </div>
</div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
export default {
  name: 'FixedPop',
  methods: {
    // 取消
    cancel() {},
    // 冲币
    rushMoney() {},
  },
};
</script>

<style lang="scss" scoped>
.pop{
  position: relative;
  .pob-background{
    height: 100vh;
    width: 100vw;
    z-index:99;
    background-color: rgba(0,0,0,0.5);
  }
  .panel{
    position: absolute;
    top: 150px;
    left: 35px;
    right: 35px;
    width: 305px;
    height: 220px;
    background: #FFFFFF;
    z-index:999;
    font-family: PingFangSC-Regular sans-serif;
    >div{
      display: flex;
      justify-content: center;
    }
    .panel-img{
      margin-top: 24px;
      .result-icon{
        width: 43px;
        height: 52px;
      }
    }
    .panel-text{
      margin-top: 24px;
      >span{
        height: 24px ;
        font-size: 16px;
        color: #0F3256;
        letter-spacing: 0.15px;
        text-align: center;
        line-height: 24px;
      }
    }
    .panel-button{
      margin-top: 36px;
      >button{
        border-radius: 4px;
        border: none;
        font-size: 15px;
        letter-spacing: 0;
        text-align: center;
        line-height: 37.36px
      }
      >button:nth-child(1){
        height: 40px;
        width: 114px;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
      }
      >button:nth-child(2){
        margin-left: 11px;
        height: 40px;
        width: 140px;
        background: #3C64EE;
        color: #FBFCFB;
      }
    }
  }
}
</style>
