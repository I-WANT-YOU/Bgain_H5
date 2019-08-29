<template>
  <div class="address-card__container" @click="onGoAddress">
    <div class="address__wrapper" v-if="dataSource !== null">
      <div class="address__name">
        {{dataSource.receiver}}
        <span class="address__phone">{{dataSource.receiver_phone_num}}</span>
      </div>
      <div class="address__address">
        {{dataSource.province === dataSource.city ? '' : dataSource.province}}
        {{dataSource.city}}
        {{dataSource.region}}
        {{dataSource.receiver_address}}
      </div>
    </div>
    <svg-icon icon-class="next" class="icon-next" v-if="dataSource !== null" />
    <div class="address__wrapper--null" v-if="dataSource === null">
      <div class="address__address">请添加收货地址</div>
      <svg-icon icon-class="next" class="icon-next" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressCard',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onGoAddress() {
      this.$router.push({
        name: 'receiving-address',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.address-card__container {
  margin-top: 10px;
  padding: 14px 20px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon-next {
    width: 9px;
    height: 11px;
  }

  .address__wrapper {
    .address__name {
      font-size: 15px;
      color: #333333;
      line-height: 21px;
      margin-bottom: 9px;
    }

    .address__address {
      width: 300px;
      font-size: 15px;
      color: #333333;
      line-height: 21px;
    }

    .address__phone {
      font-size: 15px;
      color: #999999;
      line-height: 21px;
      margin-left: 5px;
    }
  }

  .address__wrapper--null {
    display: flex;
    align-items: center;

    .address__address {
      font-size: 15px;
      color: #333333;
      line-height: 21px;
      margin-right: 13px;
    }
  }
}
</style>
