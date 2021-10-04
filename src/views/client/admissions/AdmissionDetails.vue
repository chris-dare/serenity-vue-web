<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Payment"
    :previous="previous"
    :query="$route.query"
    @cancel="cancel"
    @save="reRoute"
  >
    <div class="grid grid-cols-2 gap-8">
      <DatePicker
        v-model="form.date"
        class="col-spane-2 se-input-gray"
        label="Date and time of admission"
        type="datetime"
      />

      <FormInput
        v-model="form.admitted_by"
        label="Admitted by"
        placeholder="name of practitioner/staff"
      />

      <MultiSelect
        v-model="form.ward"
        :options="[]"
        title="Organization refered from if any"
        placeholder="Organization"
        track-by="code"
        label="display"
        custom-field="code"
        preselect
        :multiple="false"
        required
      />
      <MultiSelect
        v-model="form.referred_from"
        :options="[]"
        title="Practitioner referred from (if any)"
        placeholder="Referred from"
        track-by="code"
        label="display"
        custom-field="code"
        preselect
        :multiple="false"
        required
      />

      <FormInput
        v-model="form.admitted_by"
        label="Reason for referral"
        placeholder="Text goes here"
        class="col-span-2"
        type="textarea"
        :rows="5"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AdmissionDetails',

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
