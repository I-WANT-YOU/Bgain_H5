import dayjs from 'dayjs';

export const fundProductTypeList = [
  { type: 'SmartBeta', value: '指数更强' },
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
      data.fund_product_type = 'CTA';
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
      data.risk_level_type = 'R5';
  }
  return data;
};

export default (data) => {
  formatType(data);
  formatRisk(data);
  data.closing_date = dayjs(data.closing_date).format('YYYY-MM-DD hh:mm');
  // 净值 nav_date
  data.nav_date = dayjs(data.nav_date).format('MM-DD');
  // 成立以来 ups_and_downs_week
  data.ups_and_downs_week = data.ups_and_downs_week >= 0 ? `+${data.ups_and_downs_week}` : data.ups_and_downs_week;
  return data;
};
