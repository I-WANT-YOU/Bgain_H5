<template>
    <div class="register">
        <Header/>
        <div class="register-content">
            <div class="tabs">
                <a class="tab-phone" @click="isShowPhoneContent()" :style="{ color: phoneColor }">手机号</a>
                <span class="tab-line" ></span>
                <a class="tab-email" @click="isShowEmailContent()" :style="{ color: emailColor }">邮箱</a>
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
                                        <Field v-model="phoneData.phone" placeholder="请输入手机号" />
                                    </div>
                                    <div class="phone">
                                        <Field v-model="phoneData.password" placeholder="请设置8-20位字母及数字组成的密码" />
                                    </div>
                                    <div class="phone">
                                        <Field v-model="phoneData.invitedCode" placeholder="请输入邀请码（非必填）" />
                                    </div>
                                    <div class="agreement">
                                        <RadioGroup>
                                            <Radio icon-size="16px" name="1">我已阅读并同意<a href="#">《服务协议》</a>和<a>《隐私政策》</a></Radio>
                                        </RadioGroup>
                                    </div>
                            </div>
                        </div>
                        <div class="tabs-button">
                            <button type="primary" @click="next($event)">下一步</button>
                        </div>
                    </form>

                </div>
                <div :class="emailActive ? 'email-content':'content-hide'">
                    <form>
                        <div class="taps-form-phone">
                            <div>
                                <div class="phone">
                                    <Field v-model="value" placeholder="请输入邮箱" />
                                </div>
                                <div class="phone">
                                    <Field v-model="value" placeholder="请设置8-20位字母及数字组成的密码" />
                                </div>
                                <div class="phone">
                                    <Field v-model="value" placeholder="请输入邀请码（非必填）" />
                                </div>
                                <div class="agreement">
                                    <RadioGroup>
                                        <Radio icon-size="16px" name="1">我已阅读并同意<a href="#">《服务协议》</a>和<a>《隐私政策》</a></Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                        <div class="tabs-button">
                            <button type="primary" @click="next($event)">下一步</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="toLogin">
                <span>已有账号？</span><a>登陆</a>
            </div>
            // 国家选择下拉菜单
            <div class="country-select">
                <ActionSheet
                        v-model="show"
                        :actions="actions"
                        @select="onSelect"
                />
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import { Field, RadioGroup, Radio,ActionSheet  } from 'vant';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default {
        name: 'register',
        data() {
            return {
                phoneActive:true,
                emailActive:false,
                phoneColor:'#333333',
                emailColor:'#999999',
                phoneData:{
                    country:'',
                    phone:'',
                    password:'',
                    invitedCode:'',
                    agreement:'',
                },
                show: false,
                actions: [
                    { name: '选项' },
                    { name: '选项' },
                    { name: '选项', subname: '描述信息' }
                ]
            };
        },
        methods:{
            isShowPhoneContent:function () {
                this.phoneActive=true;
                this.emailActive=false;
                this.phoneColor='#333333';
                this.emailColor='#999999';
            },
            isShowEmailContent:function () {
                this.phoneActive=false;
                this.emailActive=true;
                this.phoneColor='#999999';
                this.emailColor='#333333';
            },
            // 点击下一步
            next:function (event) {
                event.preventDefault();
            },
            // 选择国家
            chooseCountry:function () {

            }
        },
        components: {
            Field, RadioGroup, Radio,ActionSheet,
            Header, Footer,
        }
    }
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
                > button{
                    width: 331px;
                    height: 46px;
                    padding: 0;
                    background: #D2D8EB;
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
