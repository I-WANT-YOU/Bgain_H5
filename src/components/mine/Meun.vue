<template>
  <Popup
    class="menu"
    v-bind="$attrs"
    v-on="$listeners"
    :overlay="false"
    position='right'
  >
    <div class="menu-header">
      <div @click="onClose" class="menu-close">
        <svg-icon class="menu-icon" icon-class="mine-more2" />
      </div>
    </div>
    <div class="menu-con">
      <div
        v-for="(item, key) in options"
        :key="key"
        class="item"
        @click="onSkip(item.path)"
      >{{item.text}}</div>
    </div>
  </Popup>
</template>

<script>
import { Popup } from 'vant';

export default {
  name: 'Meun',
  components: {
    Popup,
  },
  data() {
    return {
      options: [
        { text: '首页', path: '/registerHome' },
        { text: '冠军基金', path: '/product/fund' },
        { text: '天天赚', path: '/product/current' },
        { text: '定期盈', path: '/product/fixed' },
        { text: '我的', path: '/mine' },
        { text: '联系我们', path: '/contact-us' },
        { text: '消息中心', path: '/message/message' },
      ],
    };
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onSkip(router) {
      this.onClose();
      this.$router.push(router);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 20px;
  box-sizing: border-box;
  background: #ffffff;
  .menu-header {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .menu-close {
      .menu-icon {
        width: 16px;
        height: 14px;
      }
    }
  }
  .menu-con {
    .item {
      position: relative;
      height: 41px;
      line-height: 41px;
      font-size: 15px;
      color: #002262;
      text-align: left;
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border-bottom: 1px solid #e5e9f6;
        transform: scale(0.5);
      }
    }
  }
}
</style>
