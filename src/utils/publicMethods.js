
const publicMethods = {
  // 创建年月日时间
  formateDate(paramsDate) {
    const time = new Date(paramsDate); // 毫秒转换为正常时间
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let minute = time.getMinutes();
    if (year < 10) {
      year = `0${year}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    const afterDate = `${year}-${month}-${day}-${hours}:${minute}`;
    return afterDate;
  },
  // 创建时间 刮刮乐
  formatGuaGuaLeDate(paramsDate) {
    const time = new Date(paramsDate); // 毫秒转换为正常时间
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (year < 10) {
      year = `0${year}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }
    const afterDate = `${year}-${month}-${day} ${hours}:${minute}:${second}`;
    return afterDate;
  },

  // 创建倒计时时间--分为单位
  countDownMinute(bigDate, littleDate) {
    const time = new Date(bigDate - littleDate);
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }
    const finelDate = `${minute}:${second}`;
    return finelDate;
  },

  // 创建年月日时间
  createOrderDate(paramsDate) {
    const time = new Date(paramsDate); // 毫秒转换为正常时间
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (year < 10) {
      year = `0${year}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }
    const afterDate = `${year}-${month}-${day} ${hours}: ${minute}: ${second}`;
    return afterDate;
  },
};
export default publicMethods;
