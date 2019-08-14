<template>
  <div class="message-detail">
    <BgainBarNav title="消息详情" />
    <div class="message-detail-con">
      <div class="title">{{option.title}}</div>
      <div class="time">{{option.create_date}}</div>
      <div class="content">{{option.content}}</div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgainBarNav from '@component/BgainNavBar.vue';

const { mapActions } = createNamespacedHelpers('message');

export default {
  name: 'MessageDetail',
  components: {
    BgainBarNav,
  },
  methods: {
    ...mapActions(['setNewsRead']),
  },
  data() {
    return {
      option: {},
    };
  },
  mounted() {
    this.option = this.$route.query;
    console.log(this.$route.query);
    if (!this.option.read) {
      try {
        this.setNewsRead(this.option.uuid);
      } catch (error) {
        throw error;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.message-detail {
  display: flex;
  flex-direction: column;
  .message-detail-con {
    flex: 1;
    padding: 15px 20px 0;
    .title {
      font-size: 15px;
      color: #0f3256;
      font-weight: 600;
    }
    .time {
      margin: 5px 0 13px;
      font-size: 12px;
      color: #a8aeb9;
    }
    .content {
      font-size: 13px;
      color: #6a707d;
      line-height: 26px;
    }
  }
}
</style>
