<template>
  <div class="message-center">
    <BgainBarNav :title="`${type === 'message' ? '消息中心' : '公告'}`">
      <template v-if="type === 'message'" v-slot:right>
        <span class="read-all" @click="readAll">全部已读</span>
      </template>
    </BgainBarNav>
    <div class="message-center-con">
      <MessageCard
        v-for="(option,key) in list"
        @delete="onDelete"
        :type="type"
        :key="key"
        :option="option"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import BgainBarNav from '@component/BgainNavBar.vue';
import responseStatus from '@/constants/responseStatus';
import MessageCard from './components/MessageCard.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('message');
const { mapActions: userMapAction, mapGetters: userMapGetters } = createNamespacedHelpers('user');

export default {
  name: 'Message',
  components: {
    BgainBarNav,
    MessageCard,
  },
  data() {
    return {
      type: 'message',
      list: [],
    };
  },
  methods: {
    ...mapActions(['getAllNews', 'setAllNewsRead', 'getSystemAnnouncements', 'deleteNewsRead']),
    ...userMapAction(['getUserSummary']),
    async readAll() {
      await this.setAllNewsRead();
      await this.getAllNews();
      this.list = this.newList;
    },
    async onDelete(uuid) {
      await this.deleteNewsRead(uuid);
      await this.getAllNews();
      this.list = this.newList;
    },
  },
  computed: {
    ...mapGetters(['newList', 'announcementList']),
    ...userMapGetters(['authLevel']),
  },
  async mounted() {
    this.type = this.$route.params.type;
    try {
      if (this.$route.params.type === 'announcement') {
        await this.getSystemAnnouncements();
        this.list = this.announcementList;
      } else if (this.$route.params.type === 'message') {
        await this.getUserSummary();
        if (this.authLevel) {
          await this.getAllNews();
          this.list = this.newList;
        } else {
          this.$router.push('/login');
        }
      }
    } catch (error) {
      Toast(responseStatus[error.status]);
    }
  },
};
</script>

<style lang="scss" scoped>
.message-center {
  display: flex;
  flex-direction: column;
  .read-all {
    font-size: 14px;
    color: #0f3256;
  }
  .message-center-con {
    flex: 1;
  }
}
</style>
