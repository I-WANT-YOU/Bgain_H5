<template>
  <!--:width = 335-->
  <!--:height= 88-->
  <div class="swipe">
    <Swipe
      :autoplay="3000"
      indicator-color="white"
      :style="{width:'335px',height:'88px',}"
    >
      <SwipeItem v-for="(item,index) in bannerList" :key="index">
        <van-image
          :src="item.img_url"
          @click="$router.push('/refer')"
        />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import {
  Swipe, SwipeItem, Image,
} from 'vant';
import { mapState } from 'vuex';

export default {
  name: 'ActivityCenterSwipe',
  data() {
    return {
      img: 'http://img2.imgtn.bdimg.com/it/u=180868167,273146879&fm=26&gp=0.jpg',
    };
  },
  components: {
    Swipe,
    SwipeItem,
    'van-image': Image,
  },
  methods: {
  },
  computed: {
    ...mapState('activity', [
      'bannerList',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .swipe{
    width :335px;
    height:88px;
  }

</style>
