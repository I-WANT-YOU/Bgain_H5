<template>
  <div class="noInitial" @click="onClick">
    <h4 class="title">
      <span>{{options.fund_name}}</span>
      <svg-icon v-if="options.support_fbp" icon-class="bgp" class="icon-no-initial" />
    </h4>
    <div class="data">
      <div class="top">
        <div :class="['setup', options.ups_and_downs_week > 0 ? '' : 'active']">
          <span>{{options.nav > 0 ? `+${options.ups_and_downs_week}` : options.ups_and_downs_week}}</span>
          <span class="unit">%</span>
        </div>
        <div class="networth">{{options.nav}}</div>
      </div>
      <div class="bottom">
        <div class="left">成立以来</div>
        <div class="right">最新净值({{options.nav_date}})</div>
      </div>
    </div>
    <div class="label">
      <div class="labels">
        <span>{{options.currency_type}}</span>
        <span>{{options.fund_product_type}}</span>
        <span>{{options.risk_level_type}}</span>
      </div>
      <div class="time">
        <svg-icon
          :icon-class="options.status.toLocaleUpperCase() === 'OPEN' ? 'start' : 'end'"
          class="icon"
        />
        <span>{{options.status.toLocaleUpperCase() === 'OPEN' ? options.closing_date : options.next_open_date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoInitial',
  props: {
    options: {
      type: Object,
    },
  },
  methods: {
    onClick() {
      this.$router.push(`/product/fund/noinitial/${this.options.id}`);
    },
  },
};
</script>

<style lang='scss' scoped>
.noInitial {
  box-sizing: border-box;
  padding: 12px 20px;
  .title {
    display: flex;
    align-items: center;
    margin: 0;
    height: 20px;
    font-size: 14px;
    color: #0f3256;
    letter-spacing: 0;
    font-weight: 400;
    margin-bottom: 10px;
    .icon-no-initial {
      width: 30px;
      height: 16px;
      margin-left: 5px;
      font-size: 11px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
    }
  }
  .data {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    > div {
      display: flex;
      > div {
        flex: 1;
      }
      &.top {
        display: flex;
        letter-spacing: 0;
        .setup {
          font-size: 24px;
          color: #67bb74;
          line-height: 33px;
          .unit {
            font-size: 18px;
            line-height: 25px;
          }
          &.active {
            color: #ff5044;
          }
        }
        .networth {
          font-size: 18px;
          color: #0f3256;
          box-sizing: border-box;
          padding: 8px 0 0 17px;
        }
      }
      &.bottom {
        display: flex;
        font-size: 12px;
        color: #a8aeb9;
        letter-spacing: 0;
        margin-bottom: 12px;
        .right {
          box-sizing: border-box;
          padding-left: 16px;
        }
      }
    }
  }
  .label {
    height: 42px;
    display: flex;
    align-items: center;
    > div {
      flex: 1;
    }
    .labels {
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        padding: 3px 0;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px 0 0;
        box-sizing: border-box;
        border: 1px solid #ff5c5c;
        border-radius: 2px;
        font-size: 11px;
        color: #ff5c5c;
      }
    }
    .time {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding-left: 10px;
      font-size: 12px;
      color: #676c8d;
      letter-spacing: 0;
      .icon {
        width: 16px;
        height: 14px;
        margin-right: 8px;
      }
    }
  }
}
</style>
