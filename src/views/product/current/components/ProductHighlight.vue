<template>
  <div class="current-hl__container van-hairline--top van-hairline--bottom">
    <Button>Button</Button>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'ProductHighlight',
  components: { Button },
};
</script>

<style lang="scss" scoped>
  .current-hl__container {
    margin-top: 30px;
    padding: 30px 0;
  }
</style>
