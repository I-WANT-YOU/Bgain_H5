import dayjs from 'dayjs';

// 基金类型
const formatType = (data) => {
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
const formatRisk = (data) => {
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
  // 时间 closing_date
  data.closing_date = dayjs(data.closing_date).format('YYYY-MM-DD hh:mm');
  // 净值 nav_date
  data.nav_date = dayjs(data.nav_date).format('MM-DD');
  // 成立以来 ups_and_downs_week
  data.ups_and_downs_week = data.ups_and_downs_week >= 0 ? `+${data.ups_and_downs_week}` : data.ups_and_downs_week;
  return data;
};
