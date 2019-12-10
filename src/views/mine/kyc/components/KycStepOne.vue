<template>
  <div>
    <div class="kyc__fields">
      <cell-group :border="false">
        <kyc-field
          label="国籍"
          placeholder="请输入用户名"
        >
          <template v-slot:input>
            <div class="kyc__country" @click="onCountryClick">
              <span>{{country.text}}</span>
              <svg-icon icon-class="next"
                        class="icon-next"
                        :class="{'icon-hidden':isCountryClick}"></svg-icon>
            </div>
          </template>
        </kyc-field>
        <kyc-field
          :value="firstName"
          @input="onFirstNameInput"
          label="姓名"
          placeholder="请输入真实姓名"
          v-if="country.key === 'China'
          || this.country.key === 'Hongkong'
          || this.country.key === 'Taiwan'"
        ></kyc-field>
        <template v-else>
          <kyc-field
            :value="firstName"
            @input="onFirstNameInput"
            label="名"
            placeholder="请输入真实名字"
          ></kyc-field>
          <kyc-field
            :value="lastName"
            @input="onLastNameInput"
            label="姓"
            placeholder="请输入真实姓氏"
          ></kyc-field>
        </template>
      </cell-group>
    </div>
    <div class="kyc__button-wrap">
      <bgain-button
        type="info"
        :fluid="true"
        :disabled="disabled"
        @click="onNextClick"
      >
        下一步
      </bgain-button>
    </div>
  </div>
</template>

<script>
import { CellGroup, Toast } from 'vant';
import { isEmpty } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import BgainButton from '@/components/BgainButton.vue';
import KycField from './KycField.vue';

const { mapActions } = createNamespacedHelpers('user');

export default {
  name: 'KycStepOne',
  components: {
    BgainButton,
    KycField,
    CellGroup,
  },
  data() {
    return {
      isCountryClick: false,
    };
  },
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    country: {
      type: Object,
      required: true,
    },
  },
  computed: {
    disabled() {
      if (this.country.key === 'China' || this.country.key === 'Hongkong' || this.country.key === 'Taiwan') {
        return isEmpty(this.firstName);
      }
      return isEmpty(this.firstName) || isEmpty(this.lastName);
    },
  },
  methods: {
    ...mapActions(['checkOtcUserName']),

    onCountryClick() {
      if (this.isCountryClick === true) {
        return false;
      }
      this.$router.push({
        name: 'country',
        params: {
          fromPath: 'kyc',
        },
      });
      return true;
    },
    onFirstNameInput(firstName) {
      this.$emit('first-name', firstName);
    },
    onLastNameInput(lastName) {
      this.$emit('last-name', lastName);
    },
    /* 下一步 */
    async onNextClick() {
      // 进行OTC填写验证 判断名字事是否一致
      if (this.type === 'OTC') {
        const checkOtcUserNameParams = {
          user_name: this.firstName,
        };
        try {
          const data = await this.checkOtcUserName(checkOtcUserNameParams);
          if (data.code === 0) {
            this.$emit('change-step', 2);
          } else {
            Toast(data.msg);
          }
        } catch (e) {
          Toast('网络错误');
        }
      } else {
        this.$emit('change-step', 2);
      }
    },
  },
  mounted() {
    if (this.$route.query.type === 'OTC' || this.$route.query.type === 'KYC') {
      this.isCountryClick = true;
      this.type = this.$route.query.type;
    }
  },
};
</script>

<style lang="scss">
.van-field__body{
  width: 100%;
  .van-field__control{
    width: 100%;
  }
}
.kyc__country{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
