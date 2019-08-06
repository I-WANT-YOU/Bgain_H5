import _ from 'lodash';
import dayjs from 'dayjs';

export const strip = (num, precision = 12) => +parseFloat(num.toPrecision(precision));

export const getQueryParam = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const filterUndefined = options => _.omitBy(options, _.isUndefined);

export const formatDate = (date, format = 'YYYY-MM-DD HH:mm') => dayjs(date).format(format);

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
