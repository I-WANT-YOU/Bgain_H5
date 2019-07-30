<template>
  <div class="notices">
    <div class="notice" v-for="(notice,index) in noticeData" :key="index">
      <div>
        <img :src="notice.src">
      </div>
      <div>
        <span>{{notice.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import invitedfriend from '../../assets/images/home/invitedfriend.svg';
import quickcurrencypassing from '../../assets/images/home/quickcurrencypassing.svg';

export default {
  name: 'HomeNotice',
  data() {
    return {
      noticeData: [
        {
          src: invitedfriend,
          text: '邀友返利',
        },
        {
          src: quickcurrencypassing,
          text: '快速充币',
        },
        {
          src: invitedfriend,
          text: '量化比赛',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.notices{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 34px;
  .notice{
    >div{
      >div:nth-child(1){
        height: 40px;
      }
      >div:nth-child(2){
        margin-top:15px;
        height: 20px;
      }
    }
    img{
      width: 41.6px;
      height: 40px;
    }
    span{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #0F3256;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
</style>
