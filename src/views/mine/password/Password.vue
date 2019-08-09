<template>
  <div class="password__container">
    <BgainNavBar title="密码设置"/>
    <div class="password__content">
      <cell-group :hasMargin="true">
        <cell title="修改登录密码" :to="{name: 'change-login-password'}">
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
        <cell title="设置交易密码" :to="{name: 'set-payment-password'}">
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
      </cell-group>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainCellGroup from '../components/BgainCellGroup.vue';
import BgainCell from '../components/BgainCell.vue';

export default {
  name: 'Password',
  components: {
    BgainNavBar,
    CellGroup: BgainCellGroup,
    Cell: BgainCell,
  },
};
</script>

<style lang="scss" scoped>
  .password__container {
    height: 100%;
    background: #f8f8f8;

    .password__content {
      padding-top: 13px;

      .icon-next {
        width: 9px;
        height: 11px;
        margin-left: 10px;
      }
    }
  }
</style>
