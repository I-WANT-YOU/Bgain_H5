<template>
  <div class="kyc__fields">
    <cell-group :border="false">
      <kyc-field>
        <template v-slot:input>
          <div class="kyc__field--slogan">验证码已发送至 {{countryCode}} {{desensitizedUsername}}</div>
        </template>
      </kyc-field>
      <kyc-field
        v-model="token"
        @input="onInput"
        label="验证码"
        placeholder="请输入验证码"
      >
        <template v-slot:button>
          <SendCode :autosend="true" @remainingTime="onTime" senddingTextColor="#3C64EE" :remainingTimeText="remainingTimeText" @onsend="onSendToken"/>
        </template>
      </kyc-field>
    </cell-group>
    <div class="kyc__button-wrap">
      <bgain-button
        type="info"
        :fluid="true"
        @click="onSubmitClick"
        :disabled="disabled"
      >
        提交
      </bgain-button>
      <bgain-button
        type="info"
        :fluid="true"
        @click="onPrevClick"
        :style="{marginTop: '30px'}"
      >
        上一步
      </bgain-button>
    </div>
  </div>
</template>

<script>
import { CellGroup, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import { getDesensitizedUsername } from '@utils/tools';
import KycField from './KycField.vue';
import SendCode from '@/components/SendCode.vue';
import BgainButton from '@/components/BgainButton.vue';
import responseStatus from '@/constants/responseStatus';

const { mapActions: mapAuthActions } = createNamespacedHelpers('auth');
const { mapActions: mapUserActions, mapGetters: mapUserGetters } = createNamespacedHelpers('user');

export default {
  name: 'KycStepThree',
  components: {
    BgainButton,
    CellGroup,
    KycField,
    SendCode,
  },
  props: ['remainingTimeText'],
  data() {
    return {
      token: '',
    };
  },
  computed: {
    ...mapUserGetters(['username', 'countryCode']),
    desensitizedUsername() {
      return getDesensitizedUsername(this.username);
    },
    disabled() {
      return this.token.length === 0;
    },
  },
  methods: {
    ...mapAuthActions(['getToken']),
    ...mapUserActions(['getUserSummary']),
    onInput(value) {
      const re = /^\d+$/;
      if (!re.test(value)) {
        this.token = value.slice(0, value.length - 1);
      }
      if (value.length > 6) {
        this.token = value.slice(0, 6);
      }
    },
    async onSendToken() {
      try {
        if (!this.remainingTimeText) {
          await this.getUserSummary();
          await this.getToken({
            username: this.username,
            countryCode: this.countryCode,
          });
          Toast('发送验证码成功');
        }
      } catch (error) {
        Toast(responseStatus[error.status]);
      }
    },
    onSubmitClick() {
      this.$emit('submit', this.token);
    },
    onPrevClick() {
      this.$emit('change-step', 2);
    },
    onTime(time) {
      this.$emit('changeTime', time);
    },
  },
};
</script>

<style lang="scss" scoped>
  .kyc__field--slogan {
    font-size: 15px;
    color: #0F3256;
  }
</style>
