<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'Agreement',
};
</script>

<style lang="scss">
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
