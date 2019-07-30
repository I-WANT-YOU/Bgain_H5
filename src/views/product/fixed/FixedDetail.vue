<template>
  <div>FixedDetail</div>
</template>

<script>
export default {
  name: 'FixedDetail',
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>

<style scoped>

</style>
