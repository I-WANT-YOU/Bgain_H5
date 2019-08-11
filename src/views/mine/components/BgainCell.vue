<template>
  <Cell v-bind="$attrs" v-on="$listeners" :title-class="titleClass">
    <template v-slot:default>
      <slot></slot>
    </template>
  </Cell>
</template>

<script>
import { Cell } from 'vant';

export default {
  name: 'BgainCell',
  components: {
    Cell,
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
  }
</style>
