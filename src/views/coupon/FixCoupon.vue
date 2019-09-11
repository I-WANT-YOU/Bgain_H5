<template>
  <div class="couponList">
   <header class="couponLIst-header">
     <div @click="backToStepTwoWithoutParams"><svg-icon icon-class="back" class="back-icon"/> </div>
     <span  @click="backToStepTwoWithParams">确定</span>
   </header>
    <div class="coupons">
      <van-check-group v-model="result" :max="1">
        <div class="coupon-item" v-for="(item,index) in availabelCoupons"
             :key="index">
          <div class="coupon-back">
            <div class="coupon-num">
              <span>{{item.coupon_value}}%</span>
              <span>收益加息</span>
            </div>
            <div class="couponInfo">
              <span>{{item.min_usage_limit}}&nbsp;{{item.currency_type}}&nbsp;起投</span>
              <span>
                最高限额{{item.max_usage_limit}}&nbsp;{{item.currency_type}}
              </span>
              <span>{{createDate(item.end_date)}}前有效</span>
            </div>
          </div>
          <van-check  :key="index"
                      :name="index" class="radio-style" @click="changeCheckResult(index,item.id)"/>
        </div>
      </van-check-group>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { Checkbox, CheckboxGroup, Toast } from 'vant';
import Vue from 'vue';
import { mapState } from 'vuex';
import PublicMethods from '@utils/publicMethods';
// import errorMessage from '../../constants/responseStatus';

Vue.use(Toast);
export default {
  name: 'FixCoupon',
  data() {
    return {
      result: [],
      couponId: '',
    };
  },
  components: {
    'van-check-group': CheckboxGroup,
    'van-check': Checkbox,
  },
  computed: {
    ...mapState('product/fixed', [
      'availabelCoupons',
    ]),
  },
  methods: {

    // 选择优惠券返回上一页
    backToStepTwoWithoutParams() {
      if (this.result[0] === -1) {
        this.$emit('couponData', 'cancel');
      } else {
        this.$emit('couponData', 'none');
      }
    },
    backToStepTwoWithParams() {
      window._czc.push(['_trackEvent', 'click', '定期盈-优惠券-确定']);
      if (this.result[0] === -1) {
        Toast('请选择优惠券');
      } else {
        this.$emit('couponData', this.result[0]);
      }
    },

    // 改变check状态
    changeCheckResult(state, couponId) {
      if (this.result[0] === state) {
        this.$set(this.result, 0, -1);
        this.couponId = '';
      } else {
        this.$set(this.result, 0, state);
        this.couponId = couponId;
      }
    },

    // 格式化时间
    createDate(date) {
      return PublicMethods.createOrderDate(date);
    },
  },
  mounted() {
    if (sessionStorage.getItem('couponData') || sessionStorage.getItem('couponData') === '0') {
      this.$set(this.result, 0, parseInt(sessionStorage.getItem('couponData'), 10));
    }
  },
  beforeDestroy() {
    Toast.clear();
  },
};
</script>

<style lang="scss" >
.couponList{
  position: fixed;
  top: 0;
  width: 100%;
  min-height:100vh ;
  background: white;
  z-index: 100;
  .couponLIst-header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div:nth-child(1){
      padding:0 35px 0 15px;
      display: flex;
      align-items: center;
      .back-icon{
        width: 9.5px;
        height: 18px;
      }
    }
    >div:nth-child(2){
      font-size: 18px;
      color: #000000;
      line-height: 17px;
    }
    >span{
      padding: 0 15px;
      font-size: 15px;
      line-height: 20px;
    }

  }
  font-family: PingFangSC-Semibold sans-serif;
  .coupons{
    margin-top:17.5px;
    .coupon-item{
      display: flex;
      margin-bottom: 17px;
      .coupon-back{
        width: 310px;
        height: 100px;
        margin:0 10px 0 19px;
        display: flex;
        background: url("../../assets/images/fixedDetail/coupon_yellow.svg") no-repeat;
        background-size: 310px 100%;
        .coupon-num{
          width: 82px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 19px;
          >span:nth-child(1){
            font-size: 24px;
            color: #333333;
            line-height: 33px;
          }
          >span:nth-child(2){
            font-size: 13px;
            color: #333333;
            line-height: 18px;
          }
        }
        .couponInfo{
          width: 228px;
          padding-left: 37px;
          display: flex;
          flex-direction: column;
          >span{
            font-size: 13px;
            color: #333333;
            line-height: 18px;
          }
          >span:nth-child(1){
            margin-top:17px;
            margin-bottom: 2px;
          }
          >span:nth-child(3){
            font-size: 12px;
            color: #999999;
            margin-top: 10px;
          }
        }
      }
      .radio-style{
        .van-icon{
          border:#000000 solid 1px!important;
        }
        .van-checkbox__icon--checked{
          i{
            border: #ffffff solid 1px!important;
          }
        }
      }

    }
  }
}
</style>
