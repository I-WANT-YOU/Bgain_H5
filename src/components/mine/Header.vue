<template>
  <Sticky>
    <header class="header">
      <span @click="onClick">
        <svg-icon icon-class="mine-logo" class="logo" />
      </span>
      <div class="right">
        <span v-if="authenticated" @click="onMine">
          <svg-icon icon-class="mine-user" class="mine" />
        </span>
        <span @click="onMore">
          <svg-icon icon-class="mine-more" class="more" />
        </span>
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
  computed: {
    ...mapState('auth', ['authenticated']),
  },
  methods: {
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
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: skyblue;
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
</style>
