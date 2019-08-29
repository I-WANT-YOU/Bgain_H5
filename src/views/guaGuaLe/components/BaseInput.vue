<template>
   <div class="baseInput">
     <input :placeholder="placeHolderValue" :maxlength="maxlength"
            @input="emitChange($event.target.value)"
            :type="typeValue"
            :value="value"
            v-on:blur="backToBottom()"
     />
   </div>
</template>

<script>
export default {
  name: 'BaseInput',
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
    backToBottom() {
      window.scrollTo(0, 0);
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
      line-height: normal;
      border: none;
      outline: none;
    }
  }
</style>
