<template>
  <div class="product-container">
    <base-header />
    <div class="product-content">
      <router-view />
    </div>
    <base-footer />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';

export default {
  name: 'Product',
  components: {
    BaseHeader,
    BaseFooter,
  },
};
</script>

<style lang="scss" scoped>
  .product-container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    .product-content {
      display: flex;
      flex: 1 1 auto;
    }
  }
</style>
