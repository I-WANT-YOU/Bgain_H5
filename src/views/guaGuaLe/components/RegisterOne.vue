<template>
  <div class="registerOne">
    <!--输入框-->
    <div class="baseInputContainer">
      <BaseInput v-model="baseInputValue"/>
    </div>
    <div class="phoneInputContainer">
      <PhoneInput v-model="phoneInputValue"/>
    </div>
    <!--切换登陆注册状态-->
    <div class="userState">
      <span>已有账号？</span><span>点击兑换</span>
    </div>
    <div class="nextStep" @click="toNextStep">
      <BaseButton title="下一步"/>
    </div>
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue';
import PhoneInput from './PhoneInput.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'registerOne',
  data() {
    return {
      baseInputValue: '',
      phoneInputValue: '',
    };
  },
  components: {
    BaseInput,
    PhoneInput,
    BaseButton,
  },
  methods: {
    toNextStep() {
      this.$emit('toNextStep', 'registerTwo');
    },
  },
};
</script>

<style lang="scss" scoped>
  .registerOne{
    font-family:PingFang SC sans-serif;
    padding-top: 32px;
    /*y验证码输入框*/
    .baseInputContainer{
      margin-bottom: 15px;
    }
    /*电话输入框*/
    .phoneInputContainer{
      margin-bottom: 20px;
    }
    /*注册登陆切换*/
    .userState{
      padding-right: 35px;
      display: flex;
      justify-content: flex-end;
      >span{
        font-size:12px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:11px;
      }
      >span:nth-child(2){
        text-decoration: underline;
      }
    }
    /*button*/
    .nextStep{
      margin-top: 26px;
    }
  }
</style>
