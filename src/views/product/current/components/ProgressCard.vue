<template>
  <div class="progress-card__container">
    <Progress
      :show-pivot="false"
      :percentage="percentage"
      color="#D4D4D4"
    />
    <div class="progress-card__text">
      <span>{{leftText}}</span>
      <span>{{rightText}}</span>
    </div>
  </div>
</template>

<script>
import { Progress } from 'vant';

export default {
  name: 'ProgressCard',
  components: {
    Progress,
  },
  props: {
    percentage: {
      type: Number,
      required: true,
    },
    leftText: {
      type: String,
      required: true,
    },
    rightText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .progress-card__container {

    .van-progress {
      height: 15px;
      background: #F5F5F5;
      border-radius: 0;
    }

    .progress-card__text {
      display: flex;
      justify-content: space-between;
      padding: 8px 11px 10px;


      span {
        font-size: 12px;
        color: #999999;
      }
    }

    &:first-child {
      .van-progress {
        :first-child {
          background: linear-gradient(-90deg, #783FF8 26%, #4776F7 100%) !important;
        }
      }
      .progress-card__text {
        span {
          color: #3C64EE;
        }
      }
    }
  }
</style>
