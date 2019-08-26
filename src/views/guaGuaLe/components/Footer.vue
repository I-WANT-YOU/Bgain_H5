<template>
    <div class="footer">
      <span>微信客服：Bgainkefu (周一至周五 09:00-20:00)</span>
      <span>*风险提示：市场有风险，投资需谨慎*</span>
    </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size:10px;
    font-family:PingFang SC sans-serif;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:19px;
  }
</style>
