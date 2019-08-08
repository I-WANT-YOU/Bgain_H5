<template>
  <Field
    label-width="80px"
    label-class="kyc__field-override"
    maxlength="50"
    :border="false"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <template v-slot:input>
      <slot></slot>
    </template>
  </Field>
</template>

<script>
import { Field } from 'vant';

export default {
  name: 'KycField',
  components: {
    Field,
  },
};
</script>
