<template>
  <div class="kyc__container">
    <bgain-nav-bar :onArrowClick="goBack" title="身份认证"></bgain-nav-bar>
    <kyc-notice-bar />
    <kyc-step-one
      v-if="step === 1"
      :country="country"
      @first-name="onFirstNameChange"
      @last-name="onLastNameChange"
      @change-step="onChangeStep"
      :first-name="firstName"
      :last-name="lastName"
    ></kyc-step-one>
    <kyc-step-two
      v-if="step === 2"
      :files.sync="files"
      @change-doc-type="onChangeDocType"
      @change-doc-number="onChangeDocNumber"
      :document-type="documentType"
      :document-number="documentNumber"
      @change-step="onChangeStep"
    ></kyc-step-two>
    <kyc-step-three
      v-if="step === 3"
      @submit="onSubmit"
      @change-step="onChangeStep"
      @changeTime="remainingTime"
      :remainingTimeText="remainingTimeText"
    ></kyc-step-three>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { isEmpty } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';
import KycNoticeBar from './components/KycNoticeBar.vue';
import KycStepOne from './components/KycStepOne.vue';
import KycStepTwo from './components/KycStepTwo.vue';
import KycStepThree from './components/KycStepThree.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('user');

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
      remainingTimeText: '',
    };
  },
  computed: {
    ...mapGetters(['username']),
  },
  mounted() {
    const { params } = this.$route;
    if (!isEmpty(params)) {
      this.country = params;
    }
  },
  methods: {
    ...mapActions(['submitKyc', 'getUserSummary']),
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
    getSubmitOptions(token) {
      if (this.documentType === 'ID') {
        return {
          nationality: this.country.text,
          first_name: this.firstName,
          last_name: this.lastName,
          document_number: this.documentNumber,
          document_type: this.documentType,
          user_name: this.username,
          token,
          img_url_1: this.files[0],
          img_url_2: this.files[1],
          img_url_3: this.files[2],
        };
      }
      return {
        nationality: this.country.text,
        first_name: this.firstName,
        last_name: this.lastName,
        document_number: this.documentNumber,
        document_type: this.documentType,
        user_name: this.username,
        token,
        img_url_1: this.files[0],
        img_url_3: this.files[1],
      };
    },
    async onSubmit(token) {
      const options = this.getSubmitOptions(token);
      try {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '提交审核中...',
        });
        await this.submitKyc(options);
        Toast.clear();
        this.$router.push({
          name: 'kyc-result',
        });
      } catch (error) {
        Toast.clear();
        Toast(error);
      }
    },
    goBack() {
      if (this.$route.query.fromPath && this.$route.query.fromPath === 'register') {
        this.$router.push('/');
      } else {
        this.$router.push('/mine/safety');
      }
    },
    remainingTime(time) {
      this.remainingTimeText = time;
    },
  },
};
</script>

<style lang="scss">
.kyc__container {
  height: 100%;
  background: #f8f8f8;

  .kyc__notice {
    background: #faf4dc;
    font-size: 12px;
    color: #6a707d;
    line-height: 21px;
    padding: 5px 0 5px 20px;
  }

  .kyc__fields {
    .van-cell {
      display: flex;
      align-items: center;
      padding: 16px 30px;
    }

    .van-cell:not(:last-child)::after {
      left: 22px;
      right: 22px;
    }

    .kyc__field-override {
      span {
        font-size: 15px;
        color: #6a707d;
      }
    }

    .kyc__country {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 15px;
        color: #0f3256;
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
