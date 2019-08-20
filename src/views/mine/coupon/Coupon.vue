<template>
  <div>
    <BgainNavBar title="优惠券" />
    <tabs
      color="#3c64ee"
      title-active-color="#3c64ee"
      title-inactive-color="#0f3256"
      v-model="active"
      line-width="90px"
      :border="true"
      line-height="2px"
      @change="onChangeTab"
    >
      <tab v-for="item in option" :key="item.name" :title="item.title" :name="item.name">
        <div class="tab-wrap">
          <CouponCard
            v-for="(item,key) in list"
            :statu="active"
            :key="key"
            :option="item"
            :ifUse="use"
          />
          <div v-show="!list.length" class="no-coupon">
            <svg-icon icon-class="coupon" class="icon" />
            <div>暂无相关优惠劵</div>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';
import CouponCard from '../components/couponCard.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('user');
export default {
  name: 'Coupon',
  components: {
    BgainNavBar,
    Tabs,
    Tab,
    CouponCard,
  },
  data() {
    return {
      active: '0',
      option: [
        { title: '待使用', name: '0' },
        { title: '已使用', name: '1' },
        { title: '已过期', name: '2' },
      ],
      list: [],
      use: true,
    };
  },
  methods: {
    ...mapActions(['getUserCouponList']),
    onChangeTab(name) {
      this.list = [];
      if (name === '0') {
        this.use = true;
        this.list = this.newCoupons;
      } else if (name === '1') {
        this.use = false;
        this.list = this.usedCoupons;
      } else if (name === '2') {
        this.use = false;
        this.list = this.expiredCoupons;
      }
    },
  },
  computed: {
    ...mapGetters(['newCoupons', 'usedCoupons', 'expiredCoupons']),
  },
  async mounted() {
    try {
      await this.getUserCouponList();
      this.list = this.newCoupons;
    } catch (error) {
      Toast(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.tab-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  .no-coupon {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 104px;
    font-size: 14px;
    color: #999999;
    .icon {
      width: 109px;
      height: 94px;
      margin-bottom: 12px;
    }
  }
}
</style>
