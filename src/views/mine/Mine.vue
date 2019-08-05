<template>
  <div class="mine">
    <Header class="mine-header" />
    <div class="mine-content">
      <div class="userInfo">
        <div class="income">
          <div class="currency">
            <span>总资产</span>
            <span>BTC</span>
          </div>
          <div class="assets">
            <span>1088.00000000</span>
            <span class="icon">
              <svg-icon icon-class="next" class="icon-next" />
            </span>
          </div>
          <div class="incomes">
            <div>
              <div>累计收益</div>
              <div class="num">0.00</div>
            </div>
            <div>
              <div>待收收益</div>
              <div class="num">0.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseFooter />
  </div>
</template>

<script>
import Header from '@component/mine/Header.vue';
import BaseFooter from '@component/BaseFooter.vue';
import { mapState } from 'vuex';

export default {
  name: 'Mine',
  components: {
    Header,
    BaseFooter,
  },
  data() {
    return {
      login: '',
      income: '--',
      balance: '--',
    };
  },
  mounted() {
    if (this.authenticated) {
      console.log('登录');
    } else {
      console.log('未登录');
    }
  },
  computed: {
    ...mapState('auth', ['authenticated']),
  },
};
</script>

<style lang='scss' scoped>
.mine {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .mine-header {
    z-index: 10;
  }
  .mine-content {
    display: flex;
    flex: 1 1 auto;
    .userInfo {
      margin-top: -48px;
      padding-top: 48px;
      box-sizing: border-box;
      width: 100%;
      height: 287px;
      background: url("../../assets/images/mine/mine-background.png");
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .income {
        width: 347px;
        height: 150px;
        margin-top: 9px;
        background: #5f83ff;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 10px 13px;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        color: #c9d5ff;
        .currency {
          margin-bottom: 9px;
        }
        .assets {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28px;
          padding: 6px 0;
          color: #ffffff;
          margin-bottom: 12px;
          .icon {
            display: flex;
            align-content: center;
            .icon-next {
              width: 6px;
              height: 10px;
            }
          }
        }
        .incomes {
          display: flex;
          .num {
            width: 165px;
            font-size: 15px;
            color: #ffffff;
            margin-top: 4px;
          }
        }
      }
    }
  }
}
</style>
