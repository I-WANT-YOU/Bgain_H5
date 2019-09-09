<template>
  <Sticky @scroll="onScroll">
    <header :class="['header',isFixed ? 'active' : '']">
      <NavBar :border="false" :class="[isFixed ? 'active' : '']">
        <template v-slot:left>
          <div class="left" @click="onClick">
            <svg-icon v-show="isFixed" icon-class="mine-logo2" class="logo" />
            <svg-icon v-show="!isFixed" icon-class="mine-logo" class="logo" />
          </div>
        </template>
        <template v-slot:right>
          <div class="right">
            <span v-if="isLogin" @click="onMine">
              <svg-icon v-show="isFixed" icon-class="mine-user2" class="mine" />
              <svg-icon v-show="!isFixed" icon-class="mine-user" class="mine" />
            </span>
            <span @click="onMore">
              <svg-icon v-show="isFixed" icon-class="mine-more2" class="more" />
              <svg-icon v-show="!isFixed" icon-class="mine-more" class="more" />
            </span>
          </div>
        </template>
      </NavBar>
      <Menu v-model="showMenu" @close="closeMenu" />
    </header>
  </Sticky>
</template>

<script>
import { Sticky, NavBar } from 'vant';
import Menu from './Meun.vue';

export default {
  name: 'Header',
  components: {
    Sticky,
    Menu,
    NavBar,
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      isFixed: false,
      showMenu: false,
    };
  },
  methods: {
    onScroll({ isFixed }) {
      this.isFixed = isFixed;
    },
    onClick() {
      this.$router.push('/');
    },
    onMine() {
      this.$router.push('/mine/safety');
    },
    onMore() {
      this.showMenu = true;
    },
    closeMenu() {
      this.showMenu = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.van-nav-bar {
  height: 48px;
  line-height: 48px;
  background: #3e66ee;
  &.active {
    background: #ffffff;
  }
  .van-nav-bar__left{
    height: 100%;
  }
}
.header {
  width: 100%;
  height: 130px;
  background: #3e66ee;
  &.active {
    height: 48px;
    background: #ffffff;
  }
  .logo {
    width: 66.7px;
    height: 17.6px;
  }
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
  }
  .right {
    display: flex;
    .mine {
      width: 17px;
      height: 16px;
      margin-right: 18px;
    }
    .more {
      height: 16px;
      width: 14px;
      margin-right: 10px;
    }
  }
}
</style>
