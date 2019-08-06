<template>
  <div>
    <div class="kyc__fields">
      <cell-group :border="false">
        <kyc-field
          label="证件类型"
        >
          <div class="kyc__document--type" @click="onShowPicker">{{type}}</div>
        </kyc-field>
        <kyc-field
          :value="documentNumber"
          @input="onDocNumberInput"
          label="证件号码"
          placeholder="请输入证件号码"
        ></kyc-field>
      </cell-group>
    </div>
    <div class="kyc__button-wrap">
      <bgain-button
        type="info"
        :fluid="true"
        @click="onPrevClick"
        :style="{marginBottom: '30px'}"
      >
        上一步
      </bgain-button>
      <bgain-button
        type="info"
        :fluid="true"
        @click="onNextClick"
      >
        下一步
      </bgain-button>
    </div>
    <Popup v-model="showPicker" position="bottom">
      <Picker
        show-toolbar
        value-key="label"
        :columns="columns"
        @cancel="onCancelPicker"
        @confirm="onConfirmPicker"
      />
    </Popup>
  </div>
</template>

<script>
import {
  CellGroup, Popup, Picker, Toast,
} from 'vant';
import { checkDocumentNumber } from '@utils/tools';
import { DOCUMENT_TYPE } from '@/constants/options';
import BgainButton from '@/components/BgainButton.vue';
import KycField from './KycField.vue';

export default {
  name: 'KycStepTwo',
  components: {
    BgainButton,
    KycField,
    CellGroup,
    Popup,
    Picker,
  },
  props: {
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showPicker: false,
    };
  },
  computed: {
    type() {
      return DOCUMENT_TYPE.filter(({ value }) => value === this.documentType)[0].label;
    },
    columns() {
      return DOCUMENT_TYPE;
    },
  },
  methods: {
    onPrevClick() {
      this.$emit('change-step', 1);
    },
    onNextClick() {
      if (!checkDocumentNumber(this.documentType, this.documentNumber)) {
        Toast('请输入正确的证件号码');
      } else {
        this.$emit('change-step', 2);
      }
    },
    onShowPicker() {
      this.showPicker = true;
    },
    onCancelPicker() {
      this.showPicker = false;
    },
    onConfirmPicker({ value }) {
      this.$emit('change-doc-type', value);
      this.showPicker = false;
    },
    onDocNumberInput(number) {
      this.$emit('change-doc-number', number);
    },
  },
};
</script>

<style lang="scss" scoped>
  .kyc__document--type {
    font-size: 15px;
    color: #0F3256;
  }
</style>
