<template>
  <div class="product-list">
    <div class="tab-title">
      <div v-for="(text,index) in tabTitle"
           @click="changeUnderLine(index)"
           :class="{underLine:activeLine==index}"
           :key="index"
      >
        <span>{{text}}</span>
      </div>
    </div>
    <div class="tab-content">
      <div v-if="activeLine===0"></div>
      <div v-if="activeLine===1">1</div>
      <div v-if="activeLine===2">2</div>
    </div>
    <Tabs class="taps"
      v-model="active"
      line-height="1"
      color="#3C64EE"
      title-active-color="#3C64EE"
      title-inactive-color=" #676C8D"
    >
      <Tab title="基金涨幅榜" >
        <ul>
          <li v-for="(item,index) in fundIncreaseListData" :key="index">
            <div class="li-style">
              <div>
                <span>{{ item.name }}</span>
                <span>cta r3</span>
              </div>
              <div>{{ item.value1 }}</div>
              <div>{{ item.value2 }}</div>
            </div>
          </li>
        </ul>
      </Tab>
      <Tab title="活期">内容 2</Tab>
      <Tab title="定期">内容 3</Tab>
    </Tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';

export default {
  name: 'HomeProductList',
  components: {
    Tab, Tabs,
  },
  data() {
    return {
      active: 0,
      activeLine: 0,
      tabTitle: [
        '基金涨幅榜',
        '活期',
        '定期',
      ],
      fundIncreaseListData: [
        {
          name: 'ABC多策略整合CTA',
          value1: '0.123',
          value2: '+8.9%',
        },
        {
          name: 'ABC多策略整合CTA',
          value1: '0.123',
          value2: '+8.9%',
        },
        {
          name: 'ABC多策略整合CTA',
          value1: '0.123',
          value2: '+8.9%',
        },
        {
          name: 'ABC多策略整合CTA',
          value1: '0.123',
          value2: '+8.9%',
        },
        {
          name: 'ABC多策略整合CTA',
          value1: '0.123',
          value2: '+8.9%',
        },
      ],
    };
  },
  methods: {
    changeUnderLine(index) {
      this.activeLine = index;
    },
  },
};
</script>

<style lang="scss" >
.product-list{
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
  .tab-title{
    display: flex;
    height: 40px;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    color: #3C64EE;
    text-align: center;
    padding: 0 43px;
    border: 0.5px solid #E5E9F6;
    .underLine{
      >span{
        display: inline-block;
        height: 100%;
        border-bottom:2px solid #3C64EE; ;
      }
    }
    >div{
      flex: 1;
      height: 100%;
      line-height: 40px;

    }
    >div:nth-child(1){
      text-align: left;
      >span{
        width: 75px;
      }
    }
    >div:nth-child(2){
      text-align: right;
      >span{
        width: 30px;
        margin-right: 8px;
      }
    }
    >div:nth-child(3){
      text-align: right;
      >span{
        width: 30px;
      }
    }
  }
  .taps{
    >div:nth-child(1){
      font-size: 15px;
      text-align: center;
      >div{
        >div{
          >span{
            text-align: right;
          }
        }
      }
    }
  }
  .li-style{
    margin-left: 23px;
    margin-right: 17px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 71px;
    >div{
      /*flex: 1;*/
    }
    >div:nth-child(1){
      height: 42px;
      >span{
        display: block;
        text-align: left;
      }
      >span:nth-child(1){
        height: 21px;
        font-size: 15px;
        color: #0F3256;
      }
      >span:nth-child(2){
        height: 17px;
        margin-top: 4px;
        font-size: 12px;
        color: #A8AEB9;
      }
    }
    >div:nth-child(2){
      font-size: 15px;
      color: #0F3256;
    }
    >div:nth-child(3){
      font-size: 15px;
      color: #FF5656;
    }

  }
}
</style>
