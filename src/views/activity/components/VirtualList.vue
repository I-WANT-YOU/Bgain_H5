<template>
  <div class="virtural">
    <div class="virtural-title">
      <span>Bgain虚拟物品</span>
      <span>甄选优质好生活</span>
    </div>
    <div class="virtural-list">
      <ul>
        <li v-for="(item,index) in products.VIRTUAL_WITH_BAR_CODES" :key="index"
            @click="toGoodDetail(item.id)">
          <div>
            <van-image
              width="102"
              height="60"
              :src="item.thumbnail_url"
            />
            <span class="textStyle">{{item.integral_product_name}}</span>
            <span :class="{goodsState:item.stock === 0}" >
            {{item.stock === 0?'已售磬':item.fbpprice+'积分'}}
          </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Image } from 'vant';

export default {
  name: 'VirtualList',
  components: {
    'van-image': Image,
  },
  computed: {
    ...mapState('activity', [
      'products',
    ]),
  },
  methods: {
    /* 跳转实物详情 */
    toGoodDetail(id) {
      this.$router.push(
        {
          name: 'product-detail',
          params: { id },
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  /*已售磬*/
  .goodsState{
    color:#FF5C5C!important;
  }
  .textStyle{
    width:102px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
.virtural{
  font-family: PingFangSC-Medium sans-serif;
  letter-spacing: 0;
  /*title*/
  .virtural-title{
    padding-left: 20px;
    >span{
      display: inline;
    }
    >span:nth-child(1){
      font-size: 18px;
      color: #222222;
      line-height: 25px;
    }
    >span:nth-child(2){
      font-size: 12px;
      color: #666666;
      line-height: 17px;
      margin-left: 10px;

    }
  }
  /*列表*/
  .virtural-list{
    padding-top:20px;
    padding-bottom: 13px;
    ul{
      padding:0 11.7px;
      list-style: none;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      >li{
        width: 33.3%;
        margin-bottom: 15px;
        display: flex;
        justify-content: center;
        background: #FFFFFF;
        border-radius: 4px;
        >div{
          display: flex;
          flex-direction:column;
          align-items: flex-start;
          >img{
            width: 102px;
            height: 60px;
          }
          >span:nth-child(2){
            margin-top: 10px;
            font-size: 12px;
            line-height: 17px;
            color: #333333;
          }
          >span:nth-child(3){
            margin-top: 1px;
            font-size: 13px;
            color: #3C64EE;
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>
