<template>
    <div class="currencyDetails">
      <BgainNavBar :title="this.$route.query.currency || ''"/>
      <div class="detail-content">
        <!--提示-->
        <div class="tips" v-show="this.$route.query.currency === 'FBP'">
          <span>FBP是Bgain平台激励用户投资行为的奖励</span>
        </div>
        <!--用户余额-->
        <div class="availableBalance">
          <span>可用余额({{this.$route.query.currency}})</span>
          <span>10.000</span>
        </div>
      </div>
      <!--交易记录-->
      <div class="tradeRecord-container">
        <RecordList
          :show-data="userAssetsRecord.operation_logs"
          :currencyType="this.$route.query.currency || ''"/>
      </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState, mapActions } from 'vuex';
import BgainNavBar from '../../components/BgainNavBar.vue';
import RecordList from './components/RecordList.vue';
import errorMessage from '../../constants/responseStatus';

export default {
  name: 'CurrencyDetails',
  components: {
    BgainNavBar,
    RecordList,
  },
  computed: {
    ...mapState('assets/userAssets', [
      'userAssetsRecord', // 用户资产交易记录
    ]),
  },
  methods: {
    ...mapActions('assets/userAssets', [
      'getUserAssetsRecord',
    ]),
  },
  mounted() {
    Toast.loading({
      mask: true,
      duration: 5000,
      message: '加载中...',
    });
    this.getUserAssetsRecord().then(
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
.currencyDetails{
  font-family: PingFangSC-Regular sans-serif;
  .detail-content{
    /*提示*/
    .tips{
      display: flex;
      height: 30px;
      align-items: center;
      background: #FAF4DC;
      >span{
        padding-left: 20px;
        font-size: 12px;
        color: #6A707D;
        line-height: 21px;
      }
    }
    /*可用余额*/
    .availableBalance{
      margin-top:19px;
      padding-left: 20px;
      padding-bottom: 10px;
      display: flex;
      flex-direction: column;
      border-bottom: 10px solid #F8F8F8;;
      >span:nth-child(1){
        font-size: 12px;
        color: #0F3256;
        line-height: 17px;
      }
      >span:nth-child(2){
        margin-top: 7px;
        font-size: 34px;
        color: #3C64EE;
        line-height: 48px;
      }

    }
    /*交易记录*/
    .tradeRecord-container{}
  }
}
</style>
