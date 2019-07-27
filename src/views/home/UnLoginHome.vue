<template>
  <div class="unLoginHome">
    <header>
      这是头部
    </header>
    <HomeSwipe/>
  </div>
</template>

<script>
import HomeSwipe from '../../components/home/HomeSwipe.vue';

export default {
  name: 'Home-unLogin',
  components: {
    HomeSwipe,
  },
};
</script>

<style lang="scss" scoped>
.unLoginHome{
  /*头部*/
  >header{
    width: 100%;
    height: 49px;
    line-height: 49px;
    background-color: rebeccapurple;
    text-align: center;
  }
}
</style>
