<template>
  <div class="swipe">
    <Swipe :loop="false" :width="325" :height="134" autoplay=1000>
      <SwipeItem><img src="../../assets/images/s1.jpg"></SwipeItem>
      <SwipeItem><img src="../../assets/images/s1.jpg"></SwipeItem>
      <SwipeItem><img src="../../assets/images/s1.jpg"></SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import {
  Swipe, SwipeItem,
} from 'vant';

export default {
  name: 'HomeSwipe',
  components: {
    Swipe,
    SwipeItem,
  },
};
</script>

<style lang="scss" scoped>

</style>
