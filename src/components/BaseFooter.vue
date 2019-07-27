<template>
  <div class="footer">
    <div class="footer__content">
      <div class="footer__content--contact">
        <svg-icon icon-class="contact" />
        <span class="footer__content-text">联系我们</span>
      </div>
      <div class="footer__content--download">
        <svg-icon icon-class="mobile" />
        <span class="footer__content-text">下载APP</span>
      </div>
      <div class="footer__content--language" @click="onLanguageClick">
        <span class="footer__content-text">简体中文</span>
        <div class="footer__content--language-arrow"></div>
      </div>
      <action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      />
    </div>
    <div class="footer__copyright">
      Copyright©2019 Bgain
    </div>
  </div>
</template>

<script>

import { ActionSheet } from 'vant';
import { languages } from '@/constants/options';

export default {
  name: 'BaseFooter',
  components: {
    ActionSheet,
  },
  data() {
    return {
      show: false,
      actions: languages,
    };
  },
  methods: {
    onSelect() {
      this.show = false;
    },
    onLanguageClick() {
      this.show = true;
    },
    onCancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .footer {
    font-size: 12px;
    padding: 17px 25px 13px;
    background-color: #262A2D;

    .footer__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5px 0;
      margin-bottom: 12px;

      .footer__content-text {
        color: #8D8D8D;
      }

      .footer__content--contact {
        svg {
          width: 12.9px;
          height: 10.3px;
          margin-right: 3.1px;
        }
      }

      .footer__content--download {
        svg {
          width: 8px;
          height: 12px;
          margin-right: 2px;
        }
      }

      .footer__content--language {
        .footer__content--language-arrow {
          margin-left: 3px;
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 5px 0 5px;
          border-color: #8D8D8D transparent transparent transparent;
        }
      }
    }

    .footer__copyright {
      color: #8D8D8D;
      font-size: 12.5px;
      line-height: 17px;
      transform: scale(0.8);
      text-align: center;
    }
  }
</style>
