import { strip } from '@utils/tools';

const statusList = [
  {
    status: 'PENDING',
    text: '待确定',
  },
  {
    status: 'CONFIRMED',
    text: '确定',
  },
  {
    status: 'COMPLETE',
    text: '完成',
  },
  {
    status: 'FAILURE',
    text: '失败',
  },
  {
    status: 'CANCEL',
    text: '已撤单',
  },
];

export function echartsOption(X, series, series2, min, max, num, tooltip = true) {
  const seriesList = [{
    data: series,
    type: 'line',
    symbol: 'none',
    smooth: true,
    lineStyle: {
      width: 1,
      color: '#4770F5',
    },
  }];
  if (series2) {
    seriesList.push({
      data: series2,
      type: 'line',
      symbol: 'none',
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#ff5c5c',
      },
    });
  }
  if (seriesList.length === 1) {
    seriesList[0].areaStyle = {
      normal: {
        opacity: 0.2,
        color: '#C6D0F0',
      },
    };
  }

  return {
    grid: {
      left: '8%',
      right: '0%',
      bottom: '4%',
      top: '3%',
    },
    tooltip: {
      show: tooltip,
      showContent: false,
      trigger: 'axis',
    },
    xAxis: {
      show: false,
      type: 'category',
      data: X,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ffffff',
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff',
          fontSize: 8,
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      show: true,
      type: 'value',
      min: strip(min - num, 1),
      max: strip(max + num, 1),
      axisLabel: {
        show: true,
        textStyle: {
          color: '#a8aeb9',
          fontSize: 8,
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ffffff',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: seriesList,
  };
}

export const status = (item) => {
  item.fund_order_status = statusList.filter(ite => ite.status === item.fund_order_status)[0].text;
  return item;
};
const all = (item) => {
  status(item);
  return item;
};

export default all;
