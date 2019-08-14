<template>
  <div class="result__container">
    <nav-bar title="兑换结果" :on-arrow-click="onClick"/>
    <div class="fail-card__wrapper">
      <svg-icon icon-class="fail" class="icon-fail" />
      <div class="fail-card__title">兑换失败</div>
    </div>
    <div class="result__button--wrapper">
      <Button type="info" :fluid="true" @click="onClick">重新操作</Button>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainButton from '@/components/BgainButton.vue';

export default {
  name: 'ProductResultFail',
  components: {
    NavBar: BgainNavBar,
    Button: BgainButton,
  },
  methods: {
    onClick() {
      this.$router.push({
        name: 'product-detail',
        params: {
          id: this.$route.params.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .result__container {
    height: 100%;
    background: #ffffff;

    .fail-card__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 60px;

      .fail-card__title {
        margin: 30px 0;
        font-size: 20px;
        color: #333333;
        line-height: 21px;
      }

      .icon-fail {
        width: 117px;
        height: 111px;
      }
    }

    .result__button--wrapper {
      padding: 0 22px;
      margin: 60px 0 30px;
    }
  }
</style>
