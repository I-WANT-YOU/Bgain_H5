<template>
  <div class="detailList">
    <nav-bar title="BGP明细" />
    <div class="detail-list">
      <div class="detail-item" v-for="(item,index) in detailList.operation_logs" :key="index">
        <div>
          <span>{{item.currencyType}}</span>
          <span>{{item.fbpType === 'INCREASE'?'+':'-'}}{{item.amount}}</span>
        </div>
        <div>
          {{createOrderDate(item.createAt)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import PublicMethods from '@utils/publicMethods';
import BgainNavBar from '@/components/BgainNavBar.vue';
import errorMessage from '../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'BGPDetailList',
  components: {
    NavBar: BgainNavBar,
  },
  computed: {
    ...mapState('activity', [
      'detailList',
    ]),
  },
  methods: {
    ...mapActions('activity', [
      'getBGPDetailList',
    ]),
    // 时间格式化
    createOrderDate(date) {
      return PublicMethods.createOrderDate(date);
    },
  },
  mounted() {
    Toast.loading({
      message: '加载中...',
    });
    this.getBGPDetailList().then(
      () => {
        Toast.clear();
        console.log(this.detailList);
      },
      (err) => {
        this.$toast.clear();
        if (err.status) { this.$toast(errorMessage[err.status]); } else {
          this.$toast('网络故障');
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
.detailList{
  font-family: PingFangSC-Regular sans-serif;
  .detail-item{
    height: 60px;
    padding:0 20px;
    border-bottom: 0.51px solid #EEEEEE;
  >div:nth-child(1){
    display: flex;
    justify-content: space-between;
    margin-top: 11px;
    >span{
      font-size: 15px;
      color: #333333;
      line-height: 21px;
    }
  }
    >div:nth-child(2){
      font-size: 12px;
      color: #999999;
      line-height: 17px;
    }
  }
}
</style>
