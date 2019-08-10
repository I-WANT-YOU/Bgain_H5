<template>
  <CellGroup :border="false" :class="className">
    <slot></slot>
  </CellGroup>
</template>

<script>
import { CellGroup } from 'vant';

export default {
  name: 'BgainCellGroup',
  components: {
    CellGroup,
  },
  props: {
    hasMargin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    className() {
      if (this.hasMargin) return ['bgain-cell-group__override--margin'];
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .van-cell {
    padding: 13px 20px;
  }

  .van-cell:not(:last-child)::after {
    left: 0;
  }

  .bgain-cell-group__override--margin {
    margin-bottom: 10px;
  }
</style>
