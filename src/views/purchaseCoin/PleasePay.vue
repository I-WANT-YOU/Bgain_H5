<template>
  <div class="pleasePay">
    <PayHeader/>
    <div class="content-container">
      <PayContent/>
    </div>
  </div>

</template>

<script>
import PayHeader from './components/PayHeader.vue';
import PayContent from './components/PayContent.vue';

export default {
  name: 'PleasePay',
  components: { PayHeader, PayContent },
};
</script>

<style lang="scss" scoped>
  .pleasePay{
    .content-container{
      position: relative;
      width: 343px;
      top:-30px;
      left: 16px;
      right: 16px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 2px rgba(211,211,211,0.31);
      border-radius: 0 0 4px 4px;
    }
  }

</style>
