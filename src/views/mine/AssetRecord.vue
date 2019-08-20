<template>
  <div class="asset-record">
    <BgainNavBar title="资金记录" :border="true" />
    <AssetCard v-for="(item,key) in options" :key="key" :option="item" />
    <div v-if="!options.length" class="no-record">
      <div>
        <svg-icon icon-class="mine-fund-no-record" class="icon" />
        <div>暂无资金记录</div>
        <BgainButton type="info" @click="onClick" class="button">立即充币</BgainButton>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainButton from '@component/BgainButton.vue';
import { formatDate } from '@utils/tools';
import AssetCard from './components/AssetCard.vue';
import { formatAmount, formatTransactionType } from './format';

const { mapActions, mapGetters } = createNamespacedHelpers('user');

export default {
  name: 'AssetRecord',
  components: {
    BgainNavBar,
    BgainButton,
    AssetCard,
  },
  methods: {
    ...mapActions(['getAssetRecord']),
    onClick() {
      this.$router.push('/purchaseCoinHome/');
    },
  },
  data() {
    return {
      options: [],
    };
  },
  computed: {
    ...mapGetters(['assetRecords']),
  },
  async mounted() {
    try {
      await this.getAssetRecord();
      this.options = this.assetRecords
        .map(item => formatTransactionType(formatAmount(item)))
        .map((item) => {
          item.create_at = formatDate(item.create_at);
          return item;
        });
    } catch (error) {
      Toast(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.asset-record {
  .no-record {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    font-size: 14px;
    color: #a8aeb9;
    text-align: center;
    .icon {
      width: 102px;
      height: 78px;
      margin: 140px 0 10px;
    }
    .button{
      width: 160px;
      height: 46px;
      margin-top: 72px;
    }
  }
}
</style>
