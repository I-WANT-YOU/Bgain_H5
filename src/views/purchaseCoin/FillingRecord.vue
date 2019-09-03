<template>
  <div class="fillingRecord">
    <BgainNavBar title="充币记录" />
    <div v-if="depositRecord.length" class="filling-history">
      <div
        class="history-item"
        v-for="(item,index) in depositRecord"
        :key="index"
        @click="toDetail(item.id)"
      >
        <div>
          <span>{{item.currency_type}}</span>
          <span>{{formatDate(item.create_date)}}</span>
        </div>
        <div>
          <span>+{{item.amount}}</span>
        </div>
      </div>
    </div>
    <div v-else class="no-record">
      <svg-icon icon-class="mine-fund-no-record" class="no-record-icon" />
      <div>暂无充币记录</div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { formatDate } from '@utils/tools';
import BgainNavBar from '../../components/BgainNavBar.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('coin/purchaseCoin');

export default {
  name: 'FillingRecord',
  components: {
    BgainNavBar,
  },
  computed: {
    ...mapGetters(['depositRecord']),
  },
  async mounted() {
    try {
      await this.getDepositRecord();
    } catch (error) {
      throw error;
    }
  },
  methods: {
    ...mapActions(['getDepositRecord']),
    // 进入详情页面
    toDetail(id) {
      this.$router.push({
        name: 'FillingDetail',
        params: { id },
      });
    },
    formatDate(time) {
      return formatDate(time);
    },
  },
};
</script>

<style lang="scss" scoped>
.fillingRecord {
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  .filling-history {
    .history-item {
      padding: 11px 20px 10px 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 0.51px solid #eeeeee;
      border-top: 0.51px solid #eeeeee;
      > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        > span:nth-child(1) {
          height: 21px;
          line-height: 21px;
          font-size: 15px;
          color: #0f3256;
        }
        > span:nth-child(2) {
          height: 17px;
          line-height: 17px;
          font-size: 12px;
          color: #a8aeb9;
        }
      }
      > div:nth-child(2) {
        display: flex;
        align-items: flex-start;
        > span {
          height: 21px;
          line-height: 21px;
          font-size: 15px;
          color: #0f3256;
        }
      }
    }
  }
  .no-record {
    text-align: center;
    font-size: 14px;
    color: #999999;
    .no-record-icon {
      width: 102px;
      height: 78px;
      margin: 104px 0 10px;
    }
  }
}
</style>
