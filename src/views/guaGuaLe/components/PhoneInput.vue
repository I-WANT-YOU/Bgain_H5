<template>
   <div class="baseInput">
     <div class="countryContainer" @click="chooseCountry">
       <span class="countryNum">{{country.value}}</span>
       <van-image :src="arrowDown" class="arrow-down-icon"/>
     </div>
     <input placeholder="请输入手机号"
            v-on:input="$emit('input', $event.target.value)"
            type="number"
            v-model="phoneInputValueFromFather"/>
   </div>
</template>

<script>
import { Image } from 'vant';
import arrowDown from '../../../assets/images/guaGuaLe/arrow_down.png';

export default {
  name: 'BaseInput',
  data() {
    return {
      arrowDown,
      phoneInputValueFromFather: '',
      countryNum: '+86',
      country: {
        value: '+86',
      },
    };
  },
  // model: {
  //   prop: 'phoneInputValue',
  //   event: 'input',
  // },
  props: [
    'phoneInputValue',
  ],
  watch: {
    phoneInputValueFromFather() {
      this.phoneInputValueFromFather = this.phoneInputValue;
    },
  },

  components: {
    'van-image': Image,
  },
  methods: {
    /* v-model实现 */
    emitChange(value) {
      this.$emit('input', value);
    },
    /* 选择国家 */
    chooseCountry() {
      this.$router.push(
        { name: 'country', params: { fromPath: this.$route.name } },
      );
    },
    /* 向父组件中传递国家区号 */
    passCountryCode() {
      this.$emit('countryCode', this.country.value);
    },
  },
  mounted() {
    /* 从country页面返回 */
    if (this.$route.params.key) {
      this.country = this.$route.params;
      this.passCountryCode();
    }
  },
};
</script>

<style lang="scss" scoped>
  .baseInput{
    font-family:PingFang SC sans-serif;
    width:257px;
    height:44px;
    padding:0 24px;
    margin: auto;
    display: flex;
    align-items: center;
    background:rgba(255,255,255,1);
    border-radius:22px;
    /*国家区号*/
    .countryContainer{
      display: flex;
      align-items: center;
      .countryNum{
        font-size:15px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:11px;
      }
      .arrow-down-icon{
        width: 8px;
        height: 7px;
        padding: 0 10px;
      }
    }
    >input{
      flex-grow: 1;
      font-size:15px;
      font-weight:400;
      border: none;
      outline: none;
      line-height: normal;
    }
  }
</style>
