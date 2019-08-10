<template>
  <div class="product-list">
    <div class="tab-title">
      <div
        @click="changeUnderLine(0)"
        :class="{underLine:activeLine===0}">
        <span>基金涨幅榜</span>
      </div>
      <div
        @click="changeUnderLine(1)"
        :class="{underLine:activeLine===1}">
        <span>活期</span>
      </div>
      <div
        @click="changeUnderLine(2)"
        :class="{underLine:activeLine===2}">
        <span>定期</span>
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
          <li v-for="(item) in newFunds" :key="item.id">
            <div class="found-li-style">
              <div class="item-one">
                <span>{{ item.fund_product_name }}</span>
                <div>
                  <img :src="initialSrc" v-show="item.status==='INITIAL'">
                  <div>{{item.fund_product_type}}</div>
                  <div>{{item.risk_level_type.substring(0,2)}}</div>
                </div>
              </div>
              <div class="item-two">{{ item.current_nav }}</div>
              <div class="item-three">
                <span>
                  {{item.total_ups_and_downs.substring(0,1)==='-' ?
                  item.total_ups_and_downs: `+${item.total_ups_and_downs}` }}
                </span>
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
              <div>
                <div class="my-echarts"
                     :ref="setMyEchart(index)" style="width: 70px;height: 24.1px;">
                </div>
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
          <li class="fix-li-title">
            <span>币种</span>
            <span>锁定期</span>
            <span>预期年化利率</span>
          </li>
          <li
            v-for="(item) in fixeds"
            :key="item.id"
            @click="stepToFixDetail(item.id)"
          >
            <div class="fix-li-style">
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
import { mapActions, mapGetters } from 'vuex';
import echarts from 'echarts';
import initial from '../../assets/images/home/initial.svg';


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
      initialSrc: initial,
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
    newFunds() {
      let fundList = [];
      const fundInitial = this.funds.filter(item => item.status === 'INITIAL');
      const fundUnInitial = this.funds.filter(item => item.status !== 'INITIAL');
      fundList = fundList.concat(fundInitial);
      fundList = fundList.concat(fundUnInitial);
      return fundList;
    },
  },
  mounted() {
    this.getAllHomeInfo().then(
      () => {
        // 初始化图表
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
    // 跳转到定期详情页面
    stepToFixDetail(id) {
      this.$router.push({
        name: 'FixedDetail',
        params: { id },
      });
    },
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
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '0%',
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
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  .tab-title{
    display: flex;
    height: 28px;
    flex-direction: row;
    align-items:flex-start ;
    font-size: 15px;
    color: #676C8D;
    text-align: center;
    padding: 0 22.5px 0 43px;
    border-bottom: 0.5px solid #E5E9F6;
    .underLine{
        color: #3C64EE;
        display: block;
        border-bottom:2px solid #3C64EE;
    }
    >div{
      width: 75px;
      height: 27px;
    }
    div:nth-child(2){
      margin-left: 54.5px;
      >span{
        width: 30px;
      }
    }
    div:nth-child(3){
      margin-left: 30px;
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
    /*基金涨幅榜*/
    .found-li-title{
      display: flex;
      justify-content: space-between;
      height: 16px;
      margin: 10px 36px 4px 24px ;
      font-size: 11px;
      color: #A8AEB9;
      text-align: center;
      >span:nth-child(1){
        /*width: 168px;*/
        text-align: left;
      }
      >span:nth-child(2){
        /*width: 68px;*/
        text-align: center;
      }
      >span:nth-child(3){
         /*width: 80px;*/
        text-align: right;
       }
    }
    .found-li-style{
      margin:0 17px 0 24px;
      padding:14px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.5px solid #E5E9F6;
      .item-one{
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: flex-start;
        >span:nth-child(1){
          height: 21px;
          line-height: 21px;
          font-size: 15px;
          color: #0F3256;
        }
        >div:nth-child(2){
          display: flex;
          flex-direction: row;
          margin-top: 4px;
          font-size: 12px;
          color: #A8AEB9;
          >div{
            display: inline-block;
            height: 16px;
            margin-right: 6px;
            line-height: 16px;
            vertical-align: center;
            padding: 0px 3px;
            border: 0.51px solid #C3CCE9;
            border-radius: 2px;
          }
          >img{
            display: block;
            width: 26px;
            height: 16px;
            margin-right: 6px;
          }
        }
      }
      .item-two{
        width: 68px;
        font-size: 15px;
        color: #0F3256;
      }
      >div:nth-child(3){
        display: flex;
        justify-content:flex-end;
        font-size: 15px;
        color: #FF5656;
        >span{
          width: 80px;
          text-align: right;
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
    /*活期*/
    .current-li-title{
      display: flex;
      margin: 10px 35px 4px 23px ;
      justify-content: space-between;
      font-size: 11px;
      color: #A8AEB9;
      text-align: center;
      >span:nth-child(1){
        width: 117px;
        text-align: left;
      }
      >span:nth-child(2){
        width: 80px;
        text-align: right;
      }
      >span:nth-child(3){
        width: 95px;
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
        width: 117px;
        text-align: left;
      }
      >div:nth-child(2){
        display: flex;
        justify-content: flex-end;
        width: 80px;
        height: 24px;
        text-align: right;
      }
      >div:nth-child(3){
        width: 113px;
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
    /*定期*/
    .fix-li-title{
      display: flex;
      margin: 10px 35px 4px 22px ;
      justify-content: space-between;
      font-size: 11px;
      color: #A8AEB9;
      text-align: center;
      >span:nth-child(1){
        width: 144px;
        text-align: left;
      }
      >span:nth-child(2){
        width: 74px;
        text-align: center;
      }
      >span:nth-child(3){
        width: 103.5px;
        text-align: right;
      }
    }
    .fix-li-style{
      display: flex;
      height: 49px;
      flex-direction: row;
      margin-left: 22px;
      margin-right: 17px;
      align-items: center;
      border-bottom: 0.5px solid #E5E9F6;
      >div{
        height: 22px;
        font-size: 15px;
        color: #0F3256;
        text-align: center;
      }
      >div:nth-child(1){
        width: 144px;
        text-align: left;
      }
      >div:nth-child(2){
        display: flex;
        justify-content: center;
        width: 74px;
        height: 24px;
      }
      >div:nth-child(3){
        display: flex;
        justify-content: flex-end;
        width: 121px;
        font-size: 15px;
        color: #FF5656;
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
