<template>
  <div class="trade-records__container">
    <bgain-nav-bar :onArrowClick="onArrowClick" title="活期交易记录"></bgain-nav-bar>
    <div class="trade-records__content">
      <pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="trade__records" v-if="tradeRecords.length !== 0">
          <trade-records-card
            v-for="record in tradeRecords"
            :key="record.id"
            :data-source="record">
          </trade-records-card>
        </div>
        <bgain-empty v-else title="暂无交易记录"></bgain-empty>
      </pull-refresh>
    </div>
  </div>
</template>

<script>
import { PullRefresh } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainEmpty from '@/components/BgainEmpty.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';
import TradeRecordsCard from './components/TradeRecordsCard.vue';

const { mapState, mapActions } = createNamespacedHelpers('product/current');

export default {
  name: 'TradeRecords',
  components: {
    BgainEmpty,
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
    this.currency = this.$route.params.currency;
    this.onRefresh();
  },
  methods: {
    ...mapActions(['getCurrentTradeRecords']),
    async onRefresh() {
      try {
        await this.getCurrentTradeRecords();
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
    onArrowClick() {
      this.$router.push({
        name: 'current',
        query: {
          currency: this.currency,
        },
      });
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
