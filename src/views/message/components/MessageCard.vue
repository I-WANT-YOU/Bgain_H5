<template>
  <div @click="onClick">
    <SwipeCell class="message-card">
      <template v-slot:default>
        <div
          :class="['title',
          (type === 'message' && !option.read) ? 'active' : '',
          type !== 'message' ? 'ass' : ''
          ]"
        >
          <i></i>
          <span>{{option.title}}</span>
        </div>
        <div class="time">{{option.create_date}}</div>
      </template>
      <template v-if="type === 'message'" v-slot:right>
        <div class="delete" @click="deleteMessage">删除</div>
      </template>
    </SwipeCell>
  </div>
</template>

<script>
import { SwipeCell, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('message');

export default {
  name: 'MessageCard',
  components: {
    SwipeCell,
  },
  props: {
    option: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'message',
      required: false,
    },
  },
  mounted() {
    this.type = this.$route.params.type;
  },
  methods: {
    ...mapActions(['deleteNewsRead']),
    onClick() {
      if (this.type === 'message') {
        this.$router.push({ path: '/message-detail/message', query: this.option });
      } else {
        this.$router.push({ path: '/message-detail/announcement', query: { id: this.option.id } });
      }
    },
    async deleteMessage() {
      try {
        this.$emit('delete', this.option.uuid);
      } catch (error) {
        Toast(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 60px;
  position: relative;
  font-size: 15px;
  color: #999999;
  box-sizing: border-box;
  .title {
    margin-top: 12.5px;
    display: flex;
    align-items: center;
    i {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0 8px 0 16px;
    }
  }
  .time {
    font-size: 12px;
    color: #a8aeb9;
    margin: 5px 0 0 30px;
  }
  .active {
    font-size: 15px;
    color: #0f3256;
    i {
      background: #ff5c5c;
    }
  }
  .ass {
    font-size: 15px;
    color: #0f3256;
  }
  .delete {
    width: 77px;
    height: 61px;
    font-size: 14px;
    color: #ffffff;
    background: #ff5c5c;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    content: " ";
    border-bottom: 1px solid #eeeeee;
    transform: scaleY(0.5);
  }
}
</style>
