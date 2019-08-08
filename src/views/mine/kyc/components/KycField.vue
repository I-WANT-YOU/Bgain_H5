<template>
  <Field
    label-width="80px"
    label-class="kyc__field-override"
    maxlength="50"
    :border="true"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <template v-slot:input>
      <slot name="input"></slot>
    </template>
    <template v-slot:button>
      <slot name="button"></slot>
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
