<template>
  <Cell class="drop-down-menu">
    <span
      :class="['drop-down-menu-item',active === 'all' ? 'active' : '']"
      @click="onClickItem('all')"
    >全部</span>
    <div class="others">
      <span
        :class="['drop-down-menu-item',active === item ? 'active' : '']"
        v-for="(item,key) in options"
        :key="key"
        @click="onClickItem(item)"
      >{{item}}</span>
    </div>
  </Cell>
</template>

<script>
import { Cell } from 'vant';

export default {
  name: 'DropDownLine',
  components: { Cell },
  props: ['options', 'reset', 'active', 'type'],
  methods: {
    onClickItem(text) {
      this.$emit('changeItem', this.type, text);
    },
    onReset() {
      this.reset();
    },
  },
};
</script>

<style lang='scss'>
.drop-down-menu {
  padding: 0 15px;

  .drop-down-menu-item {
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
