<template>
<div class="appeal">
  <BgainNavBar title = '申诉'/>
  <div class="appealReason">
    <div>
      <span>请选择申诉理由</span>
    </div>

    <div>
      <label v-for="(item,index) in appealReasons" :key="index" for="index">
        <input name = 'reason' type="radio" id="index"/>{{item}}
      </label>
    </div>
    <div>
      <textarea v-model="userInput"></textarea>
    </div>
  </div>
  <div class="tradeTips">
    <div><span>交易提示</span></div>
    <div>
      <p v-for="(item,index) in tipsList" :key="index">{{item}}</p>
    </div>
  </div>
  <div class="commit"></div>
</div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';

export default {
  name: 'Appeal',
  data() {
    return {
      radio: '4',
      userInput: '',
      appealReasons: [
        '我已完成付款，买家未及时放行',
        '我向卖家多转了钱',
        '其他',
      ],
      tipsList: [
        '1. 提起申诉后资产将会冻结，申诉专员将介入本次交易，直至申诉结束；',
        '2. 恶意申诉属于扰乱平台正常运营秩序行为，情节严重将冻结账户。',
      ],
    };
  },
  components: {
    BgainNavBar,
  },
};
</script>

<style lang="scss" >
.appeal{
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  // 申诉理由
  .appealReason{
    >div:nth-child(1){
      margin-top: 18px;
      padding-left: 20px;
      font-size: 15px;
      color: #6A707D;
      >span{
        height: 21px;
        line-height: 21px;
      }
    }
    >div:nth-child(2){
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      >label{
        display: flex;
        align-items: center;
        height: 18px;
        margin-top: 20px;
        line-height: 18px;
        font-size: 13px;
        color: #0F3256;
        >input{
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
      }
    }
    >div:nth-child(3){
      padding:16px 30px 0 30px;
      >textarea{
        width: 100%;
        height: 140px;
        padding: 0;
        resize:none
      }
    }
  }
  // 交易提示
  .tradeTips{
    padding: 15px 30px 0 30px;
    >div:nth-child(1){
      >span{
        height: 20px;
        font-size: 14px;
        color: #676C8D;
      }
    }
    >div:nth-child(2){
      margin-top: 7px;
      >p{
        margin: 0;
        padding: 0;
        font-size: 12px;
        color: #A8AEB9;
        line-height: 26px;
      }
    }
  }

}
</style>
