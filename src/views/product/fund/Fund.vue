<template>
  <div class="fund">
    <Sticky>
      <Screen
        :options="options"
        @onReset="onReset"
        @changeItem="changeItem"
        @onChange="onChange"
        @close="close"
      />
    </Sticky>
    <div class="fund-products-list">
      <pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="加载成功">
        <div class="content">
          <Initial
            class="fund-products-list-item"
            v-for="initial in showInitialFunds"
            :options="initial"
            :key="initial.id"
          />
          <NoInitial
            class="fund-products-list-item"
            v-for="noInitial in showotherFunds"
            :options="noInitial"
            :key="noInitial.id"
          />
        </div>
      </pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Sticky, PullRefresh } from 'vant';
import formatFundData, { fundProductTypeList, riskLevelTypeList } from '@utils/formatFundData';
import Screen from './components/Screen.vue';
import Initial from './components/Initial.vue';
import NoInitial from './components/NoInitial.vue';

const options = [
  {
    type: 'currency',
    active: 'all',
    text: '币种',
    value: 0,
    children: ['BTC', 'USDT', 'ETH', 'EOS'],
  },
  {
    type: 'type',
    active: 'all',
    text: '策略类型',
    value: 1,
    children: ['指数更强', 'CTA', '套利', '高频', '混合'],
  },
  {
    type: 'risk',
    active: 'all',
    text: '风险值',
    value: 2,
    children: ['R1', 'R2', 'R3', 'R4', 'R5'],
  },
];

export default {
  name: 'Fund',
  components: {
    Sticky,
    Screen,
    PullRefresh,
    Initial,
    NoInitial,
  },
  data() {
    return {
      isLoading: false,
      options,
      params: {},
    };
  },
  methods: {
    ...mapActions({
      getFundProducts: 'product/fund/getFundProducts',
    }),
    onReset() {
      this.options = this.options.map((item) => {
        item.active = 'all';
        return item;
      });
      this.getFundProducts(this.params);
    },
    changeItem(type, text) {
      this.options = this.options.map((item) => {
        if (item.type === type) {
          item.active = text;
        }
        return item;
      });
    },
    onChange() {
      this.options.forEach((item) => {
        this.params[item.type] = item.active;
        if (this.params[item.type] === 'all') {
          delete this.params[item.type];
        }
        if (item.type === 'type') {
          fundProductTypeList.forEach((ite) => {
            if (ite.value === item.active) {
              this.params[item.type] = ite.type;
            }
          });
        }
        if (item.type === 'risk') {
          riskLevelTypeList.forEach((ite) => {
            if (ite.value === item.active) {
              this.params[item.type] = ite.type;
            }
          });
        }
      });
      this.params = { ...this.params };
      this.getFundProducts(this.params);
    },
    close(option) {
      this.options = option;
    },
    onRefresh() {
      this.isLoading = false;
      this.getFundProducts(this.params);
    },
  },
  computed: {
    ...mapGetters({
      initialFunds: 'product/fund/initialFunds',
      otherFunds: 'product/fund/otherFunds',
    }),
    showInitialFunds() {
      return this.initialFunds.map(
        item => formatFundData(item),
      );
    },
    showotherFunds() {
      return this.otherFunds.map(
        item => formatFundData(item),
      );
    },
  },
  mounted() {
    this.getFundProducts(this.params);
  },
};
</script>

<style lang='scss'>
.fund {
  flex: 1;
  display: flex;
  flex-direction: column;
  .fund-products-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    .van-pull-refresh,
    .van-pull-refresh__track {
      height: 100%;
      width: 100%;
    }
    .content {
      height: calc(100% - 48px);
      width: 100%;
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .fund-products-list-item {
      width: 335px;
      background: #ffffff;
      box-shadow: 0 1px 10px 2px rgba(211, 211, 211, 0.31);
      border-radius: 6px;
      margin-bottom: 16px;
    }
  }
}
</style>
