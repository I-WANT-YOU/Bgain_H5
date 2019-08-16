<template>
  <div class="balance-detail__container">
    <nav-bar :title="currency"></nav-bar>
    <div
      class="balance__noticebar"
      v-if="currency === 'BGP'">
      BGP是Bgain平台激励用户投资行为的奖励
    </div>
    <balance-card :currency="currency" :balance="balance"/>
    <balance-records :data-source="records" :currency="currency"/>
  </div>
</template>

<script>
import { get } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BalanceCard from './components/BalanceCard.vue';
import BalanceRecords from './components/BalanceRecords.vue';

const { mapActions: mapUserActions, mapState: mapUserState } = createNamespacedHelpers('user');

export default {
  name: 'BalanceDetail',
  components: {
    BalanceRecords,
    BalanceCard,
    NavBar: BgainNavBar,
  },
  computed: {
    ...mapUserState(['transfers']),
    currency() {
      return this.$route.params.currency;
    },
    balance() {
      return get(this.transfers, 'balance', 0);
    },
    records() {
      return get(this.transfers, 'operation_logs', []);
    },
  },
  async mounted() {
    const { currency } = this.$route.params;
    try {
      await this.getTransferDetails(currency);
    } catch (error) {
      Toast(error.message);
    }
  },
  methods: {
    ...mapUserActions(['getTransferDetails']),
  },
};
</script>

<style lang="scss" scoped>
  .balance-detail__container {
    height: 100%;
    background: #f8f8f8;
    display: flex;
    flex-direction: column;

    .balance__noticebar {
      background: #FAF4DC;
      padding: 5px 20px;
      font-size: 12px;
      color: #6A707D;
      line-height: 21px;
    }
  }
</style>
