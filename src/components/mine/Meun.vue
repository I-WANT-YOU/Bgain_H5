<template>
  <Popup
    class="menu"
    v-bind="$attrs"
    v-on="$listeners"
    :overlay="false"
    :style="{ weight: '100%' }"
  >
    <div class="menu-header">
      <div @click="onClose" class="menu-close">
        <svg-icon class="menu-icon" icon-class="mine-more2" />
      </div>
    </div>
    <div class="menu-con">
      <div class="item" @click="onSkip('/registerHome/login')">首页</div>
      <div class="item" @click="onSkip('/product/fund')">冠军基金</div>
      <div class="item" @click="onSkip('/product/current')">天天赚</div>
      <div class="item" @click="onSkip('/product/fixed')">定期盈</div>
      <div class="item" @click="onSkip('/mine')">我的</div>
      <div class="item" @click="onSkip('')">联系我们</div>
      <div class="item" @click="onSkip('/message')">消息中心</div>
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
  methods: {
    onClose() {
      this.$emit('close');
    },
    onSkip(router) {
      this.onClose();
      this.$router.push(router);
      console.log(router);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
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
