<template>
  <div class="record">
    <nav-bar title="BGP记录" />
    <div class="tips">
      <span>BGP是Bgain平台激励用户投资行为的奖励</span>
    </div>
    <div class="myBgp">
      <div>
        <div><span>我的BGP</span></div>
        <div @click="toHistory">
          <span>BGP明细</span>
          <svg-icon icon-class="next" class="icon-style"/>
        </div>
      </div>
      <div><span>{{basicInfo.fbp_amt}}</span></div>
    </div>
    <!--交易记录-->
    <div class="trade-history">
      <div class="trade-tile">
        交易记录
      </div>
      <div class="trade-content">
        <div class ="trade-item" v-for="(item,index) in recordList" :key="index"
             @click="toDetail(item.id)"
        >
          <div class="image">
            <vant-image width="86px" height="80px" :src="item.thumbnail_url"/>
          </div>
          <div>
            <div class="basicInfo">
              <span>{{item.integral_product_name}}</span>
              <div>
                <span>x1</span>
                <span>{{item.fbpprice}}积分</span>
              </div>
            </div>
            <div class="deliverInfo">
              <span>{{deliverStatus(item.integral_product_order_status)}}</span>
              <span>{{createOrderDate(item.creat_at)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Toast } from 'vant';
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import PublicMethods from '@utils/publicMethods';
import BgainNavBar from '@/components/BgainNavBar.vue';
import errorMessage from '../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'BGPRecord',
  components: {
    NavBar: BgainNavBar,
    'vant-image': Image,
  },
  computed: {
    ...mapState('user', [
      'basicInfo',
    ]),
    ...mapState('activity', [
      'recordList',
    ]),
  },
  methods: {
    ...mapActions('activity', [
      'getBGPRecord',
    ]),
    // 跳往详情页面
    toDetail(id) {
      this.$router.push({
        name: 'product-result',
        params: {
          orderId: id,
        },
      });
    },

    // 时间格式化
    createOrderDate(date) {
      return PublicMethods.createOrderDate(date);
    },
    // 格式化发放状态
    deliverStatus(status) {
      let orderStatus = '';
      switch (status) {
        case 'HAD_DISTRIBUTED':
          orderStatus = '已发放';
          break;
        case 'WAIT_SEND':
          orderStatus = '代发货';
          break;
        case 'HAD_SEND':
          orderStatus = '已发货';
          break;
        default:
          break;
      }
      return orderStatus;
    },
    // 跳往明细
    toHistory() {
      this.$router.push({
        name: 'BGPDetailList',
      });
    },
  },
  mounted() {
    Toast.loading({
      message: '加载中...',
    });
    this.getBGPRecord().then(
      () => {
        Toast.clear();
        console.log(this.recordList);
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
.record{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  /*提示*/
  .tips{
    height: 30px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    background: #FAF4DC;
    font-size: 12px;
    color: #F79900;
    line-height: 21px;
  }
  /*我的BGP*/
  .myBgp{
    padding:0 20px;
    border-bottom: 10px solid #F8F8F8;;
    >div:nth-child(1){
      display: flex;
      justify-content: space-between;
      border-bottom: 0.51px solid #EEEEEE;
      >div:nth-child(1){
        >span{
          height: 48px;
          line-height: 48px;
          font-size: 15px;
          color: #333333;
        }
      }
      >div:nth-child(2){
        display: flex;
        align-items: center;
        >span{
          font-size: 12px;
          color: #999999;
          line-height: 17px;
          margin-right: 4px;
        }
        .icon-style{
          height:14px;
          width: 14px;
        }

      }
    }
    >div:nth-child(2){
      >span{
        height: 74px;
        line-height: 74px;
        font-size: 32px;
        color: #3C64EE;
      }
    }
  }
  /*交易记录*/
  .trade-history{
    .trade-tile{
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      color: #333333;
      border-bottom: solid 0.51px #EEEEEE;
    }
    .trade-content{
      .trade-item{
        height: 104px;
        margin:0 20px;
        display: flex;
        border-bottom: solid 0.51px #EEEEEE;
        align-items: center;
        .image{
          flex-grow: 0;
        }
        >div{
          display: flex;
          justify-content: space-between;
          flex-grow: 1;
          padding-left:16px ;
        }
        .basicInfo{
          display: flex;
          flex-direction: column;
          justify-content: center;
          >span{
            width: 107px;
            font-size: 13px;
            color: #333333;
            line-height: 18px;
            overflow:hidden; /*超出宽度部分的隐藏*/
            white-space:nowrap; /*文字不换行*/
            text-overflow:ellipsis; /*超出则...代替*/
          }
          >div{
            margin-top:5px;
            display: flex;
            align-items: center;
            >span:nth-child(1){
              font-size: 13px;
              color: #999999;
              line-height: 18px;
              margin-right: 12px;
            }
            >span:nth-child(2){
              font-size: 13px;
              color: #333333;
              line-height: 18px;
            }
          }
        }
        .deliverInfo{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          >span:nth-child(1){
            font-size: 13px;
            color: #3C64EE;
            line-height: 18px;
          }
          >span:nth-child(2){
            margin-top: 6px;
            font-size: 12px;
            color: #999999;
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>
