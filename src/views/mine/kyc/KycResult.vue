<template>
  <div class="kyc-result__container">
    <bgain-nav-bar :onArrowClick="goSafety" title="身份认证"></bgain-nav-bar>
    <kyc-result-card :status="status" :subtitle="subtitle" v-if="isShowResultCard"/>
    <!--已认证去授权-->
    <BgainBaseDialog
      v-model="isShowAuthorize"
      :showCancel="false"
      title="确认授权"
      submitText="一键授权"
      content="确认授权Bgain开通OTC服务"
      @submit="goToAuthorize"
      @cancel="()=>{this.isShowAuthorize = false}"
    />
    <!--授权成功提示-->
    <BgainBaseDialog
      :showCancel="false"
      submitText="知道了"
      content="您的身份认证申请已提交，审核结果将在1个工作日内公布"
      v-model="showSuccessTip"
      @submit="()=>{this.showSuccessTip = false}"
      @cancel="()=>{this.showSuccessTip = false}"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainBaseDialog from '@component/BgainBaseDialog.vue';
import KycResultCard from './components/KycResultCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('user');

const STATUS = {
  auditing: 'PENDING',
  failed: 'FAIL',
  rejected: 'REJECTED',
  certified: 'SUCCESS',
  unaudited: 'PENDING',
  passed: 'SUCCESS',
};

export default {
  name: 'KycResult',
  data() {
    return {
      countDownTime: 5,
      isShowAuthorize: false,
      showSuccessTip: false,
      isShowResultCard: false,
    };
  },
  components: {
    KycResultCard,
    BgainNavBar,
    BgainBaseDialog,
  },
  computed: {
    ...mapGetters(['submitKycStatus', 'submitKycMsg']),
    status() {
      return STATUS[this.submitKycStatus.toLocaleLowerCase()];
    },
    subtitle() {
      if (this.submitKycStatus.toLocaleLowerCase() !== 'failed'
        && this.submitKycStatus.toLocaleLowerCase() !== 'rejected') return '';
      return this.submitKycMsg;
    },
  },
  async mounted() {
    /* 获取身份验证类型 OTC KYC */
    if (this.$route.query.authenticationType === 'OTC') {
      this.getOTCResult();
    } else {
      this.getKycResult();
    }

    /* 监听浏览器回退操作 */
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.watchBack);
    }
  },
  methods: {
    ...mapActions(['getKycInfo', 'toGrantAuthorization', 'getOTCInfo']),
    /* 处理回退事件 */
    watchBack() {
      window.removeEventListener('popstate', this.watchBack);
      window.history.go(-1);
    },
    goSafety() {
      this.$router.push('/mine/safety');
    },
    goBack() {
      sessionStorage.clear();
      this.$router.replace('/mine/safety');
    },
    // 调用接口查询验证状态 kyc
    async getKycResult() {
      Toast.loading({
        message: '加载中...',
      });
      try {
        await this.getKycInfo();
        if (this.submitKycStatus === 'CERTIFIED' || this.submitKycStatus === 'PASSED') { // 审核通过 显示 一件授权弹窗
          Toast.clear();
          this.isShowResultCard = true;
          this.isShowAuthorize = true;
        } else {
          Toast.clear();
          this.isShowResultCard = true;
        }
      } catch (error) {
        Toast.clear();
        throw error;
      }
    },
    // 调用接口查询验证状态otc
    async getOTCResult() {
      Toast.loading({
        message: '加载中...',
      });
      try {
        await this.getOTCInfo();
        Toast.clear();
        this.isShowResultCard = true;
      } catch (error) {
        Toast.clear();
        throw error;
      }
    },
    /* 一键授权 */
    goToAuthorize() {
      this.toGrantAuthorization().then(
        () => {
          // 授权成功
          this.isShowAuthorize = false;
          this.showSuccessTip = true;
        },
        () => {
          Toast('授权失败');
        },
      );
    },
  },
  beforeDestroy() {
    clearInterval(this.timer); // 清除轮询
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false);
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.clear();
    next();
  },
};
</script>

<style lang="scss" scoped>
.kyc-result__container {
  height: 100%;
}
</style>
