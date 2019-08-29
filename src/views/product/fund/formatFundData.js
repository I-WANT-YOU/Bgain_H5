import dayjs from 'dayjs';
import { strip } from '@utils/tools';

export const fundProductTypeList = [
  { type: 'SmartBeta', value: '指数增强' },
  { type: 'CTA', value: 'CTA' },
  { type: 'Arbitrage', value: '套利' },
  { type: 'HighFrequency', value: '高频' },
  { type: 'MixedStrategies', value: '混合' },
];
export const riskLevelTypeList = [
  { type: 'R1_LOW_RISK', value: 'R1' },
  { type: 'R2_MEDIUM_LOW_LEVEL', value: 'R2' },
  { type: 'R3_MEDIUM_LEVEL', value: 'R3' },
  { type: 'R4_MEDIUM_HIGH_LEVEL', value: 'R4' },
  { type: 'R5_HIGH_LEVEL', value: 'R5' },
];

// 基金类型
export const formatType = (data) => {
  switch (data.fund_product_type) {
    case 'SmartBeta':
      data.fund_product_type = '指数型';
      break;
    case 'Arbitrage':
      data.fund_product_type = '套利';
      break;
    case 'HighFrequency':
      data.fund_product_type = '高频';
      break;
    case 'MixedStrategies':
      data.fund_product_type = '混合';
      break;
    case 'CTA':
      data.fund_product_type = 'CTA';
      break;
    default:
      break;
  }
  return data;
};

export const formatType2 = (type) => {
  switch (type) {
    case 'SmartBeta':
      type = '指数型';
      break;
    case 'Arbitrage':
      type = '套利';
      break;
    case 'HighFrequency':
      type = '高频';
      break;
    case 'MixedStrategies':
      type = '混合';
      break;
    case 'CTA':
      type = 'CTA';
      break;
    default:
      break;
  }
  return type;
};

// 风险等级
export const formatRiskText = (data) => {
  switch (data.risk_level_type) {
    case 'R1_LOW_RISK':
      data.risk_level_type = 'R1低风险';
      break;
    case 'R2_MEDIUM_LOW_LEVEL':
      data.risk_level_type = 'R2中低风险';
      break;
    case 'R3_MEDIUM_LEVEL':
      data.risk_level_type = 'R3中风险';
      break;
    case 'R4_MEDIUM_HIGH_LEVEL':
      data.risk_level_type = 'R4中高风险';
      break;
    case 'R5_HIGH_LEVEL':
      data.risk_level_type = 'R5高风险';
      break;
    default:
      break;
  }
  return data;
};

// 风险等级
export const formatRisk = (data) => {
  switch (data.risk_level_type) {
    case 'R1_LOW_RISK':
      data.risk_level_type = 'R1';
      break;
    case 'R2_MEDIUM_LOW_LEVEL':
      data.risk_level_type = 'R2';
      break;
    case 'R3_MEDIUM_LEVEL':
      data.risk_level_type = 'R3';
      break;
    case 'R4_MEDIUM_HIGH_LEVEL':
      data.risk_level_type = 'R4';
      break;
    case 'R5_HIGH_LEVEL':
      data.risk_level_type = 'R5';
      break;
    default:
      break;
  }
  return data;
};

export function echartsOption(X, series, min, max, num, tooltip = true) {
  return {
    grid: {
      left: '11%',
      right: '0%',
      bottom: '5%',
      top: '5%',
    },
    tooltip: {
      show: tooltip,
      showContent: false,
      trigger: 'axis',
    },
    xAxis: {
      show: false,
      type: 'category',
      data: X,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ffffff',
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff',
          fontSize: 8,
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      show: true,
      type: 'value',
      min: strip(min - num, 3),
      max: strip(max * 1 + num, 3),
      // min: strip(min - (max - min) * 1.2, 1),
      // max: strip(max + (max - min) * 1.2, 1),
      axisLabel: {
        show: true,
        textStyle: {
          color: '#a8aeb9',
          fontSize: 8,
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ffffff',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eeeeee',
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [{
      data: series,
      type: 'line',
      symbol: 'none',
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#4770F5',
      },
      areaStyle: {
        origin: 'start',
        opacity: 0.4,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#C6D0F0', // 0% 处的颜色
          }, {
            offset: 1, color: '#ffffff', // 100% 处的颜色
          }],
        },
      },
    }],
  };
}


export default (data) => {
  formatType(data);
  formatRisk(data);
  data.closing_date = dayjs(data.closing_date).format('YYYY-MM-DD hh:mm');
  // 净值 nav_date
  data.nav_date = dayjs(data.nav_date).format('MM-DD');
  // 成立以来 ups_and_downs_week
  return data;
};
