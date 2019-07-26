<template>
  <div>
    <BaseHeader></BaseHeader>
    <router-view />
  </div>
</template>

<script>
import BaseHeader from '@component/BaseHeader.vue';

export default {
  name: 'Product',
  components: {
    BaseHeader,
  },
};
</script>

<style lang="scss" scoped>

</style>
