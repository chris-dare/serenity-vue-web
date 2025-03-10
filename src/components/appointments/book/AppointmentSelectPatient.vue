<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Clinic and service"
    :query="$route.query"
    @cancel="cancel"
    @save="validateAndReroute"
  >
    <div class="flex">
      <InfoLinkCard
        v-for="(type, index) in patientTypes"
        :key="index"
        :is-selected="selected === type.value"
        :details="type"
        :type="type.type"
        @click="onClick(type)"
      />
    </div>
    <div class="mt-5">
      <SelectPatientTable
        :columns="columns"
        :patient.sync="form.patient"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import SelectPatientTable from '@/components/appointments/tables/SelectPatientTable'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AppointmentSelectPatient',

  components: { SelectPatientTable },

  mixins: [MultiStep],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        patient: {},
      },
      columns: ['Patient', 'Mobile'],
      radioVal: null,
      search: '',
      icon: ChevronRight,
      patientTypes: [
        {
          label: 'Existing patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'existing',
        },
        {
          label: 'New patient',
          description: 'Create record for a new patient',
          type: 'newpatient',
          value: 'new',
        },
      ],
      selected: 'existing',
      loading: false,
      next: this.$route.meta.next,
      parent: this.$route.meta.parent,
    }
  },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
      storeData: (state) => state.appointments.currentAppointment,
    }),

    disabled() {
      return !this.form.patient
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
