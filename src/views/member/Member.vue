<template>
  <div class="member">
    <nav-bar title="会员权益" />
    <div class="member-con">
      <div class="level">
        <div class="info">
          <div class="text">
            <span>{{levelText}}</span>
            <span
              class="membership_amount"
            >{{option.membershipAmount}}/{{option.nextMinMembershipNum}}</span>
          </div>
          <div>
            <svg-icon class="icon-level" :icon-class="`level${option.memberShipLevel}`" />
          </div>
        </div>
        <div class="progress">
          <Progress :option="option" />
        </div>
      </div>
      <div class="welfare">
        <div class="title">
          <div>会员权益</div>
          <div @click="onSkip" class="more">
            <span>更多福利</span>
            <svg-icon class="icon-next" icon-class="next" />
          </div>
        </div>
        <div class="equitys">
          <div v-for="(item,key) in equitys" :key="key" class="equity">
            <svg-icon :icon-class="item.icon" class="member-icon" />
            <div>{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="others">
        <div class="get">
          <div class="text">快速获取BGP会员值</div>
          <div class="button" @click="onGoFundPage">前往理财</div>
        </div>
        <div class="get">
          <div class="text">邀请好友赚BGP</div>
          <div class="button" @click="onShare">分享好友</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash';
import BgainNavBar from '@component/BgainNavBar.vue';
import { createNamespacedHelpers } from 'vuex';
import Progress from './components/Progress.vue';
import { level, equitys } from './javascript/level';

const { mapActions, mapState } = createNamespacedHelpers('user');

export default {
  name: 'Member',
  components: {
    NavBar: BgainNavBar,
    Progress,
  },
  data() {
    return {
      option: {
        memberShipLevel: 'V1',
        membershipAmount: 0,
        nextMinMembershipNum: 1000,
      },
      levelText: '普通会员',
      equitys: [],
    };
  },
  methods: {
    ...mapActions(['getUserSummary']),
    onSkip() {
      this.$router.push('/more-welfare');
    },
    onGoFundPage() {
    },
    onShare() {
      const inviteCode = get(this.basicInfo, 'invitation_code', '');
      if (inviteCode) {
      }
    },
  },
  computed: {
    ...mapState(['basicInfo']),
  },
  async mounted() {
    this.equitys = equitys;
    try {
      await this.getUserSummary();
      this.option = {
        memberShipLevel: this.basicInfo.member_ship_level,
        membershipAmount: this.basicInfo.membership_amount,
        nextMinMembershipNum: this.basicInfo.next_min_membership_num,
      };
      this.levelText = level.find(item => item.level === this.basicInfo.member_ship_level).text;
    } catch (error) {
      throw error;
    }
  },
};
</script>

<style lang="scss" scoped>
.member {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  .member-con {
    flex: 1;
    .level {
      height: 160px;
      width: 375px;
      background: url("../../assets/images/member/welfare.png");
      background-size: 100% 100%;
      font-size: 14px;
      color: #e0c085;
      .info {
        margin: -2px 20px 6px 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .text {
          font-size: 20px;
          display: flex;
          .membership_amount {
            font-size: 16px;
            margin-left: 10px;
            margin-top: 6px;
          }
        }
        .icon-level {
          width: 62px;
          height: 72px;
        }
      }
      .progress {
        display: flex;
        justify-content: center;
      }
    }
    .welfare {
      background: #ffffff;
      padding-top: 20px;
      margin-bottom: 10px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: #333333;
        margin: 0 20px 0 30px;
        font-weight: 600;
        .more {
          font-size: 12px;
          color: #999999;
          display: flex;
          align-items: center;
          font-weight: 400;
          .icon-next {
            width: 7px;
            height: 14px;
            margin-left: 5px;
          }
        }
      }
      .equitys {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 10px 0 5px;
        .equity {
          width: 33%;
          font-size: 14px;
          color: #666666;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
          .member-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 14px;
          }
        }
      }
    }
    .others {
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 7px 0 10px 0;
      .get {
        width: 345px;
        height: 80px;
        background: url("../../assets/images/member/get.png");
        background-size: 100% 100%;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px 0px 20px;
        box-sizing: border-box;
        .text {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
        }
        .button {
          width: 90px;
          height: 31px;
          line-height: 31px;
          background-image: linear-gradient(270deg, #4e25df 0%, #3c64ee 100%);
          border-radius: 20px;
          font-size: 14px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
}
</style>
