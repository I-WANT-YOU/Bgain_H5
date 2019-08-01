<template>
  <div class="bgain-empty__container">
    <img
      src="../assets/images/empty.png"
      alt="暂无数据"
      class="bgain-empty__image"
    >
    <div class="bgain-empty__title">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BgainEmpty',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .bgain-empty__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;

    .bgain-empty__image {
      width: 130px;
      height: 98px;
    }

    .bgain-empty__title {
      margin-top: 20px;
      font-size: 14px;
      color: #A8AEB9;
      line-height: 20px;
    }
  }
</style>
