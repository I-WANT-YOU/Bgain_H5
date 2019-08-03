<template>
  <div>首发基金</div>
</template>

<script>

// const detail = {
//   "id": 2,
//   "fund_name": "ABC多策略整合CTA",
//   "currency_type": "BTC",
//   "issue_number": 0,
//   "period": 28,
//   "open_duration": 7,
//   "un_open_duration": 21,
//   "fund_product_type": "CTA",
//   "status": "INITIAL",
//   "current_size": "0",
//   "min_invest_amt": "0.01",
//   "min_holding_shares": "1",
//   "manage_fee_rate": "0",
//   "carry_rate_user": "30",
//   "nav": "1.0000",
//   "nav_date": 1562311785000,
//   "up_down": 0,
//   "market_change_percent": "0.00",
//   "create_date": 1562311785000,
//   "initial_start_date": 1562313600000,
//   "initial_end_date": 1562882400000,
//   "next_open_date": 1564696800000,
//   "closing_date": 1562882400000,
//   "administrator": "Alison Block Counsulting (ABC)",
//   "introduction": null,
//   "max_retracement_scale": "15.00",
//   "risk_level_type": "R3_MEDIUM_LEVEL",
//   "current_time": 1564675200000,
//   "due_date": 1562882400000,
//   "profits_date": 1562947200000,
//   "png_url": "https://finbee-uat.oss-cn-hongkong.aliyuncs.com/a8ed9cb1-4fd4-45d3-bae6-2a93b7cc55f1ABClogo.png",
//   "team_name": "Alison Block Counsulting (ABC)"
// }

export default {
  name: 'Initial',
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>

<style>
</style>
