<template>
  <div @click="onClick" class="extract-coin-card">
    <div class="currency">
      <span>{{option.currency_type}}</span>
      <span>-{{option.amount}}</span>
    </div>
    <div class="info">
      <span>
        {{option.audit_status === 'UNAUDITED' ? '待审核'
        : option.audit_status === 'REJECT' ? '已拒绝'
        : option.audit_status === 'SUCCEED' ? '提币成功'
        : option.audit_status === 'FAILED' ? '提币失败'
        : option.audit_status === 'PROCESSING' ? '处理中'
        :''}}
      </span>
      <span>{{option.create_date}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExtractCoinCard',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$router.push(`/extract-coin-record-detail/${this.option.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.extract-coin-card {
  height: 61px;
  box-sizing: border-box;
  padding: 12px 20px 10px;
  border-bottom: 1px solid #eeeeee;
  .currency,
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    color: #0f3256;
  }
  .info {
    font-size: 12px;
    margin-top: 5px;
    color: #a8aeb9;
  }
}
</style>
