<template>
<div class="downApp" :class="{isNotShow:isNotShow}">
  <div class="close"    @click="close">
    <img src="../assets/images/downapp/close.svg"/>
  </div>
  <div class="down" >
    <button>下载</button>
  </div>
</div>
</template>

<script>
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
  .down{
    position: absolute;
    width: 68px;
    height: 28px;
    top:5px;
    left: 281px;
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
