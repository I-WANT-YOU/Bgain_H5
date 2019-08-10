<template>
  <Sticky @scroll="onScroll">
    <header :class="['header',isFixed ? 'active' : '']">
      <div class="title">
        <span @click="onClick">
          <svg-icon v-show="isFixed" icon-class="mine-logo2" class="logo" />
          <svg-icon v-show="!isFixed" icon-class="mine-logo" class="logo" />
        </span>
        <div class="right">
          <span v-if="authenticated" @click="onMine">
            <svg-icon v-show="isFixed" icon-class="mine-user2" class="mine" />
            <svg-icon v-show="!isFixed" icon-class="mine-user" class="mine" />
          </span>
          <span @click="onMore">
            <svg-icon v-show="isFixed" icon-class="mine-more2" class="more" />
            <svg-icon v-show="!isFixed" icon-class="mine-more" class="more" />
          </span>
        </div>
      </div>
    </header>
  </Sticky>
</template>

<script>
import { Sticky } from 'vant';
import { mapState } from 'vuex';

export default {
  name: 'Header',
  components: {
    Sticky,
  },
  data() {
    return {
      isFixed: false,
    };
  },
  computed: {
    ...mapState('auth', ['authenticated']),
  },
  methods: {
    onScroll({ isFixed }) {
      this.isFixed = isFixed;
    },
    onClick() {
      console.log('back');
      this.$router.push('/');
    },
    onMine() {
      console.log('mine');
    },
    onMore() {
      console.log('more');
    },
  },
};
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  height: 130px;
  background: #3e66ee;
  &.active {
    height: 48px;
    background: #ffffff;
  }
  .title {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 66.7px;
      height: 17.6px;
      margin-left: 23.2px;
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      .mine {
        display: flex;
        align-items: center;
        width: 17px;
        height: 16px;
        margin-right: 18px;
      }
      .more {
        display: flex;
        align-items: center;
        height: 16px;
        width: 14px;
        margin-right: 23px;
      }
    }
  }
}
</style>
