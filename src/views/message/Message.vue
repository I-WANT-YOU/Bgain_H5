<template>
  <div class="message-center">
    <BgainBarNav title="消息中心"/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgainBarNav from '@component/BgainNavBar.vue';

const { mapActions } = createNamespacedHelpers('message');

export default {
  name: 'Message',
  components: {
    BgainBarNav,
  },
  methods: {
    ...mapActions(['getAllNews']),
  },
  mounted() {
    this.getAllNews();
  },
};
</script>

<style lang="scss" scoped>
.message-center{

}
</style>
