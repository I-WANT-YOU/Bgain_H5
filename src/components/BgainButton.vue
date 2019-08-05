<template>
  <Button v-bind="$attrs" v-on="$listeners" :size="size" :class="className">
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
    fluid: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    size() {
      return this.fluid ? 'large' : 'normal';
    },
    className() {
      if (this.fluid) {
        return 'van-button--large-override';
      }
      return '';
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .van-button {
    border-radius: 4px;
  }
  .van-button--large-override {
    height: 46px;
    line-height: 44px;
  }
</style>
