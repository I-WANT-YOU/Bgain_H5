<template>
  <div class="history-rates__container">
    <bgain-nav-bar title="历史年化利率"></bgain-nav-bar>
    <div class="history-rates__wrapper">
      <pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="history-rate__content">
        </div>
      </pull-refresh>
    </div>
  </div>
</template>

<script>
import { PullRefresh, Toast } from 'vant';
import ProgressCard from './components/ProgressCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

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
    };
  },
  methods: {
    async onRefresh() {
      try {
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
  .history-rates__container {
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .history-rates__wrapper {
      height: 100%;
      display: flex;
      flex: 1 1 auto;

      .history-rate__content{
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
