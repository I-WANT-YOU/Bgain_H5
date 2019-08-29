<template>
  <div class="contact-us">
    <BgainNavBar title="联系我们" />
    <div class="contact-us-con">
      <div class="email">
        <span>联系邮箱</span>
        <span class="right">CS@bgain.com</span>
      </div>
      <div class="add-community">
        <div class="title">
          加入社群
          <span class="tip">(点击下方账号即可复制)</span>
        </div>
        <div class="communities">
          <div
            v-for="(item,key) in option"
            @click="copyText(item.text)"
            :key="key"
            class="community"
          >
            <svg-icon :icon-class="item.icon" class="icon" />
            <span>{{item.text}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import { copyText } from '@utils/tools';

export default {
  name: 'ContactUs',
  components: {
    BgainNavBar,
  },
  data() {
    return {
      option: [
        {
          icon: 'community3',
          text: 'Bgain2019',
        },
        {
          icon: 'community4',
          text: 'Bgainkefu',
        },
      ],
    };
  },
  methods: {
    copyText(text) {
      window.scrollTo(0, 0);
      return copyText(text);
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-us {
  height: 100%;
  display: flex;
  flex-direction: column;
  .contact-us-con {
    flex: 1;
    background: #f8f8f8;
    .email {
      display: flex;
      height: 50px;
      padding: 0 20px;
      margin: 10px 0;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #0f3256;
      background: #ffffff;
      .right {
        font-size: 14px;
        color: #6a707d;
      }
    }
    .add-community {
      font-size: 14px;
      color: #0f3256;
      background: #ffffff;
      padding: 0 20px;
      .title {
        height: 50px;
        display: flex;
        align-items: center;
        .tip {
          font-size: 11px;
          color: #a8aeb9;
          margin-left: 3px;
        }
      }
      .communities {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0 17px 23px;
        .community {
          width: 50%;
          padding: 19px 0;
          .icon {
            width: 24px;
            height: 18px;
            margin-right: 19px;
          }
        }
      }
    }
  }
}
</style>
