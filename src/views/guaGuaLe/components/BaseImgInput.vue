<template>
   <div class="baseInput">
     <input :placeholder="placeHolderValue" :maxlength="maxlength"
            @input="emitChange($event.target.value)"
            :type="typeValue"
            :value="value"
            ref="myInput"
     />
     <img :src="passwordImg" class="eye-icon" alt="" @click="changeImg">
   </div>
</template>

<script>
import showPassword from '../../../assets/images/guaGuaLe/eye_open.svg';
import hidePassword from '../../../assets/images/guaGuaLe/eye_close.svg';

export default {
  name: 'BaseImgInput',
  data() {
    return {
      showPassword,
      hidePassword,
      passwordStatus: 'close',
      passwordImg: showPassword,
    };
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
    },
    placeHolderValue: {
      type: String,
    },
    typeValue: {
      type: String,
    },
    maxlength: {
      type: String,
    },
  },
  methods: {
    emitChange(value) {
      this.$emit('input', value);
    },
    /* 改变图片 */
    changeImg() {
      if (this.passwordStatus === 'close') { // 此时密码是***
        this.passwordStatus = 'open';
        this.passwordImg = hidePassword;
        this.$refs.myInput.type = 'text';
      } else {
        this.passwordStatus = 'close';
        this.passwordImg = showPassword;
        this.$refs.myInput.type = 'password';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .baseInput{
    font-family:PingFang SC sans-serif;
    height:44px;
    margin:0 35px;
    padding: 0 21px;
    display: flex;
    align-items: center;
    background:rgba(255,255,255,1);
    border-radius:22px;
    >input{
      flex-grow: 1;
      font-size:15px;
      font-weight:400;
      line-height:11px;
      border: none;
      outline: none;
    }
    .eye-icon{
      width: 26px;
      height: 17px;
    }
  }
</style>
