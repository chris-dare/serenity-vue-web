<template>
  <MultiStepBase
    :icon="icon"
    next-label="Admission Details"
    :previous="previous"
    :query="$route.query"
    @cancel="cancel"
    @save="reRoute"
  >
    <div class="space-y-6">
      <div class="grid grid-cols-3 gap-4">
        <InfoLinkCard
          v-for="(type, index) in types"
          :key="index"
          :is-selected="selected === type.value"
          :details="type"
          :type="type.type"
          @click="selected = type.value"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 w-full">
        <MultiSelect
          v-model="form.ward"
          :options="[]"
          title="Choose a ward"
          placeholder="Wards"
          track-by="code"
          label="display"
          custom-field="code"
          preselect
          :multiple="false"
          required
        />
        <MultiSelect
          v-model="form.service_tier"
          :options="[]"
          title="Choose a service tier"
          placeholder="Service tiers "
          track-by="code"
          label="display"
          custom-field="code"
          preselect
          :multiple="false"
          required
        />
      </div>
    </div>
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AdmissionPricing',

  mixins: [MultiStep],

  data() {
    return {
      form: {},
      icon: ChevronRight,
      next: this.$route.meta.next,
      parent: this.$route.meta.parent,
      previous: this.$route.meta.previous,
      selected: '',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
    }),

    types() {
      return [
        {
          label: 'ICU',
          description: 'for General and special practices',
          type: 'inpatient',
          value: 'in-patient',
        },
        {
          label: 'Labor',
          description: 'for General and special practices',
          type: 'outpatient',
          value: 'out-patient',
        },
        {
          label: 'NICU',
          description: 'for General and special practices',
          type: 'diagnostic',
          value: 'diagnostic',
        },
        {
          label: 'General',
          description: 'Residence/Venue for care required',
          type: 'diagnostic',
          value: 'diagnostic',
        },
      ]
    },
  },

  validations: {
    form: {
      patient: { minLength: minLength(1), required  },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
    }),

    onClick(type) {
      if (type.value === 'existing') {
        this.selected = type.value
      } else {
        this.$router.push({ name: 'Biodata', query: { reroute: true } })
      }
      
    },
  },
}
</script>
