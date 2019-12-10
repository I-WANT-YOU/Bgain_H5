<template>
  <div class="sell-result">
    <BgainNavBar title="赎回结果" />
    <div class="sell-result-con">
      <div v-if="success" class="success">
        <svg-icon icon-class="sell-success" class="icon" />
        <div class="info">
          <div>您的赎回申请已提交</div>
          <div class="num">赎回份额 {{currentData.share}}份</div>
          <div class="reminder">该交易成功与否以平台确认结果为准，请及时关注消息通知</div>
        </div>
        <div class="steps">
          <div class="step">
            <svg-icon class="step-icon" icon-class="step" />
          </div>
          <div class="step-text">
            <div class="step-x active">
              <div>冻结基金份额，提交赎回申请</div>
              <div>{{currentData.createDate}}</div>
            </div>
            <div class="step-x">
              <div>确定赎回，扣减基金份额</div>
              <div>{{currentData.endDate}}</div>
            </div>
            <div class="step-x">
              <div>赎回资金到账</div>
              <div>预计{{currentData.lastDate}}前</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="fail">
        <svg-icon icon-class="sell-fail" class="icon" />
        <div class="text">提交失败</div>
        <div class="info">失败原因: 开放交易日已截止</div>
      </div>
      <div class="buttons">
        <BgainButton @click="onSubmit" class="button" type="info">完成</BgainButton>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import BgainButton from '@component/BgainButton.vue';
import dayjs from 'dayjs';
// import { formatDate } from '@utils/tools';

export default {
  name: 'SellResult',
  components: {
    BgainNavBar,
    BgainButton,
  },
  data() {
    return {
      currentData: {}, // 结果页面数据
      success: false,
    };
  },
  mounted() {
    if (this.$route.query.data) {
      const currentData = JSON.parse(this.$route.query.data);
      this.currentData = {
        share: currentData.shares, // 赎回份额
        createDate: dayjs(currentData.submit_date).format('YYYY-MM-DD HH:mm:ss'), // 订单创建时间
        endDate: dayjs(currentData.confirm_date).format('YYYY-MM-DD HH:mm:ss'),
        lastDate: dayjs(currentData.fund_back_date).format('YYYY-MM-DD HH:mm:ss'),
      };
      this.success = this.$route.query.success;
    }
  },
  methods: {
    onSubmit() {
      this.$router.push('/mine/fund');
    },
  },
};
</script>

<style lang='scss' scoped>
.sell-result {
  .sell-result-con {
    width: 100%;
    .success {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 100px;
        height: 94px;
        margin: 19px 0 13px;
      }
      .info {
        font-size: 18px;
        color: #0f3256;
        text-align: center;
        .num {
          font-size: 14px;
          color: #777777;
          margin: 8px 0 20px;
        }
        .reminder {
          font-size: 12px;
          color: #a8aeb9;
        }
      }
      .steps {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding-left: 20px;
        .step {
          .step-icon {
            height: 145px;
            width: 20px;
            margin: 22px 0 35px 18px;
          }
        }
        .step-text {
          box-sizing: border-box;
          margin-left: 25px;
          padding-top: 24px;
          font-size: 12px;
          color: #a8aeb9;
          letter-spacing: 0;
          .step-x {
            margin-bottom: 35px;
            &:nth-child(3) {
              margin-bottom: 0;
            }
            &.active {
              color: #6a707d;
            }
          }
        }
      }
    }
    .fail {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 55px;
      .icon {
        width: 117px;
        height: 111px;
        margin: 60px 0 29px;
      }
      .text {
        font-size: 20px;
        color: #0f3256;
        text-align: center;
        line-height: 28px;
        margin-bottom: 9px;
      }
      .info {
        font-size: 14px;
        color: #a8aeb9;
      }
    }
    .buttons {
      width: 100%;
      display: flex;
      align-items: center;
      justify-items: center;
      box-sizing: border-box;
      padding: 0 20px;
      margin-top: 5px;
      .button {
        width: 100%;
      }
    }
  }
}
</style>
