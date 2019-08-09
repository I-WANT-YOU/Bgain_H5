<template>
  <div class="security__container">
    <bgain-nav-bar title="安全中心"></bgain-nav-bar>
    <div class="security__content">
      <cell-group :hasMargin="true">
        <cell title="平台账号">
          <div class="filed--username">+86 130******721</div>
        </cell>
        <cell title="密码设置">
          <span class="filed--password">交易密码、登录密码</span>
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
        <cell title="收货地址">
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
      </cell-group>
      <cell-group :hasMargin="true">
        <cell title="身份认证">
          <span class="field--kyc">认证失败</span>
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
        <cell title="OTC认证">
          <span class="field--kyc">认证失败</span>
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
      </cell-group>
      <div class="logout-button">
        <span>安全退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainCellGroup from '../components/BgainCellGroup.vue';
import BgainCell from '../components/BgainCell.vue';

export default {
  name: 'SecurityCenter',
  components: {
    BgainNavBar,
    CellGroup: BgainCellGroup,
    Cell: BgainCell,
  },
};
</script>

<style lang="scss" scoped>
  .security__container {
    height: 100%;
    background: #F8F8F8;

    .security__content {
      padding-top: 10px;

      .filed--username {
        font-size: 14px;
        color: #0F3256;
      }

      .filed--password {
        font-size: 12px;
        color: #999999;
      }

      .field--kyc {
        font-size: 12px;
        color: #0F3256;
      }

      .icon-next {
        width: 9px;
        height: 11px;
        margin-left: 10px;
      }

      .logout-button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        padding: 14px 0;
        line-height: 22px;
        width: 100%;

        span {
          font-size: 16px;
          color: #3C64EE;
        }
      }
    }
  }
</style>
