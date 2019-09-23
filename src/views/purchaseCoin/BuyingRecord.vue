<template>
<div class="buyingRecord">
  <BgainNavBar title = "买币记录" :onArrowClick="goBack"/>
  <div class="record-history">
    <div class="history-item"
         v-for="(item,index) in standerOrderList"
         @click="toOrderDetail(item.id)"
         :key="index">
      <div class="history-header">
        <div>
          <span>{{item.dest_currency_type}}</span>
          <span>{{item.create_date}}</span>
        </div>
        <span :class="{orderStatusStyle:item.otc_order_status === '请付款'}">
          {{item.otc_order_status}}
        </span>
      </div>
      <div class="history-content">
        <div>
          <span>{{item.quantity}}</span>
          <span>数量&nbsp;{{'('+item.dest_currency_type.toUpperCase()+')'}}</span>
        </div>
        <div>
          <span>{{item.amount}}</span>
          <span>交易总额（cny）</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Toast } from 'vant';
import Vue from 'vue';
import BgainNavBar from '../../components/BgainNavBar.vue';
import errorMessage from '../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'BuyingRecord',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      standerOrderList: [],
    };
  },
  methods: {
    ...mapActions('coin/orderInfo', [
      'getOrderList',
    ]),
    // 跳回买币页面
    goBack() {
      this.$router.go(-1);
    },
    // 跳转到详情页面
    toOrderDetail(orderId) {
      this.$router.push({
        name: 'PleasePay',
        params: { orderId },
      });
    },
    // 获取用户订单列表
    getUserOrderList() {
      this.getOrderList().then(
        () => {
          this.$toast.clear(); // 消除加载
          this.standerOrderList = this.formateOrderList();
        },
        (err) => {
          this.$toast.clear();
          if (err.status) { this.$toast(errorMessage[err.status]); } else {
            this.$toast('网络故障');
          }
        },
      );
    },
    // 格式化时间
    formatedDate(paramsDate) {
      const time = new Date(paramsDate); // 毫秒转换为正常时间
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hours = time.getHours();
      let minute = time.getMinutes();
      if (year < 10) {
        year = `0${year}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      const afterDate = `${year}-${month}-${day} ${hours}:${minute}`;
      return afterDate;
    },
    // 格式化订单状态
    formatedOrderStatus(orderStatus) {
      let afterStatus = '';
      if (orderStatus === 'payed') {
        afterStatus = '待放行';
      } else if (orderStatus === 'pending') {
        afterStatus = '请付款';
      } else if (orderStatus === 'dispute') {
        afterStatus = '申诉中';
      } else if (orderStatus === 'finished') {
        afterStatus = '已完成';
      } else if (orderStatus === 'canceled') {
        afterStatus = '已关闭';
      }
      return afterStatus;
    },
    // 格式化列表
    formateOrderList() {
      const currentData = this.orderList.map((item) => {
        item.dest_currency_type = item.dest_currency_type.toUpperCase(); // 类型大写
        item.create_date = this.formatedDate(item.create_date); // 时间格式化
        item.otc_order_status = this.formatedOrderStatus(item.otc_order_status); // 订单状态 中文化
        return item;
      });
      return currentData;
    },
  },
  computed: {
    ...mapState('coin/orderInfo', [
      'orderList',
    ]),
  },
  mounted() {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...',
    });
    // 获取用户列表
    this.getUserOrderList();
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.path === '/purchaseCoinHome') {
      to.meta.keepAlive = true;
    }
    next();
  },
  beforeDestroy() {
    this.$toast.clear();
  },
};
</script>

<style lang="scss" scoped>
  .orderStatusStyle{
    color: #FF5C5C!important;
  }
.buyingRecord{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  .record-history{
    margin-top: 9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .history-item{
      width: 335px;
      height: 125px;
      margin-top:15px;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 2px rgba(211,211,211,0.31);
      border-radius: 6px;
      .history-header{
        margin-top: 15px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        span{
          height: 21px;
          line-height: 21px;
        }
        >div{
          display: flex;
          >span:nth-child(1){
            font-size: 15px;
            color: #0F3256;
          }
          >span:nth-child(2){
            margin-left: 10px;
            font-size: 12px;
            color: #A8AEB9
          }
        }
        >span:nth-child(2){
          font-size: 15px;
          color: #3C64EE;
        }
      }
      .history-content{
        padding: 0 30px 16px 30px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        >div{
          display: flex;
          flex-direction: column;
        }
        >div{
          >span{
            display: block;
          }
          >span:nth-child(1){

            line-height: 28px;
            font-size: 20px;
            color: #0F3256;
          }
          >span:nth-child(2){
            height: 17px;
            margin-top: 8px;
            line-height: 17px;
            text-align: center;
            font-size: 12px;
            color: #A8AEB9;
          }
        }
        >div:nth-child(2){
          >span:nth-child(1){
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
