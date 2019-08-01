<template>
  <div>非首发基金</div>
</template>

<script>
export default {
  name: 'Initial',
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>

<style>
</style>
