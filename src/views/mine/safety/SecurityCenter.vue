<template>
  <div class="security__container">
    <bgain-nav-bar :onArrowClick="()=>{this.$router.push('/mine')}" title="安全中心"></bgain-nav-bar>
    <div class="security__content">
      <cell-group :hasMargin="true">
        <cell title="平台账号">
          <div class="filed--username">{{account}}</div>
        </cell>
        <cell title="密码设置" to="/mine/safety/password">
          <span class="filed--password">交易密码、登录密码</span>
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
        <cell title="收货地址" :to="{name: 'receiving-address'}">
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
      </cell-group>
      <cell-group :hasMargin="true">
        <cell title="身份认证">
          <div @click="onKyc">
            <span class="field--kyc">{{kycText}}</span>
            <svg-icon
              icon-class="next"
              :class="['icon-next', kycText === '审核中' ? 'none' : '']"
            ></svg-icon>
          </div>
        </cell>
         <cell title="OTC认证">
          <span class="field--kyc" @click="onOtc">{{otcText}}</span>
          <svg-icon
            icon-class="next"
            :class="['icon-next', otcStatus === 'FAILED' ? '' : 'none']"
            @click="onOtc"
          ></svg-icon>
        </cell>
      </cell-group>
      <div class="logout-button" @click="onLogoutClick">
        <span>安全退出</span>
      </div>
      <bgain-base-dialog
        v-model="visible"
        content="是否确认退出登录"
        @submit="onLogout"
        @cancel="onCancel"
      />
      <bgain-base-dialog
        v-model="otc"
        content="您的身份消息认证失败请重新认证"
        submitText="重新认证"
        @submit="onOtcSubmit"
        :showCancel="false"
        :showClose="false"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import { checkEmailFormat, getDesensitizedUsername } from '@utils/tools';
import BgainBaseDialog from '@/components/BgainBaseDialog.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainCellGroup from '../components/BgainCellGroup.vue';
import BgainCell from '../components/BgainCell.vue';

const { mapActions: mapAuthActions } = createNamespacedHelpers('auth');
const {
  mapState: mapUserState,
  mapActions: mapUserActions,
  mapGetters: mapUserGetters,
} = createNamespacedHelpers('user');

const STATUS = {
  FAILED: '认证失败',
  UN_CERTIFIED: '未认证',
  AUDITING: '审核中',
  CERTIFY_FAILED: '认证失败',
  CERTIFIED: '已认证',
};

export default {
  name: 'SecurityCenter',
  components: {
    BgainBaseDialog,
    BgainNavBar,
    CellGroup: BgainCellGroup,
    Cell: BgainCell,
  },
  data() {
    return {
      visible: false,
      otc: false,
      otcStatu: '',
    };
  },
  computed: {
    ...mapUserState(['basicInfo', 'kycInfo']),
    ...mapUserGetters(['username', 'countryCode', 'kycStatus', 'otcStatus']),
    account() {
      if (checkEmailFormat(this.username)) {
        return getDesensitizedUsername(this.username);
      }
      return `${this.countryCode} ${getDesensitizedUsername(this.username)}`;
    },
    kycText() {
      return STATUS[this.kycStatus.toLocaleUpperCase()];
    },
    otcText() {
      return STATUS[this.otcStatus];
    },
  },
  async mounted() {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
    try {
      Toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.getUserSummary();
      this.otcStatu = this.otcStatus;
      Toast.clear();
    } catch (error) {
      Toast(error.message);
      Toast.clear();
    }
  },
  methods: {
    ...mapAuthActions(['logout']),
    ...mapUserActions(['getUserSummary']),
    async onLogout() {
      try {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '退出登录中...',
        });
        await this.logout();
        Toast.clear();
      } catch (error) {
        Toast(error.message);
        Toast.clear();
      }
    },
    onLogoutClick() {
      this.visible = true;
    },
    onCancel() {
      this.visible = false;
    },
    goBack() {
      const downApp = sessionStorage.getItem('downApp');
      sessionStorage.clear();
      if (downApp) {
        sessionStorage.setItem('downApp', true);
      }
      window.history.go(-1);
    },
    onKyc() {
      if (this.basicInfo.kyc_stauts.toLocaleUpperCase() === 'CERTIFIED') {
        this.$router.push('/mine/safety/kyc/fields');
      } else if (this.basicInfo.kyc_stauts.toLocaleUpperCase() === 'UN_CERTIFIED') {
        this.$router.push('/mine/safety/kyc');
      } else if (this.basicInfo.kyc_stauts.toLocaleUpperCase() === 'CERTIFY_FAILED') {
        this.$router.push('/mine/safety/kyc');
      } else if (this.basicInfo.kyc_stauts.toLocaleUpperCase() === 'FAILED') {
        this.$router.push('/mine/safety/kyc-result');
      }
    },
    onOtc() {
      if (this.basicInfo.otc_kyc_status.toLocaleUpperCase() === 'FAILED') {
        this.otc = true;
      }
    },
    onOtcSubmit() {
      this.$router.push({ name: 'kyc', query: { type: 'OTC' } });
    },
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false);
  },
  beforeRouteLeave(to, from, next) {
    const downApp = sessionStorage.getItem('downApp');
    sessionStorage.clear();
    if (downApp) {
      sessionStorage.setItem('downApp', true);
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.security__container {
  height: 100%;
  background: #f8f8f8;

  .security__content {
    padding-top: 10px;

    .filed--username {
      font-size: 14px;
      color: #0f3256;
    }

    .filed--password {
      font-size: 12px;
      color: #999999;
    }

    .field--kyc {
      font-size: 12px;
      color: #0f3256;
    }

    .icon-next {
      width: 9px;
      height: 11px;
      margin-left: 10px;

      &.none {
        opacity: 0;
      }
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
        color: #3c64ee;
      }
    }
  }
}
</style>
