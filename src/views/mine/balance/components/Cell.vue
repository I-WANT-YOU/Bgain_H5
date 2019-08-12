<template>
  <VanCell v-bind="$attrs" v-on="$listeners" :title-class="titleClass">
    <template v-slot:default>
      <slot name="value"></slot>
    </template>
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
  </VanCell>
</template>

<script>
import { Cell } from 'vant';

export default {
  name: 'Cell',
  components: {
    VanCell: Cell,
  },
  computed: {
    titleClass() {
      return ['bgain-cell__title--override'];
    },
  },
};
</script>

<style lang="scss" scoped>
  .bgain-cell__title--override {
    color: #6A707D;
    display: flex;
    align-items: center;
  }

  .van-cell__value {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
