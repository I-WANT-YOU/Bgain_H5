<template>
  <div class="home-tip" v-show="!!announcement">
    <img src="../../../assets/images/home_tip.svg" alt="." />
    <span
      @click="$router.push(`/message-detail/announcement?id=${announcement.id}`)"
    >{{announcement.title}}</span>
    <img
      @click="$router.push('/message/announcement')"
      src="../../../assets/images/home_next.svg"
      alt="."
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeTip',
  computed: {
    ...mapGetters('home', [
      'announcement',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.home-tip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 340px;
  height: 30px;
  font-family: PingFangSC-Regular sans-serif;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
  background: url(../../../assets/images/home/backRectangle.svg) no-repeat;
  background-size: 100% 100%;
  > img {
    width: 20px;
    height: 20px;
  }
  > img:nth-child(1) {
    margin-left: 15px;
  }
  >img:nth-child(3){
    margin-right: 10px;
  }
  > span {
    flex: 1;
    font-size: 14px;
    color: #2a55e7;
    margin-left: 12px;
    margin-right: 40px;
    text-align: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>
