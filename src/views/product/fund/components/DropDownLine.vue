<template>
  <Cell class="fund-drop-down-menu">
    <span
      :class="['fund-drop-down-menu-item',active === 'all' ? 'active' : '']"
      @click="onClickItem('all')"
    >全部</span>
    <div class="fund-others">
      <span
        :class="['fund-drop-down-menu-item',active === item ? 'active' : '']"
        v-for="(item,key) in options"
        :key="key"
        @click="onClickItem(item)"
      >{{item}}</span>
    </div>
  </Cell>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { Cell } from 'vant';

export default {
  name: 'DropDownLine',
  components: { Cell },
  props: ['options', 'reset', 'active', 'type'],
  methods: {
    onClickItem(text) {
      window._czc.push(['_trackEvent', 'click', `冠军基金-筛选-${text}`]);
      this.$emit('changeItem', this.type, text);
    },
    onReset() {
      window._czc.push(['_trackEvent', 'click', '冠军基金-筛选-重置']);
      this.reset();
    },
  },
};
</script>

<style lang='scss'>
.fund-drop-down-menu {
  padding: 0 15px;

  .van-cell__value{
    display: flex;
  }

  .fund-others{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }

  .fund-drop-down-menu-item {
    display: inline-block;
    text-align: center;
    font-size: 12px;
    color: #a8aeb9;
    width: 52px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    margin: 10px 6px;
    &.active {
      background: #3c64ee;
      color: #ffffff;
    }
  }
}
</style>
