<template>
  <div class="payContent">
      <div class="paymentInfo">
        <div v-for="(item,index) in orderInfo" :key="index">
          <span>{{item.title}}</span>
          <span>{{item.content}}</span>
        </div>
      </div>
    <div class="paymentInfo userInfo">
      <div v-for="(item,index) in userInfo" :key="index">
        <span>{{item.title}}</span>
        <span>{{item.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayContent',
  data() {
    return {
      orderInfo: [
        {
          title: '实付金额',
          content: '--',
        },
        {
          title: '单约价',
          content: '--',
        },
        {
          title: '数量',
          content: '--',
        },
      ],
      userInfo: [
        {
          title: '实付金额',
          content: '--',
        },
        {
          title: '单约价',
          content: '--',
        },
        {
          title: '数量',
          content: '--',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .payContent{
    height: 364px;
    .paymentInfo{
      margin:11px 21px 0px 21px;
      padding-bottom: 10px;
      border-bottom: 0.51px solid #EEEEEE;
      >div{
        display: flex;
        justify-content: space-between;
        >span{
          height: 38px;
          line-height: 38px;
          font-size: 13px;
        }
        >span:nth-child(1){
          color: #6A707D;
        }
        >span:nth-child(2){
          color: #0F3256;
        }
      }
    }
    .userInfo{}
  }
</style>
