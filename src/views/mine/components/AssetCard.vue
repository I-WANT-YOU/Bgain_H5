<template>
  <div class="asset-card">
    <div class="num">
      <span>{{option.transaction_type}}</span>
      <span>{{option.amount}}</span>
    </div>
    <div class="time">
      <span>{{option.create_at}}</span>
      <span>{{option.currency_type}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AssetCard',
  props: {
    option: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.asset-card {
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  .num,
  .time {
    padding: 0 20px 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .num {
    font-size: 14px;
    color: #0f3256;
    margin-bottom: 5px;
    font-weight: 600;
  }
  .time {
    font-size: 12px;
    color: #a8aeb9;
  }
  &::after {
    content: " ";
    border-bottom: 1px solid #eeeeee;
    margin-top: 10px;
    transform: scaleY(0.5);
  }
}
</style>
