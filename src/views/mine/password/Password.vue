<template>
  <div class="password__container">
    <BgainNavBar :onArrowClick="()=>{this.$router.push('/mine/safety')}"  title="密码设置"/>
    <div class="password__content">
      <cell-group :hasMargin="true">
        <cell title="修改登录密码" :to="{name: 'change-login-password'}">
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
        <cell v-if="authLevel === 1" title="设置交易密码" :to="{name: 'set-payment-password'}">
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
        <cell v-else title="重置交易密码" :to="{name: 'reset-payment-password'}">
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
      </cell-group>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainCellGroup from '../components/BgainCellGroup.vue';
import BgainCell from '../components/BgainCell.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('user');

export default {
  name: 'Password',
  components: {
    BgainNavBar,
    CellGroup: BgainCellGroup,
    Cell: BgainCell,
  },
  computed: {
    ...mapGetters(['authLevel']),
  },
  async mounted() {
    if (this.$route.query.status && this.$route.query.status === 'success') {
      Toast({
        message: '修改登录密码成功',
        duration: 1000,
      });
    }
    try {
      await this.getUserSummary();
    } catch (error) {
      Toast(error.message);
    }
  },
  methods: {
    ...mapActions(['getUserSummary']),
  },
};
</script>

<style lang="scss" scoped>
  .password__container {
    height: 100%;
    background: #f8f8f8;

    .password__content {
      padding-top: 10px;

      .icon-next {
        width: 9px;
        height: 11px;
        margin-left: 10px;
      }
    }
  }
</style>
