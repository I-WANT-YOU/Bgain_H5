<template>
  <DropdownMenu class="menu-wrap">
    <div class="title">
      <div @click="onClick">
        <SvgIcon icon-class="screen" class="screen_icon" />
        <span class="screen_title">筛选</span>
        <span class="line"></span>
        <div class="showList">
          <span
            class="showList-item"
            v-for="(item) in options"
            v-bind:key="item.value"
          >{{item.active === 'all' ? item.text : item.active}}</span>
        </div>
      </div>
    </div>
    <DropdownItem ref="item" title-class="screeen-title" @close="closeMenu" @open="openMenu">
      <DorpDownLine
        v-for="(item,key) in options"
        :ref="item.value"
        :key="key"
        :active="item.active"
        :reset="onReset"
        :type="item.type"
        @changeItem="changeItem"
        :options="item.children"
      />
      <div class="buttons">
        <div @click="onReset">重置</div>
        <div @click="onConfirm">确认</div>
      </div>
      <div class="dorpDownLine-footer"></div>
    </DropdownItem>
  </DropdownMenu>
</template>

<script>
import SvgIcon from '@component/SvgIcon.vue';
import { DropdownMenu, DropdownItem } from 'vant';
import DorpDownLine from './DropDownLine.vue';

export default {
  name: 'Screen',
  components: {
    DropdownMenu,
    DropdownItem,
    DorpDownLine,
    SvgIcon,
  },
  props: ['options'],
  data() {
    return {
      value: 0,
      currency_type: 'all',
      fund_product_type: 'all',
      risk_level_type: 'all',
      cloneOptions: [],
    };
  },
  methods: {
    onConfirm() {
      this.cloneOptions = this.options;
      this.$refs.item.toggle();
      this.$emit('onChange');
    },
    onClick() {
      this.$refs.item.toggle();
    },
    onReset() {
      this.cloneOptions = this.cloneOptions.map((item) => {
        item.active = 'all';
        return item;
      });
      this.$emit('onReset');
    },
    changeItem(type, text) {
      this.$emit('changeItem', type, text);
    },
    openMenu() {
      this.cloneOptions = JSON.parse(JSON.stringify(this.options));
    },
    closeMenu() {
      this.$emit('close', this.cloneOptions);
    },
  },
};
</script>

<style lang='scss'>
.menu-wrap {
  position: relative;
  padding: 0 26px;
  box-sizing: border-box;
  height: 48px;
  .van-dropdown-menu__item {
    .van-dropdown-menu__title::after {
      border: 0;
    }
  }
  .title {
    position: absolute;
    height: 48px;
    > div {
      display: flex;
      align-items: center;
      height: 100%;
      .screen_icon {
        width: 11px;
        height: 13px;
      }
      .screen_title {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #0f3256;
        letter-spacing: 0;
        text-align: center;
        margin: 0 20px 0 7px;
      }
      .line {
        display: inline-block;
        margin-right: 20px;
        width: 1px;
        height: 20px;
        background: #e5e9f6;
      }
      .showList {
        width: 250px;
        height: 100%;
        display: flex;
        align-items: center;
        .showList-item {
          flex: 1;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #a8aeb9;
          letter-spacing: 0;
        }
      }
    }
  }
  .van-cell:not(:last-child)::after {
    border: 0;
  }

  .drop-down-menu {
    .van-cell__value--alone {
      display: flex;
      .others {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
      }
    }

    .drop-down-menu-item {
      display: inline-block;
      text-align: center;
      width: 52px;
      height: 24px;
      line-height: 24px;
      border: 1px solid #eeeeee;
      border-radius: 2px;
      margin: 10px 7.5px;
      &.active {
        background: #3c64ee;
        color: #ffffff;
      }
    }
  }

  .buttons {
    display: flex;
    box-sizing: border-box;
    padding: 0 0 25px 55px;
    > div {
      box-sizing: border-box;
      width: 111px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #0f3256;
      border: 1px solid #eeeeee;
      border-radius: 4px;
      &:nth-child(1) {
        margin-right: 38px;
      }
      &:nth-child(2) {
        background: #3c64ee;
        color: #ffffff;
      }
    }
  }
  .dorpDownLine-footer {
    height: 20px;
    box-shadow: 0px 10px 13px -11px #888 inset;
  }
  .van-overlay {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
