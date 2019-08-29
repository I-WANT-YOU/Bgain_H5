<template>
  <div class="bannerBox">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" @click="onSkip(item.url)" :key="index">
          <img :src="item.img_url" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.min.css';
import { mapGetters } from 'vuex';
import Swiper from 'swiper';
import { Image } from 'vant';

export default {
  name: 'HomeSwipe',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('home', [
      'banners',
    ]),
  },
  components: {
    'van-image': Image,
  },
  mounted() {
    /* eslint-disable */
    this.mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', //滑动方向，可设置水平(horizontal)或垂直(vertical)。
        slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量(carousel模式)。类型：number or auto
        centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
        spaceBetween: 10, // 在slide之间设置距离（单位px）。
        init: false,
        observer : true,
        observeParents: true,
      });
  },
  methods:{
    onSkip(router){
      if(router){
        window.location.href = router;
      }
    },
    initSwiper() {
      this.mySwiper.init();
    },
  }
};
</script>

<style lang="scss" scoped>
  .bannerBox{
    position: relative;
    height: 110px;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-container .swiper-wrapper .swiper-slide {
    width: 89% !important;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: #f8f8f8;
  }
  .swiper-container .swiper-wrapper .swiper-slide img {
    width: 100%;
    height: 110px;
    border-radius: 5px;
  }
  .swiper-container .swiper-wrapper .swiper-slide-prev,
  .swiper-container .swiper-wrapper .swiper-slide-next{
    height: 110px !important;
    margin-top: 0px;
  }
  .swiper-container .swiper-wrapper .swiper-slide-prev img,
  .swiper-container .swiper-wrapper .swiper-slide-next img{
    width: 100%;
    height: 100%;
  }
</style>
