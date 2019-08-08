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
    <div class="kyc__photos">
      <div class="photos__titles">
        <div class="photos__title">证件照片</div>
        <div class="photos__subtitle">请添加本人清晰的证件照片（不超过10M，jpg、bmp或png）</div>
      </div>
      <div class="photos__content">
        <div
          class="photo__container"
          v-visible="uploader.icon !== ''"
          v-for="(uploader, index) in uploaders[documentType]"
          :key="uploader.icon">
          <Uploader
            :after-read="afterRead"
            :name="index"
          >
            <template v-slot:default>
              <div class="photo__wrapper">
                <svg-icon :icon-class="uploader.icon" class="icon-bg-place"/>
                <svg-icon icon-class="camera" class="icon-camera"/>
                <van-image
                  v-if="files[index] !== ''"
                  class="preview-image"
                  width="82"
                  height="52"
                  fit="contain"
                  :src="files[index]"
                >
                  <template v-slot:loading>
                    <Loading type="spinner" size="20"/>
                  </template>
                </van-image>
              </div>
            </template>
          </Uploader>
          <div class="photo__label">{{uploader.label}}</div>
        </div>
      </div>
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
      <bgain-button
        type="info"
        :fluid="true"
        @click="onGetSecretClick"
        :style="{marginTop: '30px'}"
      >
        获取秦健大佬的上传信息
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
import axios from 'axios';
import {
  CellGroup, Popup, Picker, Toast, Uploader, Image, Loading,
} from 'vant';
import { isEmpty } from 'lodash';
import { mapState, mapActions } from 'vuex';
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
    Uploader,
    VanImage: Image,
    Loading,
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
      policy: {},
      files: ['', '', ''],
      uploaders: {
        ID: [
          {
            icon: 'id-front',
            label: '身份证正面照',
          },
          {
            icon: 'id-reverse',
            label: '身份证反面照',
          },
          {
            icon: 'id-person',
            label: '本人手持证件照',
          },
        ],
        PASSPORT: [
          {
            icon: 'id-front',
            label: '证件照',
          },
          {
            icon: 'id-person',
            label: '本人手持证件照',
          },
          {
            icon: '',
            label: '',
          },
        ],
        DRIVER_LICENSE: [
          {
            icon: 'id-front',
            label: '证件照',
          },
          {
            icon: 'id-person',
            label: '本人手持证件照',
          },
          {
            icon: '',
            label: '',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState('app', [
      'uploadPolicy',
    ]),
    type() {
      return DOCUMENT_TYPE.filter(({ value }) => value === this.documentType)[0].label;
    },
    columns() {
      return DOCUMENT_TYPE;
    },
  },
  methods: {
    ...mapActions('app', ['getUploadPolicy']),
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
    getRandomFileName() {
      return Math.random()
        .toString(36)
        .substring(2, 15) + Math.random()
        .toString(36)
        .substring(2, 15);
    },
    getSuffix(filename) {
      const index = filename.lastIndexOf('.');
      if (index !== -1) {
        return filename.substring(index);
      }
      return '';
    },
    async fetchUploadPolicy() {
      try {
        await this.getUploadPolicy();
      } catch (error) {
        Toast(error);
      }
    },
    // eslint-disable-next-line consistent-return
    async getPolicy() {
      const now = Date.parse(new Date()) / 1000;
      if (isEmpty(this.uploadPolicy)) {
        return this.fetchUploadPolicy();
      }
      if (parseInt(this.uploadPolicy.expire, 10) < now + 3) {
        return this.fetchUploadPolicy();
      }
    },
    upload(file, index) {
      const {
        policy, accessid, signature, dir, host,
      } = this.uploadPolicy;
      const photo = file.file;
      const name = `${this.getRandomFileName()}${this.getSuffix(photo.name)}`;
      const key = `${dir}${name}`;

      const param = new FormData();
      param.append('name', `${name}`);
      param.append('key', `${key}`);
      param.append('policy', `${policy}`);
      param.append('OSSAccessKeyId', `${accessid}`);
      param.append('success_action_status', '200');
      param.append('signature', `${signature}`);
      param.append('file', photo, name);
      axios.post(host, param)
        .then(() => {
          this.files.splice(index, 1, `${host}/${key}`);
          Toast.clear();
        })
        .catch((error) => {
          Toast(error);
        });
    },
    async afterRead(file, { name: index }) {
      try {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '上传中...',
        });
        await this.getPolicy();
        this.upload(file, index);
      } catch (error) {
        Toast(error);
      }
    },
    onGetSecretClick() {
      this.getPolicy();
    },
  },
};
</script>

<style lang="scss" scoped>
  .kyc__document--type {
    font-size: 15px;
    color: #0F3256;
  }

  .kyc__photos {
    margin-top: 10px;
    padding: 16px 0;
    background: #fff;

    .photos__titles {
      padding-left: 30px;

      .photos__title {
        font-size: 14px;
        color: #6A707D;
        line-height: 20px;
        margin-bottom: 3px;
      }

      .photos__subtitle {
        font-size: 12px;
        color: #A8AEB9;
        line-height: 17px;
      }
    }

    .photos__content {
      margin-top: 15px;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .photo__wrapper {
        position: relative;

        .icon-bg-place {
          width: 98px;
          height: 70px;
        }

        .icon-camera {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
        }

        .preview-image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .photo__label {
        margin-top: 10px;
        font-size: 12px;
        color: #0F3256;
        line-height: 17px;
        text-align: center;
      }
    }
  }
</style>
