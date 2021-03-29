<template>
  <cv-select
    v-model="selected"
    label="Currency"
    class="inherit-full-input"
  >
    <cv-select-option
      v-for="(currency, index) in currencies"
      :key="index"
      :value="currency.code"
    >
      {{ currency.symbol }}
    </cv-select-option>
  </cv-select>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: 'CurrencySelect',

  props: {
    value: {
      type: [Array, Object, String],
      default: () => [],
    },
  },

  computed: {
    ...mapState({
      currencies: (state) => state.global.currencies,
    }),
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>
