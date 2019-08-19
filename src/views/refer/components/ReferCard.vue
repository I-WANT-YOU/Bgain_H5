<template>
  <div class="refer-card">
    <div v-if="tab === '1'" class="con">
      <span>+86 {{option.username}}</span>
      <span class="time">注册时间 {{formatDate(option.invite_time)}}</span>
    </div>
    <div v-if="tab === '2'" class="con1">
      <div class="top">
        <span>{{typeText}}</span>
        <span>{{option.amount}}</span>
      </div>
      <div class="time">
        <span>{{formatDate(option.createAt)}}</span>
        <span>{{option.currencyType}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@utils/tools';

export default {
  name: 'Refer',
  props: {
    tab: {
      type: String,
      default: '2',
      required: false,
    },
    option: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(num) {
      return formatDate(num);
    },
  },
  computed: {
    typeText() {
      if (this.option.transactionType === 'INVITATION') {
        return '注册奖励';
      }
      if (this.option.transactionType === 'COMMISSION') {
        return '佣金奖励';
      }
      return '注册奖励';
    },
  },
};
</script>

<style lang="scss" scoped>
.refer-card {
  padding: 20px 20px 20px 15px;
  border-bottom: 1px solid #dddddd;
  .con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333333;
    .time {
      font-size: 12px;
      color: #999999;
    }
  }
  .con1 {
    > div {
      display: flex;
      justify-content: space-between;
    }
    font-size: 14px;
    color: #333333;
    .time {
      font-size: 12px;
      color: #999999;
      margin-top: 8px;
    }
  }
}
</style>
