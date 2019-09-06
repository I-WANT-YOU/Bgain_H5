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
                                    <div class="countryType" @click="chooseCountry()">
                                        <span>{{country.text}}</span>
                                        <div>
                                            <span>{{country.label}}</span>
                                            <img src="../../assets/images/next.svg"/>
                                        </div>
                                    </div>
                                    <div class="phone">
                                        <Field v-model="phoneData.phone"
                                               maxlength=15
                                               type="tel" placeholder="请输入手机号" />
                                    </div>
                                    <div class="phone password">
                                      <div>
                                        <input
                                          ref="myPhonePassword"
                                          v-model="phoneData.password"
                                          maxlength=20
                                          type="password"
                                          placeholder="请设置8-20位字母及数字组成的密码" />
                                      </div>
                                      <div @click="showPhonePassword()">
                                        <img :src="phonePasswordImg">
                                      </div>
                                    </div>
                                    <div class="phone">
                                        <Field v-model="phoneData.invitationCode"
                                               placeholder="请输入邀请码（非必填）" />
                                    </div>
                                    <div class="agreement">
                                        <Checkbox  v-model="phoneData.checked"
                                          icon-size="16px"
                                          @click="radioSelect()"
                                        >
                                        </Checkbox>
                                      <span>
                                        我已阅读并同意
                                        <a @click="onSkip('/agreement/service')" class="protocol-a">
                                          《服务协议》
                                        </a>
                                        和
                                        <a @click="onSkip('/agreement/privacy')" class="protocol-a">
                                          《隐私政策》
                                        </a>
                                      </span>
                                    </div>
                            </div>
                        </div>
                        <div class="tabs-button">
                            <Button
                              :loading="buttonIsLoading"
                              loading-type="spinner"
                              :disabled="disabled"
                              @click="phoneNext($event)">下一步
                            </Button>
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
                              <div class="phone password">
                                <div>
                                  <input
                                    ref="myEmailPassword"
                                    v-model="emailData.password"
                                    maxlength=20
                                    type="password"
                                    placeholder="请设置8-20位字母及数字组成的密码" />
                                </div>
                                <div @click="showEmailPassword()">
                                  <img :src="emailPasswordImg">
                                </div>
                              </div>
                                <div class="phone">
                                    <Field v-model="emailData.invitationCode"
                                           placeholder="请输入邀请码（非必填）" />
                                </div>
                                <div class="agreement">
                                  <Checkbox  v-model="emailData.checked"
                                             icon-size="16px"
                                             @click="radioSelect()"
                                  >
                                  </Checkbox>
                                  <span>
                                    我已阅读并同意
                                    <a @click="onSkip('/agreement/service')" class="protocol-a">
                                      《服务协议》
                                    </a>
                                    和
                                    <a @click="onSkip('/agreement/privacy')" class="protocol-a">
                                      《隐私政策》
                                    </a>
                                  </span>
                                </div>
                            </div>
                        </div>
                        <div class="tabs-button">
                            <Button :disabled="disabled" @click="emailNext($event)">下一步</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="toLogin">
              <div>
                 <span>已有账号？</span>
                 <span @click="$router.push('/login')" class="cals">登录</span>
                 <span @click="$router.push('/login')">
                   <svg-icon icon-class="next" class="next"/>
                 </span>
              </div>

            </div>
        </div>
        <Footer/>
      <!-- 国家列表-->
      <Geetest @loaded="onLoaded" @success="onSuccess" @error="onError"/>
    </div>
</template>

<script>
import {
  Field, Toast, Checkbox, Button,
} from 'vant';
import { mapActions } from 'vuex';
import Footer from '@component/Footer.vue';
import errorMessage from '../../constants/responseStatus';
import Header from '../../components/Header.vue';
import Geetest from '../../components/Geetest.vue';
import showPasswordImg from '../../assets/images/showPassword.svg';
import hidePasswordImg from '../../assets/images/display.svg';

export default {
  name: 'Register',
  data() {
    return {
      phonePasswordImg: showPasswordImg, // 密码图片
      emailPasswordImg: showPasswordImg, // 密码图片
      phoneActive: true,
      emailActive: false,
      phoneColor: '#333333',
      emailColor: '#999999',
      buttonIsLoading: false, // 按钮是否为加载状态
      country: {
        text: '中国大陆',
        label: '+86',
        value: '+86',
      },
      phoneData: {
        countryCode: '+86',
        phone: '',
        password: '',
        invitationCode: '',
        checked: false,
      },
      emailData: {
        email: '',
        password: '',
        invitationCode: '',
        checked: false,
      },
      activeButton: false,
      show: false,
      routerData: {},
    };
  },
  components: {
    Field,
    Checkbox,
    // eslint-disable-next-line
    Toast,
    Header,
    Footer,
    Geetest,
    Button,
  },
  mounted() {
    if (this.$route.params.key) {
      this.country = this.$route.params;
      this.phoneData.countryCode = this.$route.params.value;
    }
  },
  computed: {
    disabled() {
      if (this.phoneActive
        && this.phoneData.phone
        && this.phoneData.password
        && this.phoneData.checked) {
        return false;
      }
      if (this.emailActive
        && this.emailData.email
        && this.emailData.password
        && this.emailData.checked) {
        return false;
      }
      return true;
    },
  },
  methods: {
    // 触发action的方法
    ...mapActions('auth', [
      'getToken',
      'validateUsername',
    ]),
    isShowPhoneContent() {
      this.phoneActive = true;
      this.emailActive = false;
      this.changeTable();
      this.phoneColor = '#333333';
      this.emailColor = '#999999';
    },
    isShowEmailContent() {
      this.phoneActive = false;
      this.emailActive = true;
      this.changeTable();
      this.phoneColor = '#999999';
      this.emailColor = '#333333';
    },
    changeTable() {
      this.phoneData.phone = '';
      this.phoneData.password = '';
      this.phoneData.checked = false;
      this.phoneData.invitationCode = '';
      this.emailData.email = '';
      this.emailData.password = '';
      this.emailData.checked = false;
      this.emailData.invitationCode = '';
    },
    // 是否显示密码
    showPhonePassword() {
      if (this.phonePasswordImg === showPasswordImg) {
        this.phonePasswordImg = hidePasswordImg;
        this.$refs.myPhonePassword.setAttribute('type', 'text');
      } else {
        this.phonePasswordImg = showPasswordImg;
        this.$refs.myPhonePassword.setAttribute('type', 'password');
      }
    },
    showEmailPassword() {
      if (this.emailPasswordImg === showPasswordImg) {
        this.emailPasswordImg = hidePasswordImg;
        this.$refs.myEmailPassword.setAttribute('type', 'text');
      } else {
        this.emailPasswordImg = showPasswordImg;
        this.$refs.myEmailPassword.setAttribute('type', 'password');
      }
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
      const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      if (!regPassword.test(this.phoneData.password)) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      // 校验校验码
      // if (this.phoneData.invitationCode) {
      //   if (this.phoneData.invitationCode.length !== 6) {
      //     this.$toast('邀请码不存在，请重新输入1');
      //     return false;
      //   }
      //   if (!regPassword.test(this.phoneData.invitationCode)) {
      //     this.$toast('邀请码不存在，请重新输入2');
      //     return false;
      //   }
      // }
      // 是否同意协议
      if (this.phoneData.checked === false) {
        this.$toast('请点击同意协议');
        return false;
      }
      this.routerData = {
        username: this.phoneData.phone,
        password: this.phoneData.password,
        invitationCode: this.phoneData.invitationCode,
        countryCode: this.phoneData.countryCode,
      };
      // 判断用户名和邀请码
      const validateData = {
        username: this.routerData.username,
        invitationCode: this.routerData.invitationCode,
      };
      this.buttonIsLoading = true;
      this.validateUsername(validateData).then(
        () => {
          this.buttonIsLoading = false;
          this.geetest.verify();
        },
        (err) => {
          this.buttonIsLoading = false;
          this.$toast(errorMessage[err.status]);
        },
      );
      return false;
    },
    // 点击下一步
    emailNext(event) {
      event.preventDefault();
      // 邮箱校验
      const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
      if (!reEmail.test(String(this.emailData.email).toLowerCase())) {
        this.$toast('邮箱格式有误，请重新输入');
        return false;
      }
      // 密码校验
      if (!this.emailData.password
        || this.emailData.password.length < 8
        || this.emailData.password.length > 20) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      // const regPassword = /^[0-9a-zA-Z]+$/;
      const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      if (!regPassword.test(this.emailData.password)) {
        this.$toast('请输入8-20位字母及数字组成的密码');
        return false;
      }
      // 校验校验码
      if (this.emailData.invitationCode) {
        if (this.emailData.invitationCode.length !== 6) {
          this.$toast('邀请码不存在，请重新输入');
          return false;
        }
        if (!regPassword.test(this.emailData.invitationCode)) {
          this.$toast('邀请码不存在，请重新输入');
          return false;
        }
      }
      // 是否同意协议
      if (this.emailData.checked === false) {
        this.$toast('请点击同意协议');
        return true;
      }
      this.routerData = {
        username: this.emailData.email,
        password: this.emailData.password,
        invitationCode: this.emailData.invitationCode,
      };
      // 进入下一步
      // 判断用户名和邀请码
      const validateData = {
        username: this.routerData.username,
        invitationCode: this.routerData.invitationCode,
      };
      this.buttonIsLoading = true;
      this.validateUsername(validateData).then(
        () => {
          this.buttonIsLoading = false;
          this.geetest.verify();
        },
        (err) => {
          this.buttonIsLoading = false;
          this.$toast(errorMessage[err.status]);
        },
      );
      this.geetest.verify();
      return false;
    },
    // 选择国家
    chooseCountry() {
      this.$router.push(
        { name: 'country', params: { fromPath: 'register' } },
      );
    },
    // 选择国家
    onSelect() {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
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
      const registerData = {
        ...this.routerData,
        ...options,
      };
      this.$router.push({
        name: 'RegisterStepTwo',
        params: { ...registerData },
      });
    },
    onError() {},
    onSkip(router) {
      this.$router.push(router);
    },
  },
};
</script>

<style lang='scss'>
  /*超链接样式*/
  .protocol-a{
    color: #3660F7;
    text-decoration: underline;
  }
    .register{
        font-family: PingFangSC-Regular sans-serif;
        letter-spacing: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        // 是否隐藏form表单
        .content-hide{
            display: none;
        }
        .register-content{
          flex: 1;
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
                    .countryType{
                        height:53px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 15px;
                        color: #333333;
                        border-bottom: 2px solid #EEEEEE;
                        >div{
                            display: flex;
                            >img{
                              width:9px;
                              height: 18px;
                              margin-left:15px;
                            }
                        }
                    }
                    .phone{
                        height:51px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 14px;
                        border-bottom: 2px solid #EEEEEE;
                        .van-cell{
                            padding:0;
                        }
                    }
                  .password{

                    >div:nth-child(1){
                      width:250px;
                      >input{
                        width: 250px;
                        border:none;
                        padding-left: 0;
                        &::placeholder{
                          color: #969799;
                        }
                      }
                    }
                  }
                    .agreement{
                        height:55px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        font-size: 12px;
                        color: #999999;
                        line-height: 19px;
                        .van-cell{
                            padding:0;
                        }
                        >span{
                          margin-left: 10px;
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
                align-items: center;
                font-size: 14px;
                color: #999999;
                >div{
                  width: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .cals{
                    font-size: 14px;
                    color: blue;
                  }
                  .next{
                    width: 9px;
                    height: 12px;
                    margin-left: 5px;
                  }
                }
            }
        }
    }
</style>
