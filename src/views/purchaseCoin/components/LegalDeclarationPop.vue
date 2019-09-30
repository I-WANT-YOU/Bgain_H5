<template>
  <div class="pop">
    <BgainNavBar title="资金来源合法声明" :onArrowClick = "goBack" />
    <div class="agm__container">
      <div class="agm__section">
        我承诺资金来源合法，保证提交的任何信息和资料均真实合法有效完备，所购买的虚拟货币不用于任何非法用途，我对自己的行为承担法律责任。</div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';

export default {
  name: 'LegalDeclarationPop',
  components: {
    BgainNavBar,
  },
  methods: {
    goBack() {
      this.$emit('popShow', false);
    },
  },
};
</script>
<style scoped lang="scss">
  .pop{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    z-index: 10000000;
  }
  .agm__container {
    background: #ffffff;
    padding: 15px 20px;

    table {
      border-collapse: collapse;
      border-spacing: 0;
      th,
      td {
        padding: 10px;
        font-size: 12px;
        line-height: 20px;
        border: 1px solid #eee;
      }
    }

    .agm__section {
      font-size: 13px;
      color: #6A707D;
      line-height: 26px;
    }
  }
</style>
