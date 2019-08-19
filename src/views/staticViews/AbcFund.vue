<template>
  <div>
    <BgainNavBar title = "第一月度CTA组冠军团队"/>
    <div>
      <van-image class="image-banner" :src="fundABC"/>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import fundABC from '../../assets/images/staticViews/fund-ABC.png';

export default {
  name: 'FundRelease',
  data() {
    return {
      fundABC,
    };
  },
  components: {
    'van-image': Image,
    BgainNavBar,
  },
};
</script>

<style lang="scss" scoped>
.image-banner{
  width: 100%;
}
</style>
