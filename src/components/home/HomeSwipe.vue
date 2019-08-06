<template>
      <div class="bannerBox">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
              <img :src = "item.img_url"  alt=".">
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import 'swiper/dist/css/swiper.min.css';
import { mapGetters } from 'vuex';
import Swiper from 'swiper';

export default {
  name: 'HomeSwipe',
  computed: {
    ...mapGetters('home', [
      'banners',
    ]),
  },
  mounted() {
    /* eslint-disable */
    let mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', //滑动方向，可设置水平(horizontal)或垂直(vertical)。
      loop: true, // 设置为true 则开启loop模式
      autoplay: { // 自动切换时间
             delay: 3000,
             disableOnInteraction: false,
      },
      slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量(carousel模式)。类型：number or auto
      centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
      spaceBetween: 10, // 在slide之间设置距离（单位px）。
      loopAdditionaSlider: 0, // loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数。
    });
  },
};
</script>

<style lang="scss" scoped>
  .bannerBox{
    position: relative;
    height: 134px;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-container .swiper-wrapper .swiper-slide {
    width: 86% !important;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .swiper-container .swiper-wrapper .swiper-slide img {
    width: 100%;
    height: 134px;
    border-radius: 5px;
  }
  .swiper-container .swiper-wrapper .swiper-slide-prev,
  .swiper-container .swiper-wrapper .swiper-slide-next{
    height: 134px !important;
    margin-top: 0px;
  }
  .swiper-container .swiper-wrapper .swiper-slide-prev img,
  .swiper-container .swiper-wrapper .swiper-slide-next img{
    width: 100%;
    height: 100%;
  }
</style>
