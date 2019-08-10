<template>
  <div class="password__container">
    <BgainNavBar title="设置交易密码"/>
    <div class="password__content">
      <Field
        label-width="90px"
        v-model="password"
        type="password"
        label="交易密码"
        placeholder="请设置由6位数字组成的交易密码"
      />
      <Field
        label-width="90px"
        v-model="checkPassword"
        type="password"
        label="确认密码"
        placeholder="请确认交易密码"
      />
      <Field
        label-width="90px"
        v-model="token"
        @input="onTokenInput"
        label="验证码"
        placeholder="请输入验证码"
      >
        <template v-slot:button>
          <SendCode @onsend="onSendToken"/>
        </template>
      </Field>
      <div class="password__token--info">{{info}}</div>
    </div>
    <div class="password__button--wrapper">
      <Button
        type="info"
        :fluid="true"
        :loading="loading"
        @click="onClick"
      >
        确定
      </Button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import { createNamespacedHelpers } from 'vuex';
import { checkEmailFormat, getDesensitizedUsername } from '@utils/tools';
import BgainBaseField from '@/components/BgainBaseField.vue';
import BgainButton from '@/components/BgainButton.vue';
import SendCode from '@/components/SendCode.vue';
import responseStatus from '@/constants/responseStatus';


const { mapActions: mapAuthActions } = createNamespacedHelpers('auth');
const { mapActions: mapUserActions, mapGetters: mapUserGetters } = createNamespacedHelpers(
  'user',
);

export default {
  name: 'SetPaymentPassword',
  components: {
    BgainNavBar,
    Field: BgainBaseField,
    Button: BgainButton,
    SendCode,
  },
  data() {
    return {
      password: '',
      checkPassword: '',
      token: '',
      loading: false,
      info: '',
    };
  },
  computed: {
    ...mapUserGetters(['username', 'countryCode']),
  },
  watch: {
    password(value, old) {
      const re = /^\d{0,6}$/;
      if (!re.test(value)) {
        this.password = old;
      }
      if (value.length > 6) {
        this.password = value.substr(0, 6);
      }
    },
    checkPassword(value, old) {
      const re = /^\d{0,6}$/;
      if (!re.test(value)) {
        this.checkPassword = old;
      }
      if (value.length > 6) {
        this.checkPassword = value.substr(0, 6);
      }
    },
  },
  methods: {
    ...mapAuthActions(['getToken', 'setPaymentPassword']),
    ...mapUserActions(['getUserSummary']),
    async onClick() {
      if (this.password === '') {
        Toast('请输入交易密码');
      } else if (this.password !== '' && this.password.length < 6) {
        Toast('请输入6位交易密码');
      } else if (this.password !== this.checkPassword) {
        Toast('两次密码不一致，请重新输入');
      } else if (this.token === '') {
        Toast('请输入验证码');
      } else {
        try {
          this.loading = true;
          await this.setPaymentPassword({
            password: this.password,
            token: this.token,
          });
          this.loading = false;
          Toast('设置交易密码成功');
          this.$router.push({
            name: 'password',
          });
        } catch (error) {
          if (error.status) {
            Toast(responseStatus[error.status]);
          }
          this.loading = false;
        }
      }
    },
    onTokenInput(value) {
      const re = /^\d+$/;
      if (!re.test(value)) {
        this.token = value.slice(0, value.length - 1);
      }
      if (value.length > 6) {
        this.token = value.slice(0, 6);
      }
    },
    setSentTokenInfo() {
      if (checkEmailFormat(this.username)) {
        return `验证码已发送至 ${getDesensitizedUsername(this.username())}`;
      }
      return `验证码已发送至 ${this.countryCode} ${getDesensitizedUsername(this.username)}`;
    },
    async onSendToken() {
      try {
        await this.getUserSummary();
        await this.getToken({
          username: this.username,
          countryCode: this.countryCode,
        });
        Toast('发送验证码成功');
        this.info = this.setSentTokenInfo();
      } catch (error) {
        if (error.status) {
          Toast(responseStatus[error.status]);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "./style/password";
</style>
