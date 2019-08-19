export function formatTransactionType(option) {
  switch (option.transaction_type) {
    case 'DEPOSIT':
      option.transaction_type = '充币';
      break;
    case 'WITHDRAWAL':
      option.transaction_type = '提币';
      break;
    case 'INVITATION':
      option.transaction_type = '注册奖励';
      break;
    case 'BUY':
      option.transaction_type = '认购';
      break;
    case 'SELL':
      option.transaction_type = '投资回款';
      break;
    case 'COMMISSION':
      option.transaction_type = '佣金奖励';
      break;
    case 'EXPERIENCE_PROFIT':
      option.transaction_type = '体验金收益';
      break;
    case 'EXPERIENCE_PROFIT_RESET':
      option.transaction_type = '体验金收益清零';
      break;
    case 'TRANSFER':
      option.transaction_type = '转出';
      break;
    case 'RECEIVE':
      option.transaction_type = '转入';
      break;
    case 'INTEREST':
      option.transaction_type = '利息收益';
      break;
    case 'FBP_BONUS_REG':
      option.transaction_type = '注册奖励';
      break;
    case 'FBP_BONUS_KYC':
      option.transaction_type = '身份认证';
      break;
    case 'FBP_BONUS_INIT_DEPOSIT':
      option.transaction_type = '首充';
      break;
    case 'FBP_BONUS_INIT_BUY':
      option.transaction_type = '首投';
      break;
    case 'OTC_BUY':
      option.transaction_type = '买币';
      break;
    case 'FBP_BONUS_BUY':
      option.transaction_type = '认购';
      break;
    case 'FBP_BONUS_INVITED_REGISTER':
      option.transaction_type = '邀友注册';
      break;
    case 'FBP_PRIZEPOOL_BUY':
      option.transaction_type = '活动消耗';
      break;
    case 'FBP_MEMBERSHIP_SIGN':
      option.transaction_type = '每日签到';
      break;
    case 'FBP_FUNDING_HOLDING':
      option.transaction_type = '基金奖励';
      break;
    case 'FBP_SUBSCRIBE':
      option.transaction_type = '积分消耗';
      break;
    case 'CURRENT_BUY':
      option.transaction_type = '活期购买';
      break;
    case 'CURRENT_SELL':
      option.transaction_type = '活期转出';
      break;
    case 'FUND_BUY':
      option.transaction_type = '基金申购';
      break;
    case 'FUND_SELL':
      option.transaction_type = '基金赎回';
      break;
    case 'FUND_BUY_CANCEL':
      option.transaction_type = '基金购买撤单';
      break;
    case 'PRIZEPOOL_PROFIT':
      option.transaction_type = '奖池收益';
      break;
    case 'LOAN':
      option.transaction_type = '备付金账户转出';
      break;
    case 'CMS_WITHDRAWAL':
      option.transaction_type = 'cms转出';
      break;
    case 'FUND_SELL_CANCEL':
      option.transaction_type = '基金赎回撤单';
      break;
    case 'FBP_BONUS_INIT_OTC':
      option.transaction_type = '首次买币';
      break;
    case 'FBP_CONVERT':
      option.transaction_type = '兑换';
      break;
    case 'ACTIVITY_BONUS_REG':
      option.transaction_type = '注册奖励';
      break;
    case 'ACTIVITY_BONUS_KYC':
      option.transaction_type = '身份认证奖励';
      break;
    case 'ACTIVITY_BONUS_FIRST_DEPOSIT':
      option.transaction_type = '首充奖励';
      break;
    case 'ACTIVITY_BONUS_BUY':
      option.transaction_type = '投资奖励';
      break;
    case 'ACTIVITY_INVITED_BUY':
      option.transaction_type = '邀友投资奖励';
      break;
    default:
  }
  return option;
}
export function formatAmount(option) {
  if (option.transaction_type === 'DEPOSIT'
  || option.transaction_type === 'SELL'
  || option.transaction_type === 'INVITATION'
  || option.transaction_type === 'COMMISSION'
  || option.transaction_type === 'EXPERIENCE_PROFIT'
  || option.transaction_type === 'INTEREST'
  || option.transaction_type === 'RECEIVE'
  || option.transaction_type === 'FBP_BONUS_REG'
  || option.transaction_type === 'FBP_BONUS_KYC'
  || option.transaction_type === 'FBP_BONUS_INIT_DEPOSIT'
  || option.transaction_type === 'FBP_BONUS_INIT_BUY'
  || option.transaction_type === 'FBP_BONUS_BUY'
  || option.transaction_type === 'CURRENT_SELL'
  || option.transaction_type === 'PRIZEPOOL_PROFIT'
  || option.transaction_type === 'FBP_FUNDING_HOLDING'
  || option.transaction_type === 'FUND_SELL'
  || option.transaction_type === 'FUND_BUY_CANCEL'
  || option.transaction_type === 'ACTIVITY_BONUS_REG'
  || option.transaction_type === 'ACTIVITY_BONUS_KYC'
  || option.transaction_type === 'ACTIVITY_BONUS_FIRST_DEPOSIT'
  || option.transaction_type === 'ACTIVITY_BONUS_BUY'
  || option.transaction_type === 'ACTIVITY_INVITED_BUY'
  || option.transaction_type === 'OTC_BUY'
  || option.transaction_type === 'FBP_BONUS_INVITED_REGISTER'
  || option.transaction_type === 'FBP_MEMBERSHIP_SIGN'
  ) {
    option.amount = `+${option.amount}`;
  } else {
    option.amount = `-${option.amount}`;
  }
  return option;
}

export default {
  formatAmount,
  formatTransactionType,
};
