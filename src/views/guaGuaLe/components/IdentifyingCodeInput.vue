<template>
   <div class="baseInput">
     <input :placeholder="placeHolderValue"
            type="number"
            @input="emitChange($event.target.value)"
            v-model="newCodeInputValue"
            v-on:blur="backToBottom()"/>
     <div class="countDown">
       <CountDown v-on:sendCodeAgain ="(val)=>{this.$emit('sendCodeAgain',val)}" />
     </div>
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
    backToBottom() {
      window.scrollTo(0, 0);
    },
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
    padding: 0 24px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    background:rgba(255,255,255,1);
    border-radius:22px;
    >input{
      width: 160px;
      font-size:15px;
      font-weight:400;
      border: none;
      outline: none;
      line-height: normal;
    }
    .countDown{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
  }
</style>
