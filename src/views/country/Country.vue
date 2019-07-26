<template>
  <div class="country">
    <Header class title="选择国籍" :backPath="'/forgetPassword'" />
    <List class="list">
      <Cell
        class="list-item"
        v-for="item in countries"
        :key="item.key"
        :title="item.text"
        :value="item.value"
        @click="skip(item)"
      />
    </List>
    <p>Copyright@2019 Bgain</p>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import { countries } from '@assets/constants/country';
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import { List, Cell } from 'vant';

export default {
  name: 'Country',
  components: {
    List,
    Cell,
    Header,
    Footer,
  },
  data() {
    return {
      countries,
    };
  },
  methods: {
    skip(options) {
      console.log(options)
      this.$router.push({ name: 'forgetPassword', params: { ...options } });
    },
  },
};
</script>

<style lang="scss">
.country {
  background: #f8f8f8;
  .list {
    margin-top: 13px;
    .list-item {
      height: 54px;
      box-sizing: border-box;
      padding: 18px 20px 15px 20px;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
    }
  }
  p {
    font-family: PingFangSC-Regular;
    font-size: 12.5px;
    color: #bbbbbb;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>
