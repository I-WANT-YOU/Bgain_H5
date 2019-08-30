export const languages = [
  { name: '简体中文', value: 'zh-cn' },
  { name: 'English', value: 'en', disabled: true },
];

export const FUND_STATUS = {
  INITIAL: 'INITIAL', // 首发
  OPEN: 'OPEN', // 开放
  CLOSE: 'CLOSE', // 锁定
};

export const AUTH_LEVEL = {
  NEW_USER: 1, // 新用户
  TRADE_PASSWORD: 2, // 已设置交易密码
};

export const DOCUMENT_TYPE = [
  {
    label: '中国大陆身份证',
    value: 'ID',
  },
  {
    label: '驾照',
    value: 'DRIVER_LICENSE',
  },
  {
    label: '护照',
    value: 'PASSPORT',
  },
];

export const TRANSACTION_TYPE = {
  DEPOSIT: '充币',
  WITHDRAWAL: '提币',
  INVITATION: '注册奖励',
  BUY: '认购',
  SELL: '投资回款',
  COMMISSION: '佣金奖励',
  EXPERIENCE_PROFIT: '体验金收益',
  EXPERIENCE_PROFIT_RESET: '体验金收益清零',
  TRANSFER: '转出',
  RECEIVE: '转入',
  INTEREST: '利息收益',
  FBP_BONUS_REG: '注册奖励',
  FBP_BONUS_KYC: '身份认证',
  FBP_BONUS_INIT_DEPOSIT: '首充',
  FBP_BONUS_INIT_BUY: '首投',
  FBP_BONUS_BUY: '认购',
  CURRENT_BUY: '天天赚转入',
  CURRENT_SELL: '天天赚转出',
  FBP_PRIZEPOOL_BUY: '活动消耗',
  PRIZEPOOL_PROFIT: '活动奖金',
  FUND_BUY: '认购基金',
  FUND_SELL: '赎回基金',
  FBP_FUNDING_HOLDING: '基金奖励',
  FUND_BUY_CANCEL: '认购撤单',
  ACTIVITY_BONUS_REG: '注册奖励',
  ACTIVITY_BONUS_KYC: '身份认证奖励',
  ACTIVITY_BONUS_FIRST_DEPOSIT: '首充奖励',
  ACTIVITY_BONUS_BUY: '投资奖励',
  ACTIVITY_INVITED_BUY: '活动奖励',
  OTC_BUY: '买币',
  FBP_SUBSCRIBE: '积分消耗',
  FBP_BONUS_INVITED_REGISTER: '邀友注册',
  FBP_MEMBERSHIP_SIGN: '每日签到',
  ACTIVITY_REWARD_GGL: '活动奖励',
};

export const TRANSACTION_TYPE_PLUS = [
  'DEPOSIT',
  'SELL',
  'INVITATION',
  'COMMISSION',
  'EXPERIENCE_PROFIT',
  'INTEREST',
  'RECEIVE',
  'FBP_BONUS_REG',
  'FBP_BONUS_KYC',
  'FBP_BONUS_INIT_DEPOSIT',
  'ACTIVITY_REWARD_GGL',
  'FBP_BONUS_INIT_BUY',
  'FBP_BONUS_BUY',
  'CURRENT_SELL',
  'PRIZEPOOL_PROFIT',
  'FUND_SELL',
  'FBP_FUNDING_HOLDING',
  'FUND_SELL',
  'FUND_BUY_CANCEL',
  'ACTIVITY_BONUS_REG',
  'ACTIVITY_BONUS_KYC',
  'ACTIVITY_BONUS_FIRST_DEPOSIT',
  'ACTIVITY_BONUS_BUY',
  'ACTIVITY_INVITED_BUY',
  'OTC_BUY',
  'FBP_BONUS_REG',
  'FBP_BONUS_KYC',
  'FBP_BONUS_INIT_DEPOSIT',
  'FBP_BONUS_INIT_BUY',
  'FBP_BONUS_BUY',
  'FBP_BONUS_INVITED_REGISTER',
  'FBP_MEMBERSHIP_SIGN',
  'FBP_FUNDING_HOLDING',
  'RECEIVE',
  'SELL',
];
