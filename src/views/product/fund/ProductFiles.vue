<template>
  <div class="product-files">
    <BgainNavBar class="product-files-header" title="基金档案" />
    <div class="product-files-con">
      <Tabs
        class="tabs"
        title-active-color="#3c64ee"
        title-inactive-color="#0F3256"
        line-width="90"
        color="#3c64ee"
        line-height="2"
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
          <div class="administrator-describe con">{{option.administrator_describe}}</div>
        </Tab>
        <Tab class="tab" title="策略说明">
          <div class="con">{{option.policy_explain}}</div>
        </Tab>
        <Tab class="tab" title="托管说明">
          <div class="con">{{option.deposit_explain}}</div>
        </Tab>
        <Tab class="tab" title="实盘业绩">
          <div class="con">{{option.firm_performance}}</div>
          <div v-if="showEcharts" class="echarts">
            <div class="echarts-title">
              <div>日期{{formatDate(chart_x)}}</div>
              <div>
                单位净值
                <span class="echarts-title-nav">{{strip(chart_y)}}</span>
              </div>
            </div>
            <div class="my-echarts" ref="echarts" />
            <div class="echarts-time">
              <div>{{formatDate(oldDate)}}</div>
              <div>{{formatDate(newDate)}}</div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { head, last } from 'lodash';
import { Tab, Tabs } from 'vant';
import echarts from 'echarts';
import { mapActions, mapState, mapGetters } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import { formatDate, strip } from '@utils/tools';
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
      oldDate: new Date() * 1,
      newDate: new Date() * 1,
      chart_y: '1',
      chart_x: new Date() * 1,
    };
  },
  async mounted() {
    await this.getFundInformation(this.$route.query.productId);
    this.option = this.fundInformation;
  },
  computed: {
    ...mapState('product/fund', ['fundInformation']),
    ...mapGetters('product/fund', ['fundNav']),
    showEcharts() {
      if (this.fundNav[0] && this.fundNav[0].nav_time !== 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions('product/fund', ['getFundInformation']),
    setEcharts(data) {
      this.chart = echarts.init(this.$refs.echarts);

      const X = data.map(item => item.nav_time);
      const series = data.map(item => item.nav);
      const min = Math.min.apply(null, series);
      const max = Math.max.apply(null, series);
      const num = (max - min) * 0.3;
      // 底部日期
      this.oldDate = head(X);
      this.newDate = last(X);
      this.chart_y = last(series);

      this.chart.getZr().on('mousemove', this.onMouseMove);

      this.chart.setOption(echartsOption(X, series, min, max, num));
    },
    onMouseMove(params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);
      if (this.chart.containPixel('grid', pointInPixel)) {
        this.chart_x = this.chart.getOption().xAxis[0].data[pointInGrid[0]];
        this.chart_y = this.fundNav.filter(item => item.nav_time === this.chart_x)[0].nav;
      }
    },
    switchTab(name, title) {
      if (title === '实盘业绩' && this.showEcharts) {
        this.$nextTick(() => {
          this.setEcharts(this.fundNav);
        });
      }
    },
    formatDate(time) {
      return formatDate(time, 'YYYY/MM/DD');
    },
    strip(num) {
      return strip(num * 1, 5);
    },
  },
};
</script>

<style lang='scss'>
.product-files {
  width: 100%;
  display: flex;
  flex-direction: column;
  .product-files-con {
    width: 100%;
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
          flex-direction: column;
          font-size: 12px;
          color: #9aa2b2;

          .echarts-title,
          .echarts-time {
            margin: 10px 0;
            box-sizing: border-box;
            padding: 0 10px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .echarts-title-nav {
              color: #3c64ee;
            }
          }

          .my-echarts {
            width: 334px;
            height: 160px;
          }
        }
      }
    }
  }
}
</style>
