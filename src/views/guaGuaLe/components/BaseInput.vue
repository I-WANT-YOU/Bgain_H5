<template>
   <div class="baseInput">
     <input placeholder="请输入兑换码" maxlength="8"
            @input="emitChange($event.target.value)"
            :value="inputValue"/>
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
    inputValue: {
      type: String,
    },
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
    }
  }
</style>
