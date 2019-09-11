<template>
  <div class="history-profit__container">
    <bgain-nav-bar :onArrowClick="onArrowClick" :title="`历史收益(${currency})`"></bgain-nav-bar>
    <div class="history-profit__wrapper">
      <pull-refresh v-model="isLoading" @refresh="onRefresh(currency)">
        <div class="history-rate__content" v-if="historyProfits.length !== 0">
          <progress-card
            v-for="(history, index) in historyProfits"
            :key="history.date"
            :percentage="Number(history.amount) / historyProfitMax * 100"
            :left-text="index === 0 ? '昨日收益' : history.date"
            :right-text="`${history.amount}`"
          ></progress-card>
        </div>
        <bgain-empty v-else title="暂无历史收益记录"></bgain-empty>
      </pull-refresh>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { PullRefresh } from 'vant';
import BgainEmpty from '@/components/BgainEmpty.vue';
import ProgressCard from './components/ProgressCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('product/current');

export default {
  name: 'HistoryProfit',
  components: {
    PullRefresh,
    BgainEmpty,
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
    ...mapGetters(['historyProfitMax', 'historyProfits']),
  },
  mounted() {
    this.currency = this.$route.params.currency;
    this.onRefresh(this.currency);
  },
  methods: {
    ...mapActions(['getHistoryProfit']),
    async onRefresh(currency) {
      try {
        await this.getHistoryProfit(currency);
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
.history-profit__container {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .history-profit__wrapper {
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
