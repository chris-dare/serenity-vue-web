<template>
  <div>
    <div class="space-y-4">
      <MultiSelect
        v-model="localValue.code"
        title="Choose Service"
        :multiple="false"
        :options="options"
        track_by="id"
        :label="display"
        placeholder="Search or choose a lab text to be performed"
        :error-message="$utils.validateRequiredField(v, 'code')"
        required
        :loading="loading"
      />


      <MultiSelect
        v-model="localValue.price_tier"
        title="Choose price tier"
        :multiple="false"
        :options="priceTiers"
        track_by="id"
        label="display"
        custom-field="id"
        required
        placeholder="Search or choose a lab text to be performed"
      />

      <div
        v-if="isDiagnostic"
        class="flex items-center"
      >
        <cv-checkbox
          v-model="localValue.forTravel"
          value="true"
          label="This is for travel"
        />
        <cv-text-input
          v-if="localValue.forTravel"
          v-model="localValue.passport_number"
          type="text"
          label="Passport number"
          placeholder="Passport number"
        />
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'MultiServiceForm',

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: () => {},
    },

    options: {
      type: Array,
      default: () => [],
    },
  
    searchOptions: {
      type: Array,
      default: () => [],
    },

    display: {
      type: String,
      default: 'display',
    },
  
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState({
      labProceedures: state => state.resources.diagnosticLabProceedures,
      storeData: (state) => state.appointments.currentAppointment,
      services: state => state.services.services,
    }),

    ...mapGetters({
      diagnosticServices: 'services/labProceedures',
    }),

    isDiagnostic() {
      return this.$isCurrentWorkspace('DIAG')
    },

    priceTiers() {
      if (!this.localValue.code || !this.searchOptions.length) return []
      let service = this.searchOptions.find(service => service.order_code === this.localValue.code.code)

      if (this.localValue.code.price_tiers?.length) {
        service = this.localValue.code
      }

      if (!service){
        return []
      }

      return service.price_tiers.map(price => {
        return {
          id: price.id,
          display: `${this.$currency(price.charge, price.currency).format()} - ${price.description}`,
        }
      })
    },
  },
}
</script>
