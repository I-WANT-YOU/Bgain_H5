<template>
  <div class="totalAssets">
    <BgainNavBar title="总资产"/>
    <div class="totalAssets-content">
      <!--tips-->
      <div class="content-tips">
        <span>总资产 = 可用余额 + 在投资产(包括活期、定期产品) + 待收收益</span>
      </div>
      <!--总资产列表-->
      <div class="totalAssets-list-container">
        <AssetsList
          :showData = "userAssets.single_currency"
          showSkipToNext="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState, mapActions } from 'vuex';
import BgainNavBar from '../../components/BgainNavBar.vue';
import AssetsList from './components/AssetsList.vue';
import errorMessage from '../../constants/responseStatus';

export default {
  name: 'TotalAssets',
  components: {
    BgainNavBar,
    AssetsList,
  },
  computed: {
    ...mapState('assets/userAssets', [
      'userAssets', // 用户总资产信息
    ]),
  },
  methods: {
    ...mapActions('assets/userAssets', [
      'getUserAssets',
    ]),
  },
  mounted() {
    Toast.loading({
      mask: true,
      duration: 5000,
      message: '加载中...',
    });
    this.getUserAssets().then(
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

<style lang="scss" scoped>
.totalAssets{
  min-height: 100vh;
  background: #F8F8F8;
  font-family: PingFangSC-Regular sans-serif;
  .totalAssets-content{
    /*tips*/
    .content-tips{
      height: 30px;
      background: #FAF4DC;
      padding-left: 20px;
      display: flex;
      align-items: center;
      >span{
        font-size: 12px;
        color: #6A707D;
        line-height: 21px;
      }
    }
    /*总资产列表*/
    .totalAssets-list-container{
      background: #FFFFFF;
    }
  }
}
</style>
