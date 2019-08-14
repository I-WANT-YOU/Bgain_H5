<template>
  <div class="balance__container">
    <bgain-nav-bar title="可用余额"/>
    <div class="balance__content">
      <cell-group>
        <cell
          v-for="balance in balances"
          :title="balance.currency"
          :center="true"
          :key="balance.currency">
          <template v-slot:title>
            <svg-icon :icon-class="`icon-${balance.currency.toLowerCase()}`"
                      class="currency-icon"/>
            <span class="currency-label">{{balance.currency}}</span>
          </template>
          <template v-slot:value>
            <span class="currency-value">{{balance.balance}}</span>
            <svg-icon icon-class="next" class="icon-next"></svg-icon>
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
  name: 'Balance',
  components: {
    BgainNavBar,
    CellGroup,
    Cell,
  },
  computed: {
    ...mapGetters(['balances']),
  },
  async mounted() {
    try {
      await this.getUserBalanceSummary();
    } catch (error) {
      Toast(error.message);
    }
  },
  methods: {
    ...mapActions(['getUserBalanceSummary']),
  },
};
</script>

<style lang="scss" scoped>
  .balance__container {
    height: 100%;
    background: #F8F8F8;

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
        color: #0F3256;
      }

      .currency-value {
        font-size: 14px;
        color: #0F3256;
      }
    }
  }
</style>
