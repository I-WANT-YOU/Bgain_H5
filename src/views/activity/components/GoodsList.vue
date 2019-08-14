<template>
  <div class="goods">
    <div class="goods-title">
      <span>精选生活</span>
      <span>甄选优质好生活</span>
    </div>
    <div class="goods-list">
      <ul>
        <li v-for="(item,index) in products.ENTITY" :key="index" @click="toGoodDetail(item.id)">
          <van-image
            height="100"
            :src="item.thumbnail_url"
          />
          <span class="textStyle">{{item.integral_product_name}}</span>
          <span :class="{goodsState:item.stock === 0}">
            {{item.stock === 0?'已售磬':item.fbpprice+'积分'}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Image } from 'vant';

export default {
  name: 'GoodsList',
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
    width:150px;
    text-align: center;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
.goods{
  font-family: PingFangSC-Medium sans-serif;
  letter-spacing: 0;
  /*title*/
  .goods-title{
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
  .goods-list{
    padding-top:20px;
    padding-bottom: 15px;
    ul{
      padding:0 20px;
      list-style: none;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      >li{
        width: 160px;
        height: 170px;
        margin-bottom: 15px;
        display: flex;
        flex-direction:column;
        align-items: center;
        background: #FFFFFF;
        border-radius: 4px;
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
        >img{
          height: 100px;
        }
        >span:nth-child(2){
          margin-top: 14px;
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
</style>
