<template>
  <Button v-bind="$attrs">
    <slot></slot>
  </Button>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'BgainButton',
  components: {
    Button,
  },
  props: {
    style: {
      type: Array,
      required: false,
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
  .van-button {
    border-radius: 4px;
  }
</style>
