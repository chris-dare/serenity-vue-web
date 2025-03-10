<template>
  <div>
    <div class="space-y-4">
      <MultiSelect
        v-if="isDiagnostic"
        v-model="localValue.code"
        title="Choose lab test"
        :multiple="false"
        :options="diagnosticServices"
        track_by="id"
        label="healthcare_service_name"
        placeholder="Search or choose a lab text to be performed"
        :error-message="$utils.validateRequiredField(v, 'code')"
        required
      />

      <MultiSelect
        v-else
        v-model="localValue.code"
        title="Choose lab test"
        :multiple="false"
        :options="filteredData"
        track_by="code"
        label="display"
        custom-field="code"
        placeholder="Search or choose a lab text to be performed"
        :error-message="$utils.validateRequiredField(v, 'code')"
        required
        :internal-search="false"
        @search-change="searchLabProceedures"
      />


      <MultiSelect
        v-if="isDiagnostic"
        v-model="localValue.price_tier"
        title="Choose price tier"
        :multiple="false"
        :options="priceTiers"
        track_by="id"
        label="display"
        custom-field="id"
        placeholder="Search or choose a lab text to be performed"
      />

      <FormInput
        v-model="localValue.note"
        label="Note"
        placeholder="Leave a note for the lab technician"
        :rows="4"
        type="textarea"
        class="col-span-2 se-input-gray"
      />

      <PrioritiesSelect
        v-model="localValue.priority"
        :options="priorities"
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
import { mapActions, mapGetters, mapState } from 'vuex'
import debounce from 'lodash/debounce'

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
    }),

    ...mapGetters({
      diagnosticServices: 'services/labProceedures',
    }),

    isDiagnostic() {
      return this.$isCurrentWorkspace('DIAG')
    },

    priceTiers() {
      if (!this.localValue.code || !this.diagnosticServices.length) return []
      let service = this.diagnosticServices.find(service => service.id === this.localValue.code.id)

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

  async created() {
    await this.getDiagnosticLabProceedures()

    this.filteredData = this.labProceedures

    if (this.localValue?.display) {
      this.searchLabProceedures(this.localValue.display)
    }
  },

  methods: {
    ...mapActions({
      getDiagnosticLabProceedures: 'resources/getDiagnosticLabProceedures',
    }),

    searchLabProceedures: debounce(function(search) {
      this.filteredData = this.labProceedures.filter(data => !search || data.alias?.toLowerCase().includes(search?.toLowerCase()) || data.display?.toLowerCase().includes(search?.toLowerCase()))
    }, 300, false),
  },
}
</script>
