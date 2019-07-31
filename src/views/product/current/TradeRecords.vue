<template>
  <div class="trade-records__container">
    <bgain-nav-bar title="活期交易记录"></bgain-nav-bar>
    <div class="trade-records__content">
      <pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="trade__records">
          <trade-records-card
            v-for="record in tradeRecords"
            :key="record.id"
            :data-source="record">
          </trade-records-card>
        </div>
      </pull-refresh>
    </div>
  </div>
</template>

<script>
import { PullRefresh, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';
import TradeRecordsCard from './components/TradeRecordsCard.vue';

const { mapState, mapActions } = createNamespacedHelpers('product/current');

export default {
  name: 'TradeRecords',
  components: {
    PullRefresh,
    BgainNavBar,
    TradeRecordsCard,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(['tradeRecords']),
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    ...mapActions(['getCurrentTradeRecords']),
    async onRefresh() {
      try {
        await this.getCurrentTradeRecords();
        this.isLoading = false;
      } catch (error) {
        Toast(error.message);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
  .trade-records__container {
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .trade-records__content {
      padding-top: 9px;
      height: 100%;
      display: flex;
      flex: 1 1 auto;

      .van-pull-refresh {
        flex: 1;
      }

      .van-pull-refresh__track {
        height: 100%;
      }
    }
  }
</style>
