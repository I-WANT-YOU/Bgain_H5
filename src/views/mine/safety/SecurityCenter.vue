<template>
  <div class="security__container">
    <bgain-nav-bar title="安全中心"></bgain-nav-bar>
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
          <span class="field--kyc">{{kycText}}</span>
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
        </cell>
        <cell title="OTC认证">
          <span class="field--kyc">{{otcText}}</span>
          <svg-icon icon-class="next" class="icon-next"></svg-icon>
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
      ></bgain-base-dialog>
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
    };
  },
  computed: {
    ...mapUserState(['basicInfo']),
    ...mapUserGetters(['username', 'countryCode', 'kycStatus', 'otcStatus']),
    account() {
      if (checkEmailFormat(this.username)) {
        return getDesensitizedUsername(this.username);
      }
      return `${this.countryCode} ${getDesensitizedUsername(this.username)}`;
    },
    kycText() {
      return STATUS[this.kycStatus];
    },
    otcText() {
      return STATUS[this.otcStatus];
    },
  },
  async mounted() {
    try {
      Toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.getUserSummary();
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
