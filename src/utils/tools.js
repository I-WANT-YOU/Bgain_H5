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
