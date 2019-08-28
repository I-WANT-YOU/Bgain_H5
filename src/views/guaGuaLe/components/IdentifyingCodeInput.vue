<template>
   <div class="baseInput">
     <input :placeholder="placeHolderValue"
            type="number"
            @input="emitChange($event.target.value)"
            v-model="newCodeInputValue"/>
     <CountDown v-on:sendCodeAgain ="(val)=>{this.$emit('sendCodeAgain',val)}" />
   </div>
</template>

<script>
import CountDown from './CountDown.vue';

export default {
  name: 'BaseInput',
  data() {
    return {
      newCodeInputValue: '',
    };
  },
  model: {
    prop: 'codeInputValue',
    event: 'input',
  },
  props: {
    codeInputValue: {
      type: String,
    },
    placeHolderValue: {
      type: String,
    },
  },
  watch: {
    newCodeInputValue() {
      this.newCodeInputValue = this.codeInputValue;
    },
  },
  components: {
    CountDown,
  },
  methods: {
    emitChange(value) {
      this.$emit('input', value);
    },
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
    >input{
      flex-grow: 1;
      font-size:15px;
      font-weight:400;
      line-height:11px;
      border: none;
      outline: none;
    }
  }
</style>
