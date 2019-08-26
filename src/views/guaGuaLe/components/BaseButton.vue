<template>
    <div class="baseButton">
      <button>{{title}}</button>
    </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
  .baseButton{
    display: flex;
    justify-content: center;
    >button{
      width: 211px;
      height: 55px;
      background: url("../../../assets/images/guaGuaLe/bg-basebutton.png") no-repeat;
      background-size: 211px 55px;
      font-size:15px;
      font-weight:bold;
      color:rgba(254,254,254,1);
      border:none;
    }
  }
</style>
