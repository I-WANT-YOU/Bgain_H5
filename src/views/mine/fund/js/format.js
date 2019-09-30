import { strip } from '@utils/tools';

const statusList = [
  {
    status: 'PENDING',
    text: '待确认',
  },
  {
    status: 'CONFIRMED',
    text: '已确认',
  },
  {
    status: 'COMPLETE',
    text: '已完成',
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
  let seriesList;
  if (series2) {
    seriesList = [{
      data: series,
      type: 'line',
      symbol: 'none',
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#4770F5',
      },
    }, {
      data: series2,
      type: 'line',
      symbol: 'none',
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#ff5c5c',
      },
    }];
  } else {
    seriesList = [{
      data: series,
      type: 'line',
      symbol: 'none',
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#4770F5',
      },
      areaStyle: {
        origin: 'start',
        opacity: 0.4,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#C6D0F0', // 0% 处的颜色
          }, {
            offset: 1, color: '#ffffff', // 100% 处的颜色
          }],
        },
      },
    }];
  }

  return {
    grid: {
      left: '12%',
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
        show: false,
        color: '#f4f4f4',
        textStyle: {
          color: '#f4f4f4',
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
      min: strip(min - num, 2),
      max: strip(max + num, 2),
      interval: strip((strip(max * 1 + num, 2) - strip(min - num, 2)) / 5, 2),
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999999',
          fontSize: 8,
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#999999',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#a8aeb9',
          width: 0.3,
        },
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
