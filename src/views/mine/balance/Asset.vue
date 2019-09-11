<template>
  <div class="balance__container">
    <bgain-nav-bar title="总资产" :on-arrow-click="onArrowClick" />
    <div class="info">总资产 = 可用余额 + 在投资产（包括活期、定期、基金产品） + 待收收益</div>
    <div class="balance__content">
      <cell-group>
        <cell
          v-for="balance in singleCurrencys"
          :title="balance.currency"
          :center="true"
          :key="balance.currency"
        >
          <template v-slot:title>
            <svg-icon :icon-class="`icon-${balance.currency.toLowerCase()}`"
                      class="currency-icon" />
            <span class="currency-label">{{balance.currency}}</span>
          </template>
          <template v-slot:value>
            <span class="currency-value">{{balance.total_asset}}</span>
          </template>
        </cell>
      </cell-group>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@/components/BgainNavBar.vue';
import CellGroup from './components/CellGroup.vue';
import Cell from './components/Cell.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('user');

export default {
  name: 'Asset',
  components: {
    BgainNavBar,
    CellGroup,
    Cell,
  },
  computed: {
    ...mapGetters(['singleCurrencys']),
  },
  async mounted() {
    try {
      Toast.loading({
        duration: 0,
      });
      await this.getUserBalanceSummary();
      Toast.clear();
    } catch (error) {
      Toast(error.message);
      Toast.clear();
    }
  },
  methods: {
    ...mapActions(['getUserBalanceSummary']),
    onArrowClick() {
      this.$router.push({
        name: 'Mine',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.balance__container {
  height: 100%;
  background: #f8f8f8;

  .info {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #faf4dc;
    font-size: 12px;
    color: #6a707d;
  }

  .balance__content {
    padding-top: 10px;

    .icon-next {
      width: 9px;
      height: 11px;
      margin-left: 15px;
    }

    .currency-icon {
      width: 25px;
      height: 25px;
      margin-right: 18px;
    }

    .currency-label {
      font-size: 14px;
      color: #0f3256;
    }

    .currency-value {
      font-size: 14px;
      color: #0f3256;
    }
  }
}
</style>
