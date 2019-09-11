<template>
  <div class="history-rates__container">
    <bgain-nav-bar :onArrowClick="onArrowClick" title="历史年化利率"></bgain-nav-bar>
    <div class="history-rates__wrapper">
      <pull-refresh v-model="isLoading" @refresh="onRefresh(currency)">
        <div class="history-rate__content">
          <progress-card
            v-for="(history, index) in historyProfitRates"
            :key="history.date"
            :percentage="Number(history.amount) / historyProfitRateMax * 100"
            :left-text="index === 0 ? '今日利率' : history.date"
            :right-text="`${history.amount}%`">
          </progress-card>
        </div>
      </pull-refresh>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { PullRefresh, Toast } from 'vant';
import ProgressCard from './components/ProgressCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('product/current');

export default {
  name: 'HistoryRates',
  components: {
    PullRefresh,
    BgainNavBar,
    ProgressCard,
  },
  data() {
    return {
      isLoading: false,
      currency: '',
    };
  },
  computed: {
    ...mapGetters(['historyProfitRateMax', 'historyProfitRates']),
  },
  mounted() {
    this.currency = this.$route.params.currency;
    this.onRefresh(this.currency);
  },
  methods: {
    ...mapActions(['getHistoryInterestRate']),
    async onRefresh(currency) {
      try {
        await this.getHistoryInterestRate(currency);
        this.isLoading = false;
      } catch (error) {
        Toast(error.message);
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
  .history-rates__container {
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .history-rates__wrapper {
      height: 100%;
      display: flex;
      flex: 1 1 auto;

      .history-rate__content {
        padding: 10px 20px 0;
      }

      .van-pull-refresh {
        flex: 1;

        .van-pull-refresh__track {
          height: 100%;
        }
      }
    }
  }
</style>
