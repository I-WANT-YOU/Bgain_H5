<template>
  <!--常见问题-->
  <div class="commonProblem">
    <BgainNavBar title="常见问题" />
    <van-tabs v-model="active" class="change-tabs">
      <van-tab title="登录注册" class="tab-item">
        <van-collapse v-model="activeNames">
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item size="large" title="如何注册Bgain账号？" name="11">在注册界面，使用有效的手机号或邮箱进行注册。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="注册后是否能修改账号？"
              name="12"
            >平台暂不提供账号修改的功能，注册时请务必保证手机号或邮箱可长期正常使用。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="为什么要进行身份认证？"
              name="13"
            >为保证平台注册用户的资金及信息安全，平台要求用户在进行相关资金交易前完成身份认证。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何进行身份认证？"
              name="14"
            >在“我的账户”-“安全中心”中查看认证状态，未认证时直接点击进入申请认证页面，按照页面提示完成信息填写，等待审核通过即可。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="身份认证信息是否可以修改？"
              name="15"
            >身份认证一旦成功，信息不可修改，故在认证时请保证信息的真实准确性。</van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
      <van-tab title="充币提币" class="tab-item">
        <van-collapse v-model="activeNames">
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何充币？"
              name="21"
            >进入充币页面，选择币种并复制相应币种的充值地址，再打开其他数字货币钱包或交易所的提币页面、粘贴地址进行转账操作即可。成功充币到Bgain平台后，将收到平台的信息通知。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="充币有限额或手续费吗？"
              name="22"
            >Bgain平台对充币无最大额限制，但有最小值限制（各币种最小值暂为0.00000001），充币小于最小值，则平台无法入账。充币不收取手续费。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何操作提币？"
              name="23"
            >提币需先完成身份认证。进入提币界面，选择币种、使用粘贴或扫码功能输入其他钱包或交易所的充币地址、输入需要提币的数量，提交后输入Bgain平台交易密码，待达成区块确认数后则完成提币。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="提币后多久能到账？"
              name="24"
            >由于区块网络速度的不确定性，提币到账时间无法准确估算，若超过3个工作日仍未到账，可咨询Bgain客服进行查询</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="提币有无数量上限，手续费如何收取？"
              name="25"
            >目前提币无上限要求，但有最小提币值限制，且会收取一定手续费，具体可查看提币页面。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何买币？"
              name="26"
            >进入买币页面，选择币种，可以通过输入金额、输入数量两种方式买币。付款时，您需要按卖家的支付方式，通过网银、手机银行、支付宝或者微信直接转账给卖家。平台只提供卖家信息展示，实际付款需要您直接转账给卖家。您点击“我已付款“时，资金不会自动从您的支付账户划给卖家账户。您实际付款后，请务必在订单详情页点击”我已付款“</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="担心打款，收不到币？"
              name="27"
            >当您作为买家下订单进入交易时，卖家的币会被锁定在平台的钱包中，所以您不必担心就可以给卖家汇款。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="为什么都点了“我已付款”但是也未收到币？"
              name="28"
            >Bgain只提供买卖信息展示，实际的付款过程是您和对方在平台之外自行完成，并不是您在页面上标记“我已付款‘，就会自动从您的银行卡划转资金到卖家手里。如果卖方已收到款，30分钟没有放币，您可以提交申诉。平台客服会和您联系。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="为什么我这边显示转账成功，而对方未收到付款？"
              name="29"
            >首先请确保您转账时填写的收款方式和订单详情页显示的完全一致，然后请确认您的付款方式是即时到账的，还是延时到账的。最后请联系您的银行/支付机构，是否有系统维护或其他原因。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="转账时，提示对方账户有风险，是怎么回事？"
              name="210"
            >银行/支付机构有他们的风控系统，有时会提供信息供您参考，请您按照提示仔细判断。</van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
      <van-tab title="账户安全" class="tab-item">
        <van-collapse v-model="activeNames">
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何修改密码？"
              name="31"
            >账号登录成功后，可在“我的账户”——“安全中心”中修改登录密码和交易密码。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="交易密码被锁定了怎么办？"
              name="32"
            >为了保证用户在资金交易中的安全性，平台限制每日交易密码只可输错5次，超出则锁定账号，次日可恢复正常使用。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item size="large" title="如何提高密码安全性？" name="33">
              <div>（1）请使用较长、复杂的字母数字组合以提高密码强度，不要用生日等容易被别人猜中的密码。</div>
              <div>（2）如果使用了密码找回功能，请您及时删除我们发送给您的载有验证码的信息。</div>
              <div>（3）请记住不要与任何人共享您的密码。如果您已经与他人共享了密码，我们强烈建议您尽快更改。</div>
              <div>（4）建议不定期的更改用户密码，以提高密码安全性。</div>
            </van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
      <van-tab title="购买投资" class="tab-item">
        <van-collapse v-model="activeNames">
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="平台产品目前支持哪些数字货币？"
              name="41"
            >平台目前支持的数字货币有 BTC、ETH、USDT、EOS，用户在账户资金充足的情况下可自由选购产品。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="平台目前有哪些产品？"
              name="42"
            >平台目前有定期理财产品—定期盈，活期理财产品—天天赚，以及冠军基金产品。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何购买定期盈的产品？"
              name="43"
            >您需要注册成为Bgain用户，登录后在产品列表中根据币产品币种和期限选择需要购买的产品。 （1）在账户可用余额充足的情况下，输入购买数量； （2）如有可用的优惠券，建议使用优惠券可增加更多收益； （3）输入正确的交易密码后，一般情况下即可购买成功。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="购买定期盈后，什么时候开始计息？"
              name="44"
            >平产品购买成功后，根据界面上的提示日期开始计息，计息日也为封闭期开始时间。产品开始计息后，平台会进行相应的短信或邮件通知。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item size="large" title="定期盈封闭期内是否可以退出？" name="45">定期盈为固定收益类产品，封闭期内不可退出。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="产品到期后，本息什么时候到账？"
              name="46"
            >产品到期即封闭期结束，一般不晚于三个工作日可完成本息回款，回款资金可在“我的账户“—”可用余额“中查看，或在”资金记录“中查看详细流水记录。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="产品收益如何计算？"
              name="47"
            >定期盈为固定收益类产品，封闭期内不可退出，收益计算公式如下： 预期收益= 认购数量*预期年化利率*封闭期/365。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="购买定期盈产品需要签署哪协议？"
              name="48"
            >购买定期盈产品的用户需要签署的协议为《数字货币投资协议》，产品购买成功则协议生效。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="自动转入天天赚 功能介绍？"
              name="49"
            >购买定期盈产品时或购买后，产品未回款前，均可设置回款时是否自动转入天天赚。 回款资金自动自动转入天天赚时，根据转入时间系统自动判断起息及收益到账时间。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="BGP是什么？"
              name="410"
            >BGP是用于奖励资产投资行为。BGP权益将不断开发，包括兑换Bgain平台内的虚拟及实物奖励、购买金融产品等，未来的应用场景将进一步扩展。</van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
      <van-tab title="天天赚" class="tab-item">
        <van-collapse v-model="activeNames">
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="天天赚产品—天天赚支持哪些数字货币？"
              name="51"
            >目前支持的数字货币有 BTC、ETH、USDT、EOS，用户在账户资金充足的情况下可自由选购产品。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何购买天天赚产品？"
              name="52"
            >注册Bgain平台账号，在保证账户余额充足的情况下，根据页面提示操做“转入“即可完成购买天天赚产品。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="购买天天赚后，什么时候开始计息？什么时候可以看到收益？"
              name="53"
            >根据天天赚交易规则： T日18:00（GMT+8）前转入，T+ 1 日计息；T日18:00（GMT+8）后转入，T+ 2日计息。 T+ 1 日计息，则T+ 2 日可看到收益；T+ 2 日计息，则T+ 3 日可看到收益；</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="天天赚收益如何计算？"
              name="54"
            >天天赚是复利计息，而每日收益根据每日年化利率的不同而略有波动： 日收益=已计息的金额 * 当日年化利率 / 365 如您的已计息金额为10BTC，当日年化利率为4.2%，则当日收益为10*4.2%/365=0.00115068 BTC</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="天天赚转入转出有限额吗？"
              name="55"
            >目前平台对天天赚转入没有数量限制，在余额充足的情况下，可随意进行转入； 转出不可超过您的可转出额度（即已开始计算收益的资金）</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="天天赚转入转出有时间限制吗？"
              name="56"
            >根据平台规则，非周末公休日的节假日（如元旦、清明节、劳动节、端午节、中秋节、国庆节）不可进行转入、转出操作，其他时间平台可正常处理业务。</van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
      <van-tab title="冠军基金" class="tab-item">
        <van-collapse v-model="activeNames">
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="什么时候可以认购、赎回基金产品？"
              name="61"
            >平台基金暂不支持随时认购和赎回，每只基金产品均有不同周期，交易开放期可进行认购和赎回。 具体交易开放周期可在相应产品详情页进行查看。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="认购、赎回时的手续费怎么计算？"
              name="62"
            >在认购或赎回页面，可看到实时计算的预估费用。 平台会根据实际行情不定期盈调整认购、赎回的手续费率，具体以页面《交易规则》中公布的为准。 认购手续费 = 认购金额 - 【认购金额 /（1+手续费率）】 如：某用户购买某基金产品1000USDT，认购手续费率是0.15%，则手续费=1000 – 1000 /（1+0.15%）= 1.5USDT 赎回手续费＝当天产品净值*赎回费率*赎回份额 赎回手续费计算一般采用先进先出的原则，一次性赎回时按照不同的持有天数分段计算赎回费用。 如：持有一个月内费率为2%，1-2个月费率为1%，赎回当天净值为1.5 某用户总持有300份，赎回200份，其中150份已持有2个月，150份刚持有一个余月，则手续费=（150 * 1% + 50 *2%）*1.5＝3.75</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="基金认购或赎回后可以撤销吗？"
              name="63"
            >操作认购或赎回基金后，只要未到当期交易截止日您均可撤销订单；撤销认购或赎回订单后，相应认购金额或赎回份额即可原路退回。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="基金认购或赎回什么时候确认？"
              name="64"
            >在开放交易期截止日18:00前操作认购或赎回后，您无需再次操作，平台将会在当期交易截止日18:00后根据当日净值确认份额和金额。 开放交易期会在相应产品页面进行公布。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="认购基金是是否有限额？"
              name="65"
            >平台目前对认购金额没有最大限额，但认购不同产品有不同的起购金额限制，具体以认购页面提示为准。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="怎么确认基金份额？"
              name="66"
            >在交易开发期截至时间后，平台将根据当天基金产品净值及每份单价确认认购份额。 确认基金份额=（认购金额 – 认购手续费）/ 确认份额时的当天产品净值 / 该产品每份单价</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="什么时候可以认购、赎回基金产品？"
              name="67"
            >由于平台基金在特定周期才可进行交易，所以认购基金后需等到下个交易开放期可进行赎回。 具体交易开放期可在相应产品详情页面进行查看。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="认购、赎回时的手续费怎么计算？"
              name="68"
            >用户操作基金赎回后，平台未确认订单前，每日仍计算基金盈亏，平台确认赎回份额后，则不再有盈亏。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="基金认购或赎回后可以撤销吗？"
              name="69"
            >根据数字货币的特殊性，不区分节假日，每日更新基金产品净值，即节假日基金仍有收益。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="基金认购或赎回什么时候确认？"
              name="610"
            >平台根据基金产品每日净值变化率计算每日盈亏。 昨日收益=（T-1日产品净值 – T-2日产品净值）* T-1日持有份额</van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
      <van-tab title="其他" class="tab-item">
        <van-collapse v-model="activeNames">
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="BGP是什么？"
              name="71"
            >BGP是用于激励用户投资行为的奖励，是Bgain平台特有的会员积分，非Token，不上交易所，市场上也无法进行任何方式或渠道的购买。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="BGP权益介绍？"
              name="72"
            >BGP可参与百万USDT奖池的瓜分活动，可兑换平台内的其它虚拟及实物奖励，购买金融产品等，未来的应用场景将进一步扩展。</van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item size="large" title="如何获得BGP？" name="73">
              （1）注册Bgain平台
              （2）完成实名认证
              （3）每月首次充值
              （4）购买平台产品
              （5）邀请好友注册并完成认证
              （6）每日签到
              ………
            </van-collapse-item>
          </div>
          <div class="item">
            <span class="icon"></span>
            <van-collapse-item
              size="large"
              title="如何参与BGP奖池活动？"
              name="74"
            >点击App首页“BGP奖池”进入活动页面，手动输入认投的BGP数量，等待瓜分倒计时结束即可，系统将在瓜分结束后自动将主流币发放至您的账号中。</van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BgainNavBar from '@component/BgainNavBar.vue';
import {
  Tab, Tabs, Collapse, CollapseItem,
} from 'vant';

export default {
  name: 'CommonProblem',
  data() {
    return {
      active: 0,
      activeNames: ['-1'],
    };
  },
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-collapse': Collapse,
    'van-collapse-item': CollapseItem,
    BgainNavBar,
  },
};
</script>

<style lang="scss">
.commonProblem {
  font-family: PingFangSC-Medium sans-serif;
  letter-spacing: 0;
  .van-tab {
    height: 45px !important;
    flex-basis: 25% !important;
    font-size: 14px;
    color: #6a707d;
  }
  .van-tab--active {
    color: #3c64ee;
  }
  .van-tabs__line {
    width: 60px !important;
    background-color: #3c64ee;
  }
  .van-tabs__content {
    border-top: 11px solid #f8f8f8;
  }
  /*折叠title*/
  .van-cell__title {
    font-size: 14px;
    color: #0f3256;
  }
  .van-collapse-item__wrapper {
    font-size: 13px;
    color: #6a707d;
    background: #f8f8f8;
    line-height: 22px;
  }
  .van-collapse-item__content {
    line-height: 22px;
  }

  .van-cell {
    padding: 10px 20px 10px 30px;
  }
  .van-collapse-item__content {
    background: #f8f8f8;
  }
  .van-collapse-item__content {
    padding: 16px 26px 16px 20px;
  }
  .item {
    position: relative;
    font-size: 14px;
    color: #0f3256;
    .icon {
      position: absolute;
      width: 9px;
      height: 9px;
      left: 10px;
      top: 17px;
      border-radius: 50%;
      background: #3c64ee;
      z-index: 1000;
    }
  }
}
</style>
