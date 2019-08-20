<template>
  <div class="refer-rules">
    <BgainNavBar title="规则说明" />
    <div class="refer-wrap">
      <div class="con">
        <div class="title-icon">
          <img class="img" src="../../assets/images/member/Bitmap.svg" />
        </div>
        <div class="reward1">
          <div class="title">奖励一</div>
          <div class="line">好友注册，得0.5 USDT</div>
          <div class="text">邀请好友注册成为Bgain用户，每邀请一位，您将获得0.5个USDT (每个用户最高可得5个USDT)</div>
        </div>
        <div class="reward2">
          <div class="title">奖励二</div>
          <div class="line">
            好友理财，最高可的好友收益的
            <span class="tip">20</span>%
          </div>
          <div class="table">
            <div class="head">
              <div>投资累计</div>
              <div>佣金奖励</div>
            </div>
            <div class="body">
              <div class="one">
                <div>
                  <div>好友成功投资，每</div>
                  <div>笔获益后</div>
                </div>
                <div>
                  <div>好友收益利息</div>
                  <div>5%</div>
                </div>
              </div>
              <div class="two">
                <div>
                  <div>好友投资累计超(含)</div>
                  <div>10000 USDT</div>
                </div>
                <div>
                  <div>好友收益利息</div>
                  <div>10%</div>
                </div>
              </div>
              <div class="one">
                <div>
                  <div>好友投资累计超(含)</div>
                  <div>50000 USDT</div>
                </div>
                <div>
                  <div>好友收益利息</div>
                  <div>15%</div>
                </div>
              </div>
              <div class="two">
                <div>
                  <div>好友投资累计超(含)</div>
                  <div>100000 USDT</div>
                </div>
                <div>
                  <div>好友收益利息</div>
                  <div>20%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reminder">
        <div>温馨提示</div>
        <div>Bgain为回馈社区，让每位Bgain用户都可享受</div>
        <div>活动权益，邀请好友请务必提醒好友填写邀请码</div>
        <div>本活动最终解释权归Bgain所有</div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import errorMessage from '../../constants/responseStatus';

const { mapActions } = createNamespacedHelpers('user');

export default {
  name: 'ReferRules',
  components: {
    BgainNavBar,
  },
  async mounted() {
    try {
      await this.getUserSummary();
    } catch (error) {
      if (error.status) {
        Toast(errorMessage[error.status]);
      } else {
        Toast('网络故障');
      }
    }
  },
  methods: {
    ...mapActions(['getUserSummary']),
  },
};
</script>

<style lang="scss" scoped>
.refer-rules {
  .refer-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 69px 19px 0;
    background: url("../../assets/images/member/refer-bg.png");
    background-size: 100% 100%;
    .con {
      width: 340px;
      background: #fffced;
      border-radius: 6px;
      letter-spacing: 0;
      color: #fa6534;
      padding: 0 18px 36px;
      box-sizing: border-box;
      margin-bottom: 34px;
      .title-icon {
        display: flex;
        justify-content: center;
        margin-top: -47px;
        .img {
          width: 122px;
          height: 79px;
        }
      }
      .reward1 {
        padding-bottom: 21px;
        border-bottom: 1px dashed #fa6d34;
        margin-bottom: 30px;
        .title {
          font-size: 24px;
          text-align: center;
          margin-top: 15px;
          font-weight: 600;
        }
        .line {
          font-size: 20px;
          text-align: center;
          margin-top: 9px;
          font-weight: 600;
        }
        .text {
          font-size: 13px;
          text-align: center;
          line-height: 24px;
          margin-top: 15px;
        }
      }
      .reward2 {
        .title {
          font-size: 24px;
          text-align: center;
          font-weight: 600;
        }
        .line {
          font-size: 16px;
          text-align: center;
          margin-top: 10px;
          font-weight: 600;
          margin-bottom: 10px;
          .tip {
            font-size: 26px;
          }
        }
        .table {
          width: 100%;
          border: 1px solid #fa6d34;
          border-bottom: 0;
          color: #fa6d34;
          font-size: 13px;
          .head {
            width: 100%;
            background: #fa6d34;
            color: #ffffff;
            display: flex;
            height: 30px;
            line-height: 30px;
            text-align: center;
            > div {
              flex: 1;
            }
          }
          .body {
            background: #fffced;
            .one,
            .two {
              display: flex;
              align-items: center;
              height: 47px;
              border-bottom: 1px solid #fa6d34;
              > div {
                flex: 1;
                height: 100%;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                &:nth-child(1) {
                  border-right: 1px solid #fa6d34;
                }
              }
            }
            .two {
              background: #ffedd5;
            }
          }
        }
      }
    }
    .reminder {
      font-size: 14px;
      color: #fdcdb5;
      letter-spacing: 0;
      text-align: center;
      line-height: 24px;
      margin-bottom: 54px;
    }
  }
}
</style>
