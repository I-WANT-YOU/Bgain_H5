<template>
  <div class="asset">
    <BgainNavBar title="邀友返利"/>
    <div class="total-asset">
      <span class="num">{{asset}}</span>
      <span>USDT</span>
    </div>
    <div class="list">
      <div v-for="(item,key) in list" :key="key" class="item">
        <div>
          <svg-icon class="icon" :icon-class="`icon-${key.toLocaleLowerCase()}`" />
          <span>{{key.toLocaleUpperCase()}}</span>
        </div>
        <div class="num">{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('user');
export default {
  components: {
    BgainNavBar,
  },
  computed: {
    ...mapGetters(['everyTokens', 'bonusSummary']),
  },
  methods: {
    ...mapActions(['getReferInfo']),
  },
  data() {
    return {
      asset: 0,
      list: {},
    };
  },
  async mounted() {
    await this.getReferInfo();
    this.asset = this.bonusSummary;
    this.list = this.everyTokens;
  },
};
</script>
<style lang="scss" scoped>
.asset {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: #333333;
  background: #f8f8f8;
  height: 100%;
  .total-asset {
    padding: 18px 0 10px 20px;
    background: #ffffff;
    margin-bottom: 10px;
    .num {
      font-size: 30px;
      color: #3c64ee;
      margin-right: 10px;
    }
  }
  .list {
    background: #ffffff;
    .item {
      padding: 0 30px 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
      border-bottom: 1px solid #eeeeee;
      > div {
        display: flex;
        align-items: center;
        .icon {
          width: 25px;
          height: 25px;
          margin-right: 15px;
        }
      }
    }
    .item:last-child{
      border-bottom: 0;
    }
  }
}
</style>
