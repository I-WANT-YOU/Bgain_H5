<template>
  <div class="kyc__container">
    <bgain-nav-bar title="身份认证"></bgain-nav-bar>
    <kyc-notice-bar/>
    <kyc-step-one
      v-if="step === 1"
      :country="country"
      @first-name="onFirstNameChange"
      @last-name="onLastNameChange"
      @change-step="onChangeStep"
      :first-name="firstName"
      :last-name="lastName"
    >
    </kyc-step-one>
    <kyc-step-two
      v-if="step === 2"
      :files.sync="files"
      @change-doc-type="onChangeDocType"
      @change-doc-number="onChangeDocNumber"
      :document-type="documentType"
      :document-number="documentNumber"
      @change-step="onChangeStep"
    >
    </kyc-step-two>
    <kyc-step-three
      v-if="step === 3"
      @submit="onSubmit"
    ></kyc-step-three>
  </div>
</template>

<script>
import { isEmpty } from 'lodash';
import BgainNavBar from '@/components/BgainNavBar.vue';
import KycNoticeBar from './components/KycNoticeBar.vue';
import KycStepOne from './components/KycStepOne.vue';
import KycStepTwo from './components/KycStepTwo.vue';
import KycStepThree from './components/KycStepThree.vue';

export default {
  name: 'Kyc',
  components: {
    KycStepThree,
    KycStepTwo,
    KycStepOne,
    KycNoticeBar,
    BgainNavBar,
  },
  data() {
    return {
      step: 1,
      country: {
        key: 'China',
        label: '+86',
        text: '中国',
        value: '+86',
      },
      firstName: '',
      lastName: '',
      documentType: 'ID',
      documentNumber: '',
      files: ['', '', ''],
    };
  },
  computed: {},
  mounted() {
    const { params } = this.$route;
    if (!isEmpty(params)) {
      this.country = params;
    }
  },
  methods: {
    onCountryClick() {
      this.$router.push({
        name: 'country',
        params: {
          fromPath: 'kyc',
        },
      });
    },
    onFirstNameChange(firstName) {
      this.firstName = firstName;
    },
    onLastNameChange(lastName) {
      this.lastName = lastName;
    },
    onChangeDocType(type) {
      this.documentType = type;
    },
    onChangeDocNumber(number) {
      this.documentNumber = number;
    },
    onChangeStep(step) {
      this.step = step;
    },
    async onSubmit(token) {
      console.log(token);
    },
  },
};
</script>

<style lang="scss">
  .kyc__container {
    height: 100%;
    background: #F8F8F8;

    .kyc__notice {
      background: #FAF4DC;
      font-size: 12px;
      color: #6A707D;
      line-height: 21px;
      padding: 5px 0 5px 20px;
    }

    .kyc__fields {
      .van-cell {
        padding: 16px 30px;
      }

      .van-cell:not(:last-child)::after {
        left: 22px;
        right: 22px;
      }

      .kyc__field-override {
        span {
          font-size: 15px;
          color: #6A707D;
        }
      }

      .kyc__country {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 15px;
          color: #0F3256;
        }

        .icon-next {
          width: 7px;
          height: 11px;
        }
      }
    }

    .kyc__button-wrap {
      margin-top: 60px;
      padding: 0 22px;
    }
  }
</style>
