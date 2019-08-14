<template>
  <div class="message-center">
    <BgainBarNav title="消息中心">
      <template v-slot:right>
        <span class="read-all" @click="readAll">全部已读</span>
      </template>
    </BgainBarNav>
    <div class="message-center-con">
      <MessageCard v-for="(option,key) in newList" :key="key" :option="option" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgainBarNav from '@component/BgainNavBar.vue';
import MessageCard from './components/MessageCard.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('message');

export default {
  name: 'Message',
  components: {
    BgainBarNav,
    MessageCard,
  },
  methods: {
    ...mapActions(['getAllNews', 'setAllNewsRead']),
    readAll() {
      this.setAllNewsRead();
      this.getAllNews();
    },
  },
  computed: {
    ...mapGetters(['newList']),
  },
  mounted() {
    this.getAllNews();
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
