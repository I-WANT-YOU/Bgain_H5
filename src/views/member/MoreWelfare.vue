<template>
  <div class="more">
    <BgainNavBar title="更多福利" />
    <div class="more-con">
      <img class="info-bg" src="../../assets/images/member/mask.png" alt />
      <div class="getbgp">
        <div class="title">如何获取BGP会员值</div>
        <div class="text">通过购买定期理财产品获得对应BGP外，还可以获得同等数量的BGP会员值，BGP会员值是提升会员等级的唯一标准。</div>
      </div>
      <div class="member">
        <div class="title">会员等级划分</div>
        <img class="member-level" src="../../assets/images/member/member-level-table.png" alt />
        <div class="text">BGP会员值自获取之日起有效期90天，每次回根据用户获取或失效BGP会员值实时计算用户会员等级。</div>
      </div>
      <div class="equity">
        <div class="title">会员权益</div>
        <img class="member-level" src="../../assets/images/member/member-equity-table.png" alt />
        <div class="text">首次获得初级会员及更高级称谓，均可以获得对应的升级大礼包(红包、优惠券等)奖励，升级礼包每个会员等级仅限领一次。</div>
      </div>
      <div class="follow">
        您可以通过关注公众号
        <span class="st">“ Bgain数字资管 ”</span>
        来获取更多会员权益信息
      </div>
    </div>
  </div>
</template>
<script>
import BgainNavBar from '@component/BgainNavBar.vue';

export default {
  name: 'MoreWelfare',
  components: {
    BgainNavBar,
  },
};
</script>
<style lang="scss" scoped>
.more {
  display: flex;
  flex-direction: column;
  .more-con {
    flex: 1;
    .info-bg {
      width: 375px;
      height: 130px;
    }
    .title {
      font-size: 16px;
      color: #333333;
      font-weight: 600;
      padding: 0 24px;
      text-align: left;
    }
    .text {
      padding: 20px 22px 0;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0.2px;
      line-height: 26px;
      text-align: left;
    }
    .getbgp {
      margin-top: 35px;
    }
    .member,
    .equity {
      text-align: center;
      margin-top: 40px;
      .member-level {
        width: 345px;
        height: 211px;
        margin-top: 20px;
      }
    }
    .equity {
      .member-level {
        height: 315px;
      }
    }
    .follow {
      font-size: 14px;
      color: #333333;
      letter-spacing: 0.2px;
      padding: 28px 27px 30px 24px;
      line-height: 26px;
      .st {
        color: #151515;
        font-weight: 600;
      }
    }
  }
}
</style>
