<template>
  <div class="kyc__notice">依据国际KYC和《反洗钱法》的要求，平台需求验证您的身份</div>
</template>

<script>
export default {
  name: 'KycNoticeBar',
  props: {
    step: {
      type: Number,
      required: false,
      validator(step) {
        return [1, 2, 3].indexOf(step) !== -1;
      },
    },
  },
};
</script>
