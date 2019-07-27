<!--suppress SpellCheckingInspection -->
<template>
    <div class="register">
        <Header/>
        <div class="register-content">
            <div class="tabs">
                <a class="tab-phone"
                   @click="isShowPhoneContent()" :style="{ color: phoneColor }">手机号</a>
                <span class="tab-line" ></span>
                <a class="tab-email"
                   @click="isShowEmailContent()"
                   :style="{ color: emailColor }">邮箱</a>
            </div>
            <div class="tabs-content">
                <div :class="phoneActive ? 'phone-content':'content-hide'">
                    <form>
                        <div class="taps-form-phone">
                            <div>
                                    <div class="country">
                                        <span>中国大陆</span>
                                        <div @click="chooseCountry()">
                                            <span>+86</span>
                                            <span>></span>
                                        </div>
                                    </div>
                                    <div class="phone">
                                        <Field v-model="phoneData.phone"
                                               type="tel" placeholder="请输入手机号" />
                                    </div>
                                    <div class="phone">
                                        <Field v-model="phoneData.password"
                                               type="password"
                                               placeholder="请设置8-20位字母及数字组成的密码" />
                                    </div>
                                    <div class="phone">
                                        <Field v-model="phoneData.invitedCode"
                                               placeholder="请输入邀请码（非必填）" />
                                    </div>
                                    <div class="agreement">
                                        <Checkbox  v-model="phoneData.checked"
                                          icon-size="16px"
                                          @click="radioSelect()"
                                        >
                                          我已阅读并同意<a href="#">《服务协议》</a>和<a href="#">《隐私政策》</a>
                                        </Checkbox>
                                    </div>
                            </div>
                        </div>
                        <div class="tabs-button">
                            <button type="primary" @click="phoneNext($event)">下一步</button>
                        </div>
                    </form>

                </div>
                <div :class="emailActive ? 'email-content':'content-hide'">
                    <form>
                        <div class="taps-form-phone">
                            <div>
                                <div class="phone">
                                    <Field v-model="emailData.email"
                                           placeholder="请输入邮箱" />
                                </div>
                                <div class="phone">
                                    <Field v-model="emailData.password"
                                           placeholder="请设置8-20位字母及数字组成的密码" />
                                </div>
                                <div class="phone">
                                    <Field v-model="emailData.invitedCode"
                                           placeholder="请输入邀请码（非必填）" />
                                </div>
                                <div class="agreement">
                                  <Checkbox  v-model="emailData.checked"
                                             icon-size="16px"
                                             @click="radioSelect()"
                                  >
                                    我已阅读并同意<a href="#">《服务协议》</a>和<a href="#">《隐私政策》</a>
                                  </Checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="tabs-button">
                            <button type="primary" @click="emailNext($event)">下一步</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="toLogin">
                <span>已有账号？</span><a>登陆</a>
            </div>
            <!--国家选择下拉菜单-->
            <div class="country-select">
                <ActionSheet
                        v-model="show"
                        :actions="actions"
                        @select="onSelect"
                />
            </div>
        </div>
        <Footer/>
      <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError"/>
    </div>
</template>

<script>
import {
  Field, ActionSheet, Toast, Checkbox,
} from 'vant';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Geetest from '../../components/Geetest.vue';

export default {
  name: 'Register',
  data() {
    return {
      phoneActive: true,
      emailActive: false,
      phoneColor: '#333333',
      emailColor: '#999999',
      phoneData: {
        country: '',
        phone: '',
        password: '',
        invitedCode: '',
        checked: false,
      },
      emailData: {
        email: '',
        password: '',
        invitedCode: '',
        checked: false,
      },
      activeButton: false,
      show: false,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' },
      ],
    };
  },
  components: {
    Field,
    ActionSheet,
    Checkbox,
    // eslint-disable-next-line
    Toast,
    Header,
    Footer,
    Geetest,
  },
  methods: {
    isShowPhoneContent() {
      this.phoneActive = true;
      this.emailActive = false;
      this.phoneColor = '#333333';
      this.emailColor = '#999999';
    },
    isShowEmailContent() {
      this.phoneActive = false;
      this.emailActive = true;
      this.phoneColor = '#999999';
      this.emailColor = '#333333';
    },
    // 点击下一步
    phoneNext(event) {
      event.preventDefault();
      // 手机校验
      const regPhone = /^[0-9]{1,15}$/;
      if (!regPhone.test(this.phoneData.phone)) {
        this.$toast('手机号格式不正确');
        return false;
      }
      // 密码校验
      if (!this.phoneData.password
          || this.phoneData.password.length < 8
          || this.phoneData.password.length > 20) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      const regPassword = /^[0-9a-zA-Z]+$/;
      if (!regPassword.test(this.phoneData.password)) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      // 校验校验码
      if (this.phoneData.invitedCode) {
        if (this.phoneData.invitedCode.length !== 6) {
          this.$toast('邀请码不存在，请重新输入');
          return false;
        }
        if (!regPassword.test(this.phoneData.invitedCode)) {
          this.$toast('邀请码不存在，请重新输入');
          return false;
        }
      }
      // 是否同意协议
      if (this.phoneData.checked === false) {
        this.$toast('请点击同意协议');
        return true;
      }
      // 进入下一步
      this.geetest.verify();
      return false;
    },
    // 点击下一步
    emailNext(event) {
      event.preventDefault();
      // 邮箱校验
      const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
      if (!reEmail.test(String(this.emailData.email).toLowerCase())) {
        this.$toast('邮箱不正确');
        return false;
      }
      // 密码校验
      if (!this.emailData.password
        || this.emailData.password.length < 8
        || this.emailData.password.length > 20) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      const regPassword = /^[0-9a-zA-Z]+$/;
      if (!regPassword.test(this.emailData.password)) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      // 校验校验码
      if (this.emailData.invitedCode) {
        if (this.emailData.invitedCode.length !== 6) {
          this.$toast('邀请码不存在，请重新输入');
          return false;
        }
        if (!regPassword.test(this.emailData.invitedCode)) {
          this.$toast('邀请码不存在，请重新输入');
          return false;
        }
      }
      // 是否同意协议
      if (this.emailData.checked === false) {
        this.$toast('请点击同意协议');
        return true;
      }
      // 进入下一步
      this.geetest.verify();
      return false;
    },
    // 选择国家
    chooseCountry() {
      this.show = true;
    },
    // 选择国家
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      alert(item.name);
    },
    // 同意服务协议
    radioSelect() {
      this.checked = !this.checked;
    },
    // 滑动验证
    onLoaded(geetest) {
      this.geetest = geetest;
    },
    onSuccess(options) {
      this.options = options;
      alert('进入下一页');
      this.$router.push('/registerStepTwo');
    },
    onError() {},
  },
};
</script>

<style lang='scss'>
    .register{
        font-family: PingFangSC-Regular;
        letter-spacing: 0;
        // 是否隐藏form表单
        .content-hide{
            display: none;
        }
        .register-content{
            .tabs{
                margin:18px 0 13px 31px;
                height: 30px;
                .tab-phone{
                    display: inline-block;
                    width: 66px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 22px;
                    vertical-align: middle;
                }
                .tab-line{
                    display: inline-block;
                    width: 2px;
                    height: 20px;
                    margin: 0 26px;
                    vertical-align: middle;
                    background-color: #D8D8D8;
                }
                .tab-email{
                    display: inline-block;
                    width: 44px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 22px;
                    vertical-align: middle;
                }
            }
            .tabs-content{
                margin-left: 31px;
                padding-right:26px;
                .taps-form-phone{
                    .country{
                        height:53px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        font-size: 15px;
                        color: #333333;
                        border-bottom: 2px solid #EEEEEE;
                        >div{
                            margin-left: 200px;
                            display: flex;
                            >span:nth-child(2){
                                margin-left:15px;
                            }
                        }
                    }
                    .phone{
                        height:51px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 15px;
                        color: #333333;
                        border-bottom: 2px solid #EEEEEE;
                        .van-cell{
                            padding:0;
                        }
                    }
                    .agreement{
                        height:55px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 12px;
                        color: #999999;
                        line-height: 19px;
                        .van-cell{
                            padding:0;
                        }
                    }
                }
            }
            .tabs-button{
                width: 100%;
                display: flex;
                align-items: center;
                margin-top: 17px;
                > button{
                    width: 331px;
                    height: 46px;
                    padding: 0;
                    background: #3C64EE;
                    border-radius: 4px;
                    font-size: 16px;
                    color: #FBFCFB;
                    text-align: center;
                    line-height: 37.36px;
                    border: none;
                };
            }
            .toLogin{
                width: 100%;
                margin-top:30px;
                display: flex;
                justify-content: center;
                >span{
                    font-size: 14px;
                    color: #999999;
                }
                >a{
                    font-size: 14px;
                    color: blue;
                }
            }
        }
    }
</style>
