<template>
  <MultiSelect
    v-model="localValue"
    :options="currencies"
    track-by="code"
    label="display"
    custom-field="code"
    title="Currency"
    preselect
    v-bind="$attrs"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import modelMixin from '@/mixins/model'
export default {
  name: 'CurrencySelect',

  mixins: [modelMixin],

  computed: {
    ...mapState({
      currencies: (state) => state.resources.currencies,
    }),
  },

  created(){
    this.getCurrencies()
  },

  methods: {
    ...mapActions({
      getCurrencies: 'resources/getCurrencies',
    }),
  },
}
</script>
