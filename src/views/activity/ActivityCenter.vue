<template>
  <div class="activity__container">
    <nav-bar title="活动中心" :show-arrow="false" />
  </div>
</template>

<script>
import BgainNavBar from '@/components/BgainNavBar.vue';

export default {
  name: 'ActivityCenter',
  components: {
    NavBar: BgainNavBar,
  },
};
</script>

<style scoped>

</style>
