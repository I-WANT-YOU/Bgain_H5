<template>
  <div class="address__container">
    <bgain-nav-bar title="收货地址"/>
    <div class="address__notice-bar">
      <span>目前仅限中国大陆收货</span>
    </div>
    <div class="address__content">
      <Field
        label-width="90px"
        label="收货人姓名"
        placeholder="请输入您的中文姓名"
      >
      </Field>
      <Field
        label-width="90px"
        label="+86"
        placeholder="请输入您的手机号码"
      >
      </Field>
      <Field
        label-width="90px"
        label="所在地区"
        placeholder="请选择您的所在地"
      >
      </Field>
      <Field
        type="textarea"
        placeholder="请填写详情地址，不少于5个字"
        :autosize="{minHeight: 35}"
      >
      </Field>
    </div>
    <div class="address__button--wrapper">
      <Button
        type="info"
        :fluid="true"
      >
        保存
      </Button>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@/components/BgainNavBar.vue';
import BgainBaseField from '@/components/BgainBaseField.vue';
import BgainButton from '@/components/BgainButton.vue';

export default {
  name: 'ReceivingAddress',
  components: {
    BgainNavBar,
    Field: BgainBaseField,
    Button: BgainButton,
  },
};
</script>

<style lang="scss" scoped>
  .address__container {
    height: 100%;
    background: #F8F8F8;

    .address__notice-bar {
      background: #FAF4DC;
      padding: 5px 20px;
      line-height: 21px;
      font-size: 12px;

      span {
        color: #F79900;
      }
    }

    .address__content {
    }

    .address__button--wrapper {
      margin-top: 60px;
      padding: 0 22px;
    }
  }
</style>
