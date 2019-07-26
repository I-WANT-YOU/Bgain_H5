<template>
  <div class="header">
    <svg-icon icon-class="bgain" class="header__bgain"/>
    <span class="header__title">定期</span>
    <div class="header__right">
      <svg-icon icon-class="user" class="header__user" />
      <svg-icon icon-class="more" class="header__more" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
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
