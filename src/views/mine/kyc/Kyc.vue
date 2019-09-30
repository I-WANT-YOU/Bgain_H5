<template>
  <div class="kyc__container">
    <bgain-nav-bar :onArrowClick="goBack" :title="title"></bgain-nav-bar>
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
      :authenticationType="this.authenticationType"
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

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('user');

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
      countDownTime: 5,
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
      authenticationType: '', // 判断是kyc还是otc的标识
      title: '身份认证',
    };
  },
  computed: {
    ...mapGetters(['username', 'submitKycStatus', 'submitKycMsg']),
    ...mapState(['submitKycResult']),
  },
  mounted() {
    const { params } = this.$route;
    if (!isEmpty(params)) {
      this.country = params;
    }
    /* 判断是KYC认证还是OTC认证 */
    if (this.$route.query.type) {
      if (this.$route.query.type === 'OTC') {
        this.authenticationType = 'OTC';
        this.title = 'OTC认证';
      }
    }
  },
  methods: {
    ...mapActions(['submitKyc', 'getUserSummary', 'submitOTC', 'getKycInfo']),
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
        if (this.authenticationType === 'OTC') {
          return {
            nationality: this.country.text,
            first_name: this.firstName,
            last_name: this.lastName,
            id_card_number: this.documentNumber,
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
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '提交审核中...',
      });
      if (this.authenticationType === 'OTC') {
        this.submitOTC(options).then(
          (res) => {
            Toast.clear();
            if (res.code === 0) {
              this.$router.push({
                name: 'kyc-result',
                query: { authenticationType: 'OTC' },
              });
            } else { // 身份证被占用
              Toast.clear();
              Toast(res.msg);
            }
          },
          () => {
            Toast.clear();
            Toast('网络错误');
          },
        );
      } else {
        this.submitKyc(options).then(
          (res) => {
            if (res.code === 0) {
              Toast.clear();
              if (this.documentType === 'ID') {
                this.timer = setInterval(() => {
                  this.getKycResult();
                }, 1000);
              } else {
                this.$router.push({
                  name: 'kyc-result',
                });
              }
            } else { // 身份证被占用
              Toast.clear();
              Toast(res.msg);
            }
          },
          () => {
            Toast.clear();
            Toast('网络错误');
          },
        );
      }
    },
    goBack() {
      if (this.$route.query.fromPath && this.$route.query.fromPath === 'register') {
        this.$router.push('/');
      } else if (this.$route.query.fromPath === 'kyc') {
        this.$router.push('/mine/safety');
      } else {
        this.$router.go(-1);
      }
    },
    // 调用接口查询验证状态 kyc
    async getKycResult() {
      Toast.loading({
        message: '加载中...',
      });
      if (this.countDownTime > 0) {
        this.countDownTime -= 1;
        try {
          await this.getKycInfo();
          if (this.submitKycStatus === 'CERTIFIED' || this.submitKycStatus === 'PASSED') { // 审核通过 显示 一件授权弹窗
            Toast.clear();
            clearInterval(this.timer); // 清除轮询
            this.$router.push({
              name: 'kyc-result',
            });
          } else if (this.submitKycStatus === 'REJECTED') {
            clearInterval(this.timer); // 清除轮询
            Toast.clear();
            this.$router.push({
              name: 'kyc-result',
            });
          }
        } catch (error) {
          Toast.clear();
          throw error;
        }
      } else {
        clearInterval(this.timer);
        Toast.clear();
        this.$router.push({
          name: 'kyc-result',
        });
      }
    },
    remainingTime(time) {
      this.remainingTimeText = time;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
      .icon-hidden{
        display: none;
      }
    }
  }

  .kyc__button-wrap {
    margin: 45px 0 30px;
    padding: 0 22px;
  }
}
</style>
