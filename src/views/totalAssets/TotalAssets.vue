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
        <AssetsList/>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';
import AssetsList from './components/AssetsList.vue';

export default {
  name: 'TotalAssets',
  components: {
    BgainNavBar,
    AssetsList,
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
