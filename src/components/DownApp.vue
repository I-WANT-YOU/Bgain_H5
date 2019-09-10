<template>
<div class="downApp" :class="{isNotShow:isNotShow}">
  <div class="close" @click="close">
    <img src="../assets/images/downapp/close.svg"/>
  </div>
  <div class="downApp-down" >
    <button @click="onSkip">下载</button>
  </div>
</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
export default {
  name: 'DownApp',
  data() {
    return {
      isNotShow: false,
    };
  },
  methods: {
    close() {
      this.isNotShow = true;
      this.$emit('func', this.isNotShow);
    },
    onSkip() {
      window._czc.push(['_trackEvent', 'click', 'footer浮窗-下载APP']);
      window.location.href = 'https://fir.im/ngaw';
    },
  },
};
</script>

<style lang="scss" scoped>
  .isNotShow{
    display: none!important;
  }
.downApp{
  position: relative;
  height: 63px;
  width: 100%;
  background:url(../assets/images/downapp/background.svg) no-repeat ;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .close{
    position: absolute;
    top:8.8px;
    left: 357.8px;
    width: 11.2px;
    height: 11.3px;
      >img{
        display: block;
        width: 10px;
        height: 10px;
      }
  }
  .downApp-down{
    width: 68px;
    height: 28px;
    margin-right: 20px;
    display: flex;
    >button{
      width: 68px;
      height: 28px;
      background: #6393FF;
      border-radius: 4px;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 13px;
      color: #EAF0FB;
    }
  }
}
</style>
