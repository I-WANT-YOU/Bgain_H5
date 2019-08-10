<template>
  <div class="pleasePay">
    <PayHeader/>
    <div class="content-container">
      <PayContent/>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Toast } from 'vant';
import Vue from 'vue';
import PayContent from './components/PayContent.vue';
import PayHeader from './components/PayHeader.vue';
import errorMessage from '../../constants/responseStatus';


Vue.use(Toast);
export default {
  name: 'ToBeReleased',
  components: { PayHeader, PayContent },
  computed: {
    ...mapState('coin/orderInfo', [
      'orderInfoById',
    ]),
  },
  methods: {
    ...mapActions('coin/orderInfo', [
      'getOrderInfoById',
    ]),
  },
  mounted() {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...',
    });
    alert('这是为数据');
    this.getOrderInfoById(13).then( // 获取币种列表
      () => {
        this.$toast.clear();
      },
      (err) => {
        this.$toast.clear();
        if (err.status) { this.$toast(errorMessage[err.status]); } else {
          this.$toast('网络故障');
        }
      },
    );
  },
  beforeDestroy() {
    this.$toast.clear();
  },
};
</script>

<style lang="scss" scoped>
  .pleasePay{
    .content-container{
      position: relative;
      width: 343px;
      top:-30px;
      left: 16px;
      right: 16px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 2px rgba(211,211,211,0.31);
      border-radius: 0 0 4px 4px;
    }
  }

</style>
