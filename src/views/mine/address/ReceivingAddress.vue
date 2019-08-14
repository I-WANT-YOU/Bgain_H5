<template>
  <div class="address__container">
    <bgain-nav-bar title="收货地址" />
    <div class="address__notice-bar">
      <span>目前仅限中国大陆收货</span>
    </div>
    <div class="address__content">
      <Field
        v-model="username"
        label-width="90px"
        maxlength="50"
        label="收货人姓名"
        placeholder="请输入您的中文姓名"
      />
      <Field v-model="tel" label-width="90px" label="+86" placeholder="请输入您的手机号码" />
      <div class="address__area" @click="showPop">
        <Field
          v-model="addressText"
          disabled
          label-width="90px"
          label="所在地区"
          placeholder="请选择您的所在地"
        />
        <div class="address__area__icon">
          <svg-icon icon-class="next" class="icon__next" />
        </div>
      </div>
      <Field
        v-model="textarea"
        type="textarea"
        maxlength="200"
        placeholder="请填写详情地址，不少于5个字"
        :autosize="{minHeight: 35}"
      />
    </div>
    <div class="address__button--wrapper">
      <Button type="info" @click="onClick" :fluid="true">保存</Button>
    </div>
    <Popup v-model="showAddress" position="bottom">
      <Area :area-list="areaList" @cancel="onCancel" @confirm="onConfirm" />
    </Popup>
  </div>
</template>

<script>
import { Popup, Area, Toast } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainBaseField from '@/components/BgainBaseField.vue';
import BgainButton from '@/components/BgainButton.vue';
import areaList from './area';

const { mapActions, mapState } = createNamespacedHelpers('activity');

export default {
  name: 'ReceivingAddress',
  components: {
    BgainNavBar,
    Field: BgainBaseField,
    Button: BgainButton,
    Popup,
    Area,
  },
  data() {
    return {
      showAddress: false,
      areaList,
      addressText: '',
      tel: '',
      username: '',
      textarea: '',
      province: '北京市',
      city: '北京市',
      region: '东城区',
    };
  },
  async mounted() {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    try {
      await this.getAddressDetail();
      if (this.address) {
        this.addressText = `${this.address.province} ${this.address.city} ${this.address.region}`;
        if (this.address.province === '北京市'
            || this.address.province === '上海市'
            || this.address.province === '天津市'
            || this.address.province === '重庆市'
            || this.address.province === '澳门特别行政区') {
          this.addressText = `${this.address.province} ${this.address.region}`;
        }
        this.username = this.address.receiver;
        this.tel = this.address.receiver_phone_num;
        this.textarea = this.address.receiver_address;
        this.city = this.address.city;
        this.region = this.address.region;
        this.receiver = this.address.username;
      }
      Toast.clear();
    } catch (error) {
      Toast.clear();
      Toast(error);
    }
  },
  computed: {
    ...mapState(['address']),
  },
  methods: {
    ...mapActions(['getAddressDetail', 'addOrUpdateAddress']),
    showPop() {
      this.showAddress = true;
    },
    onCancel() {
      this.showAddress = false;
    },
    onConfirm(arr) {
      this.addressText = this.formatArea(arr);
      this.showAddress = false;
    },
    formatArea(area) {
      let str = '';
      this.area = area;
      if (area[0].code === '110000'
          || area[0].code === '120000'
          || area[0].code === '310000'
          || area[0].code === '820000'
          || area[0].code === '500000') {
        str = `${area[0].name} ${area[2].name}`;
      } else {
        str = `${area[0].name} ${area[1].name} ${area[2].name}`;
      }
      this.province = area[0].name;
      this.city = area[1].name;
      this.region = area[2].name;
      return str;
    },
    async onClick() {
      const telReg = /^\d{11}$/;
      const regu = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      if (!regu.test(this.username)) {
        Toast('收货人只能输入中英文');
      } else if (!telReg.test(this.tel)) {
        Toast('手机号有误，请重新输入');
      } else if (this.textarea.length < 5) {
        Toast('详情地址不少于5个字');
      } else {
        try {
          await this.addOrUpdateAddress({
            province: this.province,
            city: this.city,
            region: this.region,
            receiver: this.username,
            receiver_phone_num: this.tel,
            receiver_address: this.textarea,
          });
          Toast('保存成功');
          this.$router.go(-1);
        } catch (error) {
          Toast(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .address__container {
    height: 100%;
    background: #f8f8f8;

    .address__notice-bar {
      background: #faf4dc;
      padding: 5px 20px;
      line-height: 21px;
      font-size: 12px;

      span {
        color: #f79900;
      }
    }

    .address__content {
      .address__area {
        background: #ffffff;
        position: relative;
        .address__area__icon {
          position: absolute;
          display: flex;
          align-items: center;
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
          z-index: 10;
          .icon__next {
            width: 7px;
            height: 11px;
          }
        }
      }
    }

    .address__button--wrapper {
      margin-top: 60px;
      padding: 0 22px;
    }
  }
</style>
