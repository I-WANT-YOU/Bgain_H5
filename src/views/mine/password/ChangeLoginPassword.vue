<template>
  <div class="password__container">
    <BgainNavBar title="修改登录密码"/>
    <div class="password__content">
      <Field
        label-width="90px"
        v-model="oldPassword"
        type="password"
        label="原登录密码"
        placeholder="请输入原登录密码"
      />
      <Field
        label-width="90px"
        v-model="password"
        type="password"
        label="新登录密码"
        placeholder="密码由8-20位字母及数字组成"
      />
      <Field
        label-width="90px"
        v-model="checkPassword"
        type="password"
        label="确认新密码"
        placeholder="请再次输入新密码"
      />
    </div>
    <div class="password__button--wrapper">
      <Button type="info" :fluid="true" @click="onClick" :loading="loading">确定</Button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainBaseField from '@/components/BgainBaseField.vue';
import BgainButton from '@/components/BgainButton.vue';
import responseStatus from '@/constants/responseStatus';

export default {
  name: 'ChangeLoginPassword',
  components: {
    BgainNavBar,
    Button: BgainButton,
    Field: BgainBaseField,
  },
  data() {
    return {
      oldPassword: '',
      password: '',
      checkPassword: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      changeLoginPassword: 'auth/changePassword',
    }),
    resetFields() {
      this.oldPassword = '';
      this.password = '';
      this.checkPassword = '';
    },
    async onClick() {
      const reg = /\d/;
      const regs = /[A-Za-z]/;
      if (this.oldPassword === '') {
        Toast('请输入原登录密码');
      } else if (!this.password || this.password.length < 8
        || this.password.length > 20 || !reg.test(this.password) || !regs.test(this.password)) {
        Toast('请输入8-20位字母及数字组成的密码');
      } else if (this.password !== this.checkPassword) {
        Toast('两次密码不一致，请重新输入');
      } else {
        try {
          this.loading = true;
          await this.changeLoginPassword({
            oldPassword: this.oldPassword,
            newPassword: this.password,
          });
          this.loading = false;
          Toast('修改登录密码成功');
          this.resetFields();
        } catch (error) {
          if (error.status) {
            Toast(responseStatus[error.status]);
          }
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "./style/password";
</style>
