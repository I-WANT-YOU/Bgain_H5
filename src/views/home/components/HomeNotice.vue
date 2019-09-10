<template>
  <div class="notices">
    <div class="notice" v-for="(notice,index) in noticeData" @click="go(notice)" :key="index">
      <img :src="notice.src" alt=""/>
      <span>{{notice.text}}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import invitedfriend from '../../../assets/images/home/invitedfriend.svg';
import match from '../../../assets/images/home/match.svg';
import quickcurrencypassing from '../../../assets/images/home/quickcurrencypassing.svg';

export default {
  name: 'HomeNotice',
  data() {
    return {
      noticeData: [
        {
          src: invitedfriend,
          text: '邀友返利',
          path: '/refer',
        },
        {
          src: quickcurrencypassing,
          text: '快速充币',
          path: '/purchaseCoinHome',
        },
        {
          src: match,
          text: '量化比赛',
          path: 'http://fcat.fin-bee.com.cn',
        },
      ],
    };
  },
  methods: {
    go(path) {
      switch (path.text) {
        case '量化比赛':
          window._czc.push(['_trackEvent', 'click', '首页-量化比赛']);
          break;
        case '快速充币':
          window._czc.push(['_trackEvent', 'click', '首页-快速充币']);
          break;
        case '邀友返利':
          window._czc.push(['_trackEvent', 'click', '首页-邀友返利']);
          break;
        default:
          break;
      }
      if (path.text === '量化比赛') {
        window.location.href = path.path;
      } else {
        this.$router.push(path.path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.notices {
  margin: 0 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: PingFangSC-Regular sans-serif;
  .notice {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 41.6px;
      height: 40px;
    }
    span {
      margin-top: 15px;
      font-size: 14px;
      color: #0f3256;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
</style>
