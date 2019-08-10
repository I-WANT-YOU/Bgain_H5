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
    label: '驾驶证',
    value: 'DRIVER_LICENSE',
  },
  {
    label: '护照',
    value: 'PASSPORT',
  },
];
