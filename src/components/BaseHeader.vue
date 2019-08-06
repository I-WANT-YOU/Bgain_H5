<template>
  <div class="header">
    <svg-icon icon-class="bgain" class="header__bgain"/>
    <span class="header__title">{{title}}</span>
    <div class="header__right">
      <svg-icon
        v-if="authenticated"
        icon-class="user"
        class="header__user" />
      <svg-icon icon-class="more" class="header__more" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseHeader',
  computed: {
    ...mapState('auth', ['authenticated']),
    title() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 22px;
    font-size: 14px;

    .header__bgain {
      width: 67px;
      height: 18px;
    }

    .header__title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      color: #0F3256;
      letter-spacing: 0;
      line-height: 37.36px;
    }

    .header__right {

      .header__user {
        width: 17px;
        height: 16px;
        margin-right: 18px;
      }

      .header__more {
        width: 16px;
        height: 14px;
      }
    }
  }
</style>
