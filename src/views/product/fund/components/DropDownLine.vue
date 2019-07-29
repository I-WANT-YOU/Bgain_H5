<template>
  <Cell class="drop-down-menu">
    <span
      :class="['drop-down-menu-item',active === 'all' ? 'active' : '']"
      @click="onClickItem('all')"
    >全部</span>
    <div class="others">
      <span
        :class="['drop-down-menu-item',active === key ? 'active' : '']"
        v-for="(item,key) in options"
        :key="key"
        @click="onClickItem(key)"
      >{{item}}</span>
    </div>
  </Cell>
</template>

<script>
import { Cell } from 'vant';
export default {
  name: 'DropDownLine',
  components: { Cell },
  props: ['options'],
  data() {
    return {
      active: 'all',
    };
  },
  methods: {
    onClickItem(text) {
      this.active = text;
    },
    onReset() {
      this.active = 'all';
    }
  },
}
</script>

<style lang='scss'>
.drop-down-menu {
  .van-cell__value--alone {
    display: flex;
    .others {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .drop-down-menu-item {
    display: inline-block;
    text-align: center;
    width: 52px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    margin: 10px 7.5px;
    &.active {
      background: #3c64ee;
      color: #ffffff;
    }
  }
}
</style>
