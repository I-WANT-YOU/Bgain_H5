<template>
  <div class="testing__container">
    <bgain-nav-bar title="测试页面" :showArrow="false"></bgain-nav-bar>
    <grid :gutter="10">
      <grid-item
        @click="onLogout"
        icon="replay"
        text="登出"
        style="margin-bottom: 10px"
      />
    </grid>
    <grid :gutter="10">
      <grid-item
        v-for="option in options"
        :key="option.to"
        :icon="option.icon"
        :text="option.text"
        :to="option.to"
      />
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem, Toast } from 'vant';
import { mapActions } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';


export default {
  name: 'Testing',
  components: {
    BgainNavBar,
    Grid,
    GridItem,
  },
  data() {
    return {
      options: [
        {
          icon: 'like-o',
          text: '登陆页',
          to: '/login',
        },
        {
          icon: 'phone-o',
          text: '注册页',
          to: '/register',
        },
        {
          icon: 'friends-o',
          text: '国籍选择页',
          to: '/country',
        },
        {
          icon: 'manager-o',
          text: '找回登陆密码',
          to: '/forgetpassword',
        },
        {
          icon: 'bill-o',
          text: '活期产品页',
          to: '/product/current',
        },
        {
          icon: 'shop-o',
          text: '定期产品页',
          to: '/product/fixed',
        },
        {
          icon: 'chart-trending-o',
          text: '基金产品页',
          to: '/product/fund',
        },
        {
          icon: 'user-o',
          text: '我的',
          to: '/mine',
        },
        {
          icon: 'comment-o',
          text: 'KYC',
          to: '/mine/safety/kyc',
        },
        {
          icon: 'label-o',
          text: '密码设置',
          to: '/mine/safety/password',
        },
        {
          icon: 'info-o',
          text: '安全中心',
          to: '/mine/safety',
        },
        {
          icon: 'free-postage',
          text: '活动中心',
          to: '/activity',
        },
      ],
    };
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async onLogout() {
      try {
        Toast.loading({
          message: '登出中...',
        });
        await this.logout();
        Toast('登出成功');
      } catch (error) {
        Toast(error.message);
        Toast.clear();
      }
    },
  },
};
</script>

<style scoped>

</style>
