<template>
  <BaseModal
    :name="name"
    title="Medication"
    width="70%"
    @closed="close"
  >
    <template>
      <SeForm
        class="space-y-8"
      >
        <MedicationRequestForm
          v-model="form"
          :v="$v"
        />


        <div class="flex items-center justify-between">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Go back
          </SeButton>
          <SeButton
            :icon="icon"
            :loading="loading"
            @click="submit"
          >
            Submit
          </SeButton>
        </div>
      </SeForm>
    </template>
  </BaseModal>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import MedicationRequestForm from '@/components/forms/MedicationRequestForm'
import isEmpty from 'lodash/isEmpty'
import modalMixin from '@/mixins/modal'


export default {
  name: 'MedicationRequestModal',

  components: { MedicationRequestForm },

  mixins: [modalMixin],

  data() {
    return {
      form: {
        extra_details: {
          medication_request_notes: [{display: ''}],
          medication_request_category: this.$isCurrentWorkspace('OPD') ? 'outpatient' : 'inpatient',
        },
        drugs: [
          {
            medication_detail: [{display: ''}],
            course_of_therapy_type: '',
            medication_request_dosage_instruction: [{frequency: '', route: 'ORAL_USE', period_unit: 'Days'}],
          },
        ],
      },
      icon: ChevronRight,
      loading: false,
      intentOptions: [ 'proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option' ],
      statuses: [ 'draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown' ],
      therapyTypes: [ 'continuous', 'acute', 'seasonal' ],
      categories: [ 'inpatient', 'outpatient', 'community', 'discharge' ],
      name: 'medication-request-modal',
    }
  },

  events: {
    'profile:medication:request:open': function(){
      this.open()
    },
    'profile:medication:request:close': function(){
      this.close()
    },
  },

  validations: {
    form: {
      drugs: {
        required,
        minLength: minLength(1),
        $each: {
          course_of_therapy_type: { required },
          medication_detail: {
            required,
            minLength: minLength(1),
            $each: {
              display: { required },
            },
          },
          medication_request_dosage_instruction: {
            required,
            minLength: minLength(1),
            $each: {
              frequency: { required },
              period: { required },
              period_unit: { required },
            },
          },

        },
      },

    },
  },

  computed: {
    ...mapState({
      priorities: (state) => state.global.priorities,
      provider: (state) => state.auth.provider,
      encounter: (state) => state.encounters.currentEncounter,
      units: (state) => state.global.units,
      frequencies: (state) => state.global.frequencies,
      user: (state) => state.auth.user,
    }),
  },

  methods: {
    ...mapActions({
      createMedicationRequest: 'patients/createMedicationRequest',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill in the required fields')
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {

      this.loading = true
      try {
        this.form.requester = this.user.id
        await this.createMedicationRequest(this.formatMedication(this.form))
        this.loading = false
        this.$toast.open({
          message: 'Medication Request successfully added',
        })
        this.close()
      } catch (error) {
        this.loading = false
        throw error
      }
    },

    async update() {
      try {
        await this.updateServiceRequest(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Medication Request successfully updated',
        })
        this.close()
      } catch (error) {
        this.loading = false
        throw error
      }
    },

    addDrug() {
      this.form.drugs.push({
        medication_detail: [{display: ''}],
        course_of_therapy_type: '',
        medication_request_dosage_instruction: [{frequency: ''}],
      })
    },

    removeDrug(index) {
      this.form.drugs.splice(index, 1)
    },

    formatMedication(data) {
      let newForm = []

      data.drugs.forEach(drug => {
        newForm.push({
          ...drug,
          ...data.extra_details,
          requester_practitioner_role: this.provider.practitionerRoleId,
          patient: this.$route.params.id,
          encounter: this.encounter.id,
          medication_request_category: [{ display: data.extra_details.medication_request_category }],
        })
      })
      newForm.forEach(drug => {
        if (isEmpty(drug.next_refill)) {
          return delete drug.next_refill
        }
        drug.next_refill = this.$date.formatDate(drug.next_refill, 'yyyy-MM-dd')
      })

      return newForm
    },

    addTag(index, tag) {
      this.form.drugs[index].medication_request_dosage_instruction[0].frequency = tag
    },
  },
}
</script>
