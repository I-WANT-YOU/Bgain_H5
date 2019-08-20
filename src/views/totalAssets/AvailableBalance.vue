<template>
    <div class="availableBalance">
      <BgainNavBar title="可用余额"/>
      <div>
        <AssetsList
          :show-data="userAvailableAssetsAssets.balances"
          showSkipToNext="true"
        />
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '../../components/BgainNavBar.vue';
import AssetsList from './components/AssetsList.vue';
import errorMessage from '../../constants/responseStatus';

export default {
  name: 'AvailableBalance',
  components: {
    BgainNavBar,
    AssetsList,
  },
  computed: {
    ...mapState('assets/userAssets', [
      'userAvailableAssetsAssets', // 用户可用余额
    ]),
  },
  methods: {
    ...mapActions('assets/userAssets', [
      'getUserAvailableAssets',
    ]),
  },
  mounted() {
    Toast.loading({
      mask: true,
      duration: 5000,
      message: '加载中...',
    });
    this.getUserAvailableAssets().then(
      () => {
        Toast.clear();
      },
      (err) => {
        Toast.clear();
        if (err.status) {
          Toast(errorMessage[err.status]);
        } else {
          Toast('网络错误');
        }
      },
    );
  },
  beforeDestroy() {
    Toast.clear();
  },
};
</script>

<style scoped>
.availableBalance{

}
</style>
