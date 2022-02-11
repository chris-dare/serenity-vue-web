<template>
  <div>
    <div class="space-y-4">
      <MultiSelect
        v-model="localValue.code"
        title="Choose Service"
        :multiple="false"
        :options="isBillables"
        track_by="id"
        label="display"
        placeholder="Search or choose a lab text to be performed"
        :error-message="$utils.validateRequiredField(v, 'code')"
        required
      />


      <MultiSelect
        v-model="localValue.price_tier"
        title="Choose price tier"
        :multiple="false"
        :options="priceTiers"
        track_by="id"
        label="display"
        custom-field="id"
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
  name: 'ServiceRequestForm',

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      loading: false,
      priorities: [
        {display: 'Urgent (highest)', code: 'urgent'},
        {display: 'ASAP (medium)', code: 'asap'},
        {display: 'Routine (lowest)', code: 'routine'},
      ],
      filteredData: [],
    }
  },

  computed: {
    ...mapState({
      labProceedures: state => state.resources.diagnosticLabProceedures,
      storeData: (state) => state.appointments.currentAppointment,
      data: (state) => state.patients.patientServiceRequests,
    }),

    ...mapGetters({
      diagnosticServices: 'services/labProceedures',
    }),

    isDiagnostic() {
      return this.$isCurrentWorkspace('DIAG')
    },

    isBillables(){
      let list = this.data.filter(
        (result) => 'draft' === result.status,
      )
      return [...list]
    },

    priceTiers() {
      if (!this.localValue.code || !this.diagnosticServices.length) return []
      let service = this.diagnosticServices.find(service => service.order_code === this.localValue.code.code)

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
