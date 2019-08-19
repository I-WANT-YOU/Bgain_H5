<template>
  <div class="message-detail">
    <BgainBarNav :title="`${$route.params.type === 'message' ? '消息' : '公告'}详情`" />
    <div class="message-detail-con">
      <div class="title">{{option.title}}</div>
      <div class="time">{{option.create_date || option.createdAt}}</div>
      <div class="content">{{option.content}}</div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainBarNav from '@component/BgainNavBar.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('message');

export default {
  name: 'MessageDetail',
  components: {
    BgainBarNav,
  },
  methods: {
    ...mapActions(['setNewsRead', 'getSystemAnnouncementsDetail']),
  },
  data() {
    return {
      option: {},
    };
  },
  computed: {
    ...mapGetters(['announcementDetail']),
  },
  async mounted() {
    try {
      if (this.$route.params.type === 'message' && !this.option.read) {
        this.option = this.$route.query;
        await this.setNewsRead(this.option.uuid);
      } else {
        await this.getSystemAnnouncementsDetail(this.$route.query.id);
        this.option = this.announcementDetail;
      }
    } catch (error) {
      Toast(error);
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
