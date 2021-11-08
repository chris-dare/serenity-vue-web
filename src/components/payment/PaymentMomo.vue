<template>
  <div class="grid grid-cols-2 gap-4">
    <MultiSelect
      v-model="localValue.vendor"
      :options="vendors"
      label="display"
      track-by="code"
      custom-field="code"
      title="Momo Network"
      placeholder="Payment Type"
      :multiple="false"
    />
    <MsisdnPhoneInput
      v-model="localValue.mobile"
      label="Phone number"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import modelMixin from '@/mixins/model'

export default {
  name: 'PaymentMomo',

  mixins: [modelMixin],

  computed: {
    ...mapState({
      vendors: (state) => state.resources.vendors,
    }),
  },

  created() {
    this.getMobileMoneyVendors()
  },

  methods: {
    ...mapActions({
      getMobileMoneyVendors: 'resources/getMobileMoneyVendors',
    }),
  },
}
</script>
