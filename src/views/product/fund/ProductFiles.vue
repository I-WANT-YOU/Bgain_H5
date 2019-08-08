<template>
  <div class="product-files">
    <BgainNavBar class="product-files-header" title="产品说明" />
    <div class="product-files-con">
      <Tabs
        class="tabs"
        title-active-color="#3c64ee"
        title-inactive-color="#0F3256"
        line-width="90"
        color="#3c64ee"
        line-height="2"
        :swipeable="true"
        @click="switchTab"
      >
        <Tab class="tab" title="团队介绍">
          <div class="team">
            <img :src="option.png_url" alt />
            <span>{{option.team_name}}</span>
          </div>
          <div class="team-introduction con">{{option.team_introduction}}</div>
        </Tab>
        <Tab class="tab" title="管理人介绍">
          <div class="administrator">
            <img class="administrator-logo" :src="option.administrator_logo" alt />
            <div class="administrator-name">{{option.administrator}}</div>
          </div>
          <div
            class="administrator-describe con"
          >{{option.administrator_describe}}</div>
        </Tab>
        <Tab class="tab" title="策略说明">
          <div class="con">{{option.policy_explain}}</div>
        </Tab>
        <Tab class="tab" title="托管说明">
          <div class="con">{{option.deposit_explain}}</div>
        </Tab>
        <Tab class="tab" title="实盘业绩">
          <div class="con"></div>
          <div class="echarts">
            <div class="my-echarts" ref="echarts" style="width: 334px;height: 160px;" />
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { Tab, Tabs } from 'vant';
import echarts from 'echarts';
import { mapActions, mapState, mapGetters } from 'vuex';
import { echartsOption } from './formatFundData';

export default {
  name: 'ProductFiles',
  components: {
    BgainNavBar,
    Tab,
    Tabs,
  },
  data() {
    return {
      option: {},
    };
  },
  mounted() {
    this.getFundInformation(this.$route.query.productId).then(() => {
      this.option = this.fundInformation;
    });
  },
  computed: {
    ...mapState('product/fund', ['fundInformation']),
    ...mapGetters('product/fund', ['fundNav']),
  },
  methods: {
    ...mapActions('product/fund', ['getFundInformation']),
    setEcharts(data) {
      this.chart = echarts.init(this.$refs.echarts);

      const X = data.map(item => item.nav_time);
      const series = data.map(item => item.nav);
      const min = Math.min.apply(null, series);
      const max = Math.max.apply(null, series);
      const num = (max - min) * 1.2;

      this.chart.setOption(echartsOption(X, series, min, max, num, false));
    },
    switchTab(name, title) {
      if (title === '实盘业绩') {
        this.$nextTick(() => {
          this.setEcharts(this.fundNav);
        });
      }
    },
  },
};
</script>

<style lang='scss'>
.product-files {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .product-files-con {
    width: 100%;
    flex: 1;
    display: flex;
    [class*="van-hairline"]::after {
      border: 0;
      border-bottom: 1px solid #dddddd;
    }
    .tabs {
      font-size: 14px;
      color: #0f3256;
      letter-spacing: 0;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      .van-tabs__content {
        width: 100%;
        flex: 1;
      }
      .tab {
        width: 100%;
        height: 100%;
        .team {
          display: flex;
          align-items: center;
          height: 74px;
          box-sizing: border-box;
          border-bottom: 1px dashed #dddddd;
          margin: 0 16px;
          font-size: 14px;
          color: #0f3256;
          letter-spacing: 0;
          img {
            width: 40px;
            height: 40px;
            margin-right: 15px;
          }
        }
        .administrator {
          display: flex;
          align-items: center;
          border-bottom: 1px dashed #dddddd;
          height: 95px;
          margin: 0 16px;
          .administrator-logo {
            width: 55px;
            height: 55px;
            margin-right: 17px;
            border-radius: 50%;
          }
          .administrator-name {
            font-size: 14px;
            color: #0f3256;
            letter-spacing: 0;
          }
        }
        .con {
          margin: 20px 19px 0 20px;
          font-size: 14px;
          color: #6a707d;
          letter-spacing: 0;
          line-height: 26px;
          white-space: pre-wrap;
        }
        .echarts {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
