<template>
  <div class="kyc-fields__container">
    <bgain-nav-bar title="身份认证"></bgain-nav-bar>
    <div class="kyc-fields__content">
      <Field
        label="国籍"
      >
        <template v-slot:input>
          <span class="kyc-fields__value">Singapore</span>
        </template>
      </Field>
      <Field
        label="姓名"
      >
        <template v-slot:input>
          <span class="kyc-fields__value">Singapore</span>
        </template>
      </Field>
      <Field
        label="名"
      >
        <template v-slot:input>
          <span class="kyc-fields__value">Singapore</span>
        </template>
      </Field>
      <Field
        label="姓"
      >
        <template v-slot:input>
          <span class="kyc-fields__value">Singapore</span>
        </template>
      </Field>
      <Field
        label="证件类型"
      >
        <template v-slot:input>
          <span class="kyc-fields__value">Singapore</span>
        </template>
      </Field>
      <Field
        label="证件号码"
      >
        <template v-slot:input>
          <span class="kyc-fields__value">Singapore</span>
        </template>
      </Field>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainBaseField from '@/components/BgainBaseField.vue';

const { mapActions } = createNamespacedHelpers('user');

export default {
  name: 'KycFields',
  components: {
    BgainNavBar,
    Field: BgainBaseField,
  },
  async mounted() {
    try {
      await this.getKycInfo();
    } catch (error) {
      Toast(error.message);
    }
  },
  methods: {
    ...mapActions(['getKycInfo']),
  },
};
</script>

<style lang="scss" scoped>
  .kyc-fields__container {
    height: 100%;
    background: #F8F8F8;

    .kyc-fields__content {
      padding-top: 10px;

      .kyc-fields__value {
        font-size: 15px;
        color: #0F3256;
      }
    }
  }
</style>
