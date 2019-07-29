<template>
  <div class="product-list">
    <div class="tab-title">
      <div v-for="(text,index) in tabTitle"
           @click="changeUnderLine(index)"
           :class="{underLine:activeLine==index}"
           :key="index"
      >
        <span>{{text}}</span>
      </div>
    </div>
    <div class="tab-content">
       <!--基金涨幅榜-->
      <div v-show="activeLine===0">
        <ul>
          <li class="found-li-title">
            <span>基金名称、策略类型及风险值</span>
            <span>当前净值</span>
            <span>成立以来</span>
          </li>
          <li v-for="(item) in funds" :key="item.id">
            <div class="found-li-style">
              <div>
                <div>{{ item.fund_product_name }}</div>
                <div>
                  <span>{{item.fund_product_type}}</span>
                  <span>{{item.risk_level_type.substring(0,2)}}</span>
                </div>
              </div>
              <div>{{ item.current_nav }}</div>
              <div>
                <span>{{ item.total_ups_and_downs }}</span>
                <div><img alt="." src="../../assets/images/next.svg"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--活期-->
      <div v-show="activeLine===1">
        <ul>
          <li class="current-li-title">
            <span>币种</span>
            <span>利率趋势</span>
            <span>今日年化利率</span>
          </li>
          <li v-for="(item,index) in currents" :key="item.id">
            <div class="current-li-style">
              <div>
                  <span>{{ item.currency_type }}</span>
              </div>
              <div class="my-echarts"
                   :ref="setMyEchart(index)" style="width: 70px;height: 24.1px;">
              </div>
              <div>
                <span>{{ item.today_annualized_interest_rate }}</span>
                <div><img alt="." src="../../assets/images/next.svg"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--定期-->
      <div v-show="activeLine===2">
        <ul>
          <li class="current-li-title">
            <span>币种</span>
            <span>锁定期</span>
            <span>预期年化利率</span>
          </li>
          <li v-for="(item) in fixeds" :key="item.id">
            <div class="current-li-style">
              <div>
                <span>{{ item.currency_type }}</span>
              </div>
              <div>
                <span>{{ item.closed_period }}天</span>
              </div>
              <div>
                <span>{{ item.expected_annual_return }}</span>
                <div><img alt="." src="../../assets/images/next.svg"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { Tab, Tabs } from 'vant';
import { mapActions, mapGetters } from 'vuex';
import echarts from 'echarts';


export default {
  name: 'HomeProductList',
  components: {
  },
  data() {
    return {
      active: 1,
      activeLine: 0,
      tabTitle: [
        '基金涨幅榜',
        '活期',
        '定期',
      ],
    };
  },
  computed: {
    ...mapGetters('home', [
      'announcement',
      'banners',
      'funds',
      'currents',
      'fixeds',
      'isLogin',
      'hasUnreadMessage',
    ]),
  },
  mounted() {
    this.getAllHomeInfo().then(
      () => {
        console.log(this.fixeds);
        let num = 0;
        while (num < this.currents.length) {
          this.initChart(num);
          num += 1;
        }
      },
    );
  },
  methods: {
    // 触发action的方法
    ...mapActions('home', [
      'getAllHomeInfo',
    ]),
    // 设置echart名称
    setMyEchart(index) {
      const myEchart = `myEchart${index}`;
      return myEchart;
    },
    // tab添加下划线
    changeUnderLine(index) {
      this.activeLine = index;
    },
    // 初始化echarts
    initChart(index) {
      const myChart = `myEchart${index}`;
      this.chart = echarts.init(this.$refs[myChart][0]);
      // 把配置和数据放这里
      const option = {
        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '10%',
        },
        xAxis: {
          show: false,
          type: 'category',
          data: this.currents[index],
        },
        yAxis: {
          show: false,
          type: 'value',
          min: Math.min.apply(null, this.currents[index].rates) - 0.2,
          max: Math.max.apply(null, this.currents[index].rates) + 0.2,
        },
        series: [{
          data: this.currents[index].rates,
          type: 'line',
          symbol: 'none',
          smooth: true,
          lineStyle: {
            width: 1,
            color: '#4770F5',
          },
          areaStyle: {
            normal: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4770F5' },
                { offset: 1, color: '#A22AFF' },
              ]),
            },
          },
        },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" >
.product-list{
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
  .tab-title{
    display: flex;
    height: 40px;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    color: #676C8D;
    text-align: center;
    padding: 0 43px;
    border-bottom: 0.5px solid #E5E9F6;
    .underLine{
      >span{
        color: #3C64EE;
        display: inline-block;
        height: 38.5px;
        border-bottom:2px solid #3C64EE;
      }
    }
    >div{
      flex: 1;
      height: 100%;
      line-height: 40px;

    }
    >div:nth-child(1){
      text-align: left;
      >span{
        width: 75px;
      }
    }
    >div:nth-child(2){
      text-align: right;
      >span{
        width: 30px;
        margin-right: 8px;
      }
    }
    >div:nth-child(3){
      text-align: right;
      >span{
        width: 30px;
      }
    }
  }
  .tab-content{
    >div{
      >ul{
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
    .found-li-title{
      display: flex;
      margin: 10px 17px 4px 23px ;
      justify-content: space-between;
      font-size: 11px;
      color: #A8AEB9;
      text-align: center;
    }
    .found-li-style{
      margin-left: 23px;
      margin-right: 17px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 71px;
      border-bottom: 0.5px solid #E5E9F6;
      >div:nth-child(1){
        height: 42px;
        >div{
          text-align: left;
        }
        >div:nth-child(1){
          height: 22px;
          font-size: 15px;
          color: #0F3256;
        }
        >div:nth-child(2){
          height: 17px;
          margin-top: 4px;
          font-size: 12px;
          color: #A8AEB9;
          >span{
            display: inline-block;
            height: 17px;
            line-height: 17px;
            vertical-align: center;
            padding: 0px 3px;
            border: 0.51px solid #C3CCE9;
            border-radius: 2px;
          }
          >span:nth-child(2){
            margin-left: 6px;
          }
        }
      }
      >div:nth-child(2){
        font-size: 15px;
        color: #0F3256;
      }
      >div:nth-child(3){
        font-size: 15px;
        color: #FF5656;
        >span{

        }
        >div{
          margin-left: 10px;
          display: inline-block;
          height: 100%;
          >img{
            width: 7px;
            height: 11px;
          }
        }
      }
    }
    .current-li-title{
      display: flex;
      margin: 10px 35px 4px 23px ;
      justify-content: space-between;
      font-size: 11px;
      color: #A8AEB9;
      text-align: center;
      >span:nth-child(1){
        width: 122px;
        text-align: left;
      }
      >span:nth-child(2){
        width: 70px;
        text-align: center;
      }
      >span:nth-child(3){
        width: 100px;
        text-align: right;
      }
    }
    .current-li-style{
      display: flex;
      height: 49px;
      flex-direction: row;
      margin-left: 23px;
      margin-right: 17px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.5px solid #E5E9F6;
      >div{
        font-size: 15px;
        color: #0F3256;
        text-align: center;
      }
      >div:nth-child(1){
        width: 122px;
        text-align: left;
      }
      >div:nth-child(2){
        width: 70px;
        height: 24px;
        text-align: center;
      }
      >div:nth-child(3){
        width: 118px;
        font-size: 15px;
        color: #FF5656;
        text-align: right;
        >span{

        }
        >div{
          margin-left: 10px;
          display: inline-block;
          height: 100%;
          >img{
            width: 7px;
            height: 11px;
          }
        }
      }
    }
  }

}
</style>
