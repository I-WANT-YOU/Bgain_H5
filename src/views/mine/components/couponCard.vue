<template>
  <div class="coupon-card">
    <div :class="['wrap', ifUse ? '' : 'used']">
      <svg-icon
        :icon-class="statu === '0'
        ? 'coupon-new' : statu === '1'
        ? 'coupon-used' : 'coupon-expired'"
        class="use"
      />
      <div class="num">
        <div>
          <b>{{option.coupon_value * 100}}</b>
          <span>%</span>
        </div>
        <div class="num_text">{{option.coupon_type === 'ABS' ? '本金加息' : '收益加息'}}</div>
      </div>
      <div class="text">
        <div class="title">{{option.coupon_name}}优惠劵</div>
        <div>{{statusText.time}}{{statusText.text}}</div>
        <div class="text-info" @click="onShow">
          <div>
            <span>使用说明</span>
            <svg-icon :icon-class="show ? 'down' : 'mine-pull'" class="icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="info" v-show="show">
      <div class="title">使用说明</div>
      <div class="con">{{option.description}}</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@utils/tools';

export default {
  name: 'Coupon',
  props: {
    ifUse: {
      type: Boolean,
      default: false,
    },
    option: {
      type: Object,
    },
    statu: {
      type: String,
      default: '0',
    },
  },
  methods: {
    onShow() {
      this.show = !this.show;
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    statusText() {
      if (this.statu === '0') {
        return {
          time: formatDate(this.option.end_date),
          text: '前有效',
        };
      }
      if (this.statu === '1') {
        return {
          time: formatDate(this.option.usage_date),
          text: '使用',
        };
      }
      return {
        time: formatDate(this.option.end_date),
        text: '过期',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon-card {
  width: 100%;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
  flex-direction: column;
  .wrap {
    width: 345px;
    display: flex;
    background: url("../../../assets/images/coupon/coupon-use.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .use {
      position: absolute;
      top: 0;
      width: 45px;
      height: 48px;
    }
    &.used {
      background-image: url("../../../assets/images/coupon/coupon-used.png");
    }
    .num {
      margin-left: 23px;
      font-size: 30px;
      color: #333333;
      width: 104px;
      height: 110px;
      padding-top: 31px;
      box-sizing: border-box;
      span {
        font-size: 20px;
        color: #151515;
      }
      .num_text {
        font-size: 13px;
      }
    }
    .text {
      flex: 1;
      font-size: 12px;
      color: #6a707d;
      margin-right: 28px;
      .title {
        margin: 23px 0 9px;
        font-size: 15px;
        color: #0f3256;
      }
      .text-info {
        margin-top: 8px;
        padding-top: 8px;
        &::before {
          content: " ";
          border-top: 1px solid #000000;
          transform: scaleY(0.5);
        }
        > div {
          display: flex;
          align-items: center;
          .icon {
            width: 9px;
            height: 5px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .info {
    width: 340px;
    background: #f5f5f5;
    margin-left: 2.5px;
    font-size: 12px;
    color: #6a707d;
    line-height: 18px;
    padding: 7px 0 23px 12px;
    box-sizing: border-box;
    .title {
      margin-bottom: 10px;
    }
    .con {
      white-space: pre-wrap;
    }
  }
}
</style>
