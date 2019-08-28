<template>
  <div class="extract-coin-record">
    <BgainNavBar title="提币记录" />
    <div class="extract-coin-record-con">
      <ExtractCoinCard v-for="(item,key) in list" :key="key" :option="item" />
      <div v-if="!list.length" class="no-wrap">
        <svg-icon icon-class="mine-fund-no-record" class="icon" />
        <div class="no">暂无提币记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import ExtractCoinCard from './components/ExtractCoinCard.vue';

export default {
  name: 'ExtractCoinRecord',
  components: {
    BgainNavBar,
    ExtractCoinCard,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    ...mapActions('coin/wallet', ['getWalletRecord']),
  },
  computed: {
    ...mapGetters('coin/wallet', ['walletRecordList']),
  },
  async mounted() {
    window.scrollTo(0, 0);
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      await this.getWalletRecord();
      this.list = this.walletRecordList;
      Toast.clear();
    } catch (error) {
      Toast.clear();
      Toast(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.extract-coin-record {
  .extract-coin-record-con {
    .no-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 83px;
      .icon {
        width: 130px;
        height: 98px;
      }
      .no {
        font-size: 14px;
        color: #a8aeb9;
        margin-top: 21px;
      }
    }
  }
}
</style>
