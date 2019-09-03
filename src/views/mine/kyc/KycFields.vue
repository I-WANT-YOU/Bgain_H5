<template>
  <div class="kyc-fields__container">
    <bgain-nav-bar title="身份认证"></bgain-nav-bar>
    <div class="kyc-fields__content">
      <Field label="国籍">
        <template v-slot:input>
          <span class="kyc-fields__value">{{kyc.nationality ? kyc.nationality : 'Singapore'}}</span>
        </template>
      </Field>
      <Field v-show="showName" label="姓名">
        <template v-slot:input>
          <span class="kyc-fields__value">{{kyc.first_name}}{{kyc.last_name}}</span>
        </template>
      </Field>
      <Field v-show="!showName" label="名">
        <template v-slot:input>
          <span class="kyc-fields__value">
            {{kyc.last_name
            ? kyc.last_name : 'Singapore'}}
          </span>
        </template>
      </Field>
      <Field v-show="!showName" label="姓">
        <template v-slot:input>
          <span class="kyc-fields__value">
            {{kyc.first_name
            ? kyc.first_name : 'Singapore'}}
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
          >{{kyc.document_number ? kyc.document_number : 'Singapore'}}</span>
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
      kyc: {},
      country: [],
    };
  },
  async mounted() {
    try {
      await this.getKycInfo();
      this.kycInfoType = this.kycInfo.data
        ? this.kycInfo.data.document_type
        : this.kycInfo.document_type;
      this.kyc = this.kycInfo.data ? this.kycInfo.data : this.kycInfo;
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
        return '驾照';
      }
      if (this.kycInfoType.toLocaleUpperCase() === 'ID') {
        return '中国大陆身份证';
      }
      return '中国大陆身份证';
    },
    showName() {
      if (this.kyc.nationality === 'Taiwan'
        || this.kyc.nationality === '台湾(中国)'
        || this.kyc.nationality === 'Hongkong'
        || this.kyc.nationality === '香港(中国)'
        || this.kyc.nationality === 'China'
        || this.kyc.nationality === '中国') {
        return true;
      }
      return false;
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
