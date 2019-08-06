<template>
  <div class="country">
    <Header class title="选择国籍" :backPath="goBack" />
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
    <div class="none"></div>
    <Footer />
  </div>
</template>

<script>
import { List, Cell } from 'vant';
import Header from '@component/Header.vue';
import Footer from '@component/Footer.vue';
import countries from '@/constants/country';

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
      goBack: '/login',
    };
  },
  mounted() {
    if (this.$route.params.fromPath) {
      this.goBack = `/${this.$route.params.fromPath}`;
    }
  },
  methods: {
    skip(options) {
      this.$router.push({ name: this.goBack.substr(1), params: { ...options } });
    },
  },
};
</script>

<style lang="scss">
.country {
  position: relative;
  background: #f8f8f8;
  .list {
    margin-top: 13px;
    .list-item {
      height: 54px;
      box-sizing: border-box;
      padding: 18px 20px 15px 20px;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
    }
  }
  p {
    font-size: 12.5px;
    color: #bbbbbb;
    letter-spacing: 0;
    text-align: center;
  }
  .none {
    height: 50px;
  }
}
</style>
