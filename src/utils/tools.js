import _ from 'lodash';
import dayjs from 'dayjs';
import { Toast } from 'vant';

// 处理数字精度
export const strip = (num, precision = 12) => +parseFloat(num.toPrecision(precision));

// 获取 URL 的 query
export const getQueryParam = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

// 过滤 Undefined
export const filterUndefined = options => _.omitBy(options, _.isUndefined);

export const formatDate = (date, format = 'YYYY-MM-DD HH:mm') => dayjs(date).format(format);

export const checkEmailFormat = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  return re.test(email);
};

export const checkPhoneNumberFormat = (phone) => {
  const re = /^[0-9]{1,15}$/;
  return re.test(phone);
};

export const checkIdNumberFormat = (idNumber) => {
  const re = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
  return re.test(idNumber);
};

export const checkPassportFormat = (passport) => {
  const re = /^[A-Za-z0-9]{1,10}$/;
  return re.test(passport);
};

export const checkDrivingLicenseFormat = (license) => {
  const re = /^[A-Za-z0-9]{1,20}$/;
  return re.test(license);
};

// 验证kyc证件号
export const checkDocumentNumber = (type, docNumber) => {
  const variations = {
    ID: checkIdNumberFormat,
    PASSPORT: checkPassportFormat,
    // DRIVING_LICENSE: checkDrivingLicenseFormat,
    DRIVER_LICENSE: checkDrivingLicenseFormat,
  };
  return variations[type] && variations[type].call(this, docNumber);
};

export const getDesensitizedUsername = (username) => {
  if (!username || !_.isString(username)) return '';
  if (checkEmailFormat(username)) {
    // if (username.indexOf('@') <= 1) {
    //   return username;
    // }
    if (username.slice(0, username.indexOf('@')).length <= 3) {
      return `${username.substr(0, 1)}****${username.substr(
        username.indexOf('@'),
      )}`;
    }
    return `${username.substr(0, 3)}****${username.substr(
      username.indexOf('@'),
    )}`;
  }
  if (checkPhoneNumberFormat(username)) {
    if (String(username).length <= 6) {
      return username;
    }
    return username.replace(/(\d{3})\d*(\d{3})/, '$1****$2');
  }
  return username;
};

export const numberWithThousands = (num = 0) => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

function selectText(textbox, startIndex, stopIndex) {
  // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
  // 选择文本。createTextRange(setSelectionRange)是input方法
  if (textbox.createTextRange) { // ie
    const range = textbox.createTextRange();
    range.collapse(true);
    range.moveStart('character', startIndex);// 起始光标
    range.moveEnd('character', stopIndex - startIndex);// 结束光标
    range.select();// 不兼容苹果
  } else { // firefox/chrome
    textbox.setSelectionRange(startIndex, stopIndex);
    textbox.focus();
  }
}


// 复制
export const copyText = (text) => {
  // 数字没有 .length 不能执行selectText 需要转化成字符串
  const textString = text.toString();
  let input = document.createElement('input');
  if (!input) {
    input = document.createElement('input');
    input.id = 'copy-input';
    input.readOnly = 'readOnly'; // 防止ios聚焦触发键盘事件
    input.style.position = 'absolute';
    input.style.left = '-1000px';
    input.style.zIndex = '-1000';
  }
  document.body.appendChild(input);
  input.value = textString;
  // ios必须先选中文字且不支持 input.select();
  selectText(input, 0, textString.length);
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    Toast('复制成功');
  }
  input.blur();
  document.body.removeChild(input);
};
