<template>
  <Popup class="menu" v-bind="$attrs" v-on="$listeners" position="right">
    <div class="menu-header">
      <div @click="onClose" class="menu-close">
        <svg-icon class="menu-icon" icon-class="mine-more" />
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
        { text: '活动中心', path: '/activity' },
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

<style lang="scss">
.menu {
  position: fixed;
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 3000;
  width: 35%;
  .menu-header {
    padding: 0 20px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3c64ee;
    .menu-close {
      display: flex;
      align-items: center;
      justify-content: center;
      .menu-icon {
        width: 16px;
        height: 14px;
      }
    }
  }
  .menu-con {
    padding: 0 20px;
    .item {
      position: relative;
      height: 41px;
      line-height: 41px;
      font-size: 15px;
      color: #002262;
      text-align: center;
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
