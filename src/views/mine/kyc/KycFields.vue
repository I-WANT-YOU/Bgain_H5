<template>
  <div class="kyc-fields__container">
    <bgain-nav-bar title="身份认证"></bgain-nav-bar>
    <div class="kyc-fields__content">
      <Field label="国籍">
        <template v-slot:input>
          <span
            class="kyc-fields__value"
          >{{kycInfo.nationality ? kycInfo.nationality : 'Singapore'}}</span>
        </template>
      </Field>
      <Field label="姓名">
        <template v-slot:input>
          <span class="kyc-fields__value">{{kycInfo.first_name}}{{kycInfo.last_name}}</span>
        </template>
      </Field>
      <Field label="名">
        <template v-slot:input>
          <span class="kyc-fields__value">
            {{kycInfo.last_name
            ? kycInfo.last_name : 'Singapore'}}
          </span>
        </template>
      </Field>
      <Field label="姓">
        <template v-slot:input>
          <span class="kyc-fields__value">
            {{kycInfo.first_name
            ? kycInfo.first_name : 'Singapore'}}
          </span>
        </template>
      </Field>
      <Field label="证件类型">
        <template v-slot:input>
          <span class="kyc-fields__value">{{type}}</span>
        </template>
      </Field>
      <Field label="证件号码">
        <template v-slot:input>
          <span
            class="kyc-fields__value"
          >{{kycInfo.document_number ? kycInfo.document_number : 'Singapore'}}</span>
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

const { mapActions, mapState } = createNamespacedHelpers('user');

export default {
  name: 'KycFields',
  components: {
    BgainNavBar,
    Field: BgainBaseField,
  },
  data() {
    return {
      kycInfoType: 'PASSPORT',
    };
  },
  async mounted() {
    try {
      await this.getKycInfo();
      this.kycInfoType = this.kycInfo.document_type;
    } catch (error) {
      Toast(error.message);
    }
  },
  methods: {
    ...mapActions(['getKycInfo']),
  },
  computed: {
    ...mapState(['kycInfo']),
    type() {
      if (this.kycInfoType.toLocaleUpperCase() === 'PASSPORT') {
        return '护照';
      }
      if (this.kycInfoType.toLocaleUpperCase() === 'DRIVER_LICENSE') {
        return '驾驶证';
      }
      if (this.kycInfoType.toLocaleUpperCase() === 'ID') {
        return '中国大陆身份证';
      }
      return '中国大陆身份证';
    },
  },
};
</script>

<style lang="scss" scoped>
.kyc-fields__container {
  height: 100%;
  background: #f8f8f8;

  .kyc-fields__content {
    padding-top: 10px;

    .kyc-fields__value {
      font-size: 15px;
      color: #0f3256;
    }
  }
}
</style>
