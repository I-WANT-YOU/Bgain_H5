import _ from 'lodash';
import dayjs from 'dayjs';

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
  return re.test(String(email).toLowerCase());
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

export const checkDocumentNumber = (type, docNumber) => {
  const variations = {
    ID: checkIdNumberFormat,
    PASSPORT: checkPassportFormat,
    DRIVING_LICENSE: checkDrivingLicenseFormat,
  };
  return variations[type] && variations[type].call(this, docNumber);
};

export const getDesensitizedUsername = (username) => {
  if (!username || !_.isString(username)) return '';
  if (checkEmailFormat(username)) {
    if (username.indexOf('@') <= 1) {
      return username;
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
