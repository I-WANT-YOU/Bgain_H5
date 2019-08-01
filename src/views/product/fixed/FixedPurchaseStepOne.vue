<template>
  <div class="fixed-step-one">
    <Header title="7天抢先体验计划44期"/>
  </div>
</template>

<script>
import Header from '../../../components/Header.vue';

export default {
  name: 'FixedPurchaseStepOne',
  mounted() {
    console.log(this.$route.params);
  },
  components: {
    Header,
  },
  methods: {
    // 返回上一层
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
