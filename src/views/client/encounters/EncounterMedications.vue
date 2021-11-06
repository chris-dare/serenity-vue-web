<template>
  <div class="relative h-full">
    <SeForm class="space-y-8">
      <p
        v-if="mode === 'update'"
        class="font-semibold"
      >
        Edit Medication
      </p>
      <p
        v-else
        class="font-semibold"
      >
        Medication
      </p>

      <div v-if="allergies.length">
        <p class="text-serenity-primary mb-2">{{ $utils.formatName(patient.fullName) }}'s allergies</p>

        <div class="flex space-x-2">
          <Tag
            v-for="(allergy, index) in allergies"
            :key="index"
            variant="success"
          >
            {{ allergy.code }}
          </Tag>
        </div>
      </div>

      <MedicationRequestForm
        v-model="form"
        :v="$v"
        :mode="mode"
      />

      <div class="flex justify-end">
        <SeButton
          :loading="loading"
          :icon="add"
          @click="submit"
        >
          <template v-if="mode === 'create'">Save</template>
          <template v-else>Update</template>
        </SeButton>
        <SeButton
          v-if="mode === 'update'"
          class="ml-2"
          variant="secondary"
          @click="cancelUpdate"
        >
          Cancel
        </SeButton>
      </div>


      <div
        v-if="mode === 'create'"
        class="py-8"
      >
        <p class="mb-2 font-semibold">Previous medications</p>
        <EncounterMedicationTable />
      </div>
    </SeForm>

    <div
      v-if="mode === 'create'"
      class="mt-8 flex justify-between items-center"
    >
      <SeButton
        variant="secondary"
        :to="{name: 'EncounterLabs', params: { id: $route.params.id }}"
      >
        Back to labs
      </SeButton>
      <SeButton
        :icon="icon"
        :loading="loading"
        @click="submit(true)"
      >
        Care plan
      </SeButton>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import unsavedChanges from '@/mixins/unsaved-changes'
import EncounterMedicationTable from '@/components/patients/encounters/EncounterMedicationTable'
import MedicationRequestForm from '@/components/forms/MedicationRequestForm'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'EncounterMedications',

  components: { EncounterMedicationTable, MedicationRequestForm },

  mixins: [unsavedChanges],

  props: {
    medicationId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {
        extra_details: {
          medication_request_notes: [{display: ''}],
          medication_request_category: this.$isCurrentWorkspace('OPD') ? 'outpatient' : 'inpatient',
          priority: 'routine',
        },
        drugs: [
          {
            medication_detail: [{display: ''}],
            course_of_therapy_type: '',
            medication_request_dosage_instruction: [{frequency: ''}],
          },
        ],
      },
      visible: false,
      loading: false,
      intentOptions: [ 'proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option' ],
      statuses: [ 'draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown' ],
      propertiesToCompareChanges: ['form'],
      // dataHasNotChanged: true,
    }
  },

  validations: {
    form: {
      extra_details: {
        priority: { required },
      },
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
      provider: (state) => state.auth.provider,
      encounter: (state) => state.encounters.currentEncounter,
      patient: (state) => state.patients.currentPatient,
      user: (state) => state.auth.user,
      allergies: state => state.patientAllergies.allergies,
    }),

    ...mapGetters({
      currentEncounterMedicationRequests: 'encounters/currentEncounterMedicationRequests',
    }),

    mode() {
      return this.medicationId ? 'update' : 'create'
    },
  },

  watch: {

    medicationId: {
      immediate: true,
      handler() {
        this.init()
      },
    },
    currentEncounterMedicationRequests: {
      immediate: true,
      handler() {
        this.init()
      },
    },

    // form: {
    //   // immediate: true,
    //   deep: true,
    //   handler(val, oldVal) {
    //     if (val !== oldVal) {
    //       this.dataHasNotChanged = false
    //     }
    //   },
    // },
  },

  methods: {
    ...mapActions({
      createMedicationRequest: 'patients/createMedicationRequest',
      updateMedicationRequest: 'patients/updateMedicationRequest',
      deleteMedicationRequest: 'patients/deleteMedicationRequest',
    }),

    init() {
      if (this.mode === 'update') {
        let medication = this.currentEncounterMedicationRequests.find(el => el.id === this.medicationId)

        if (!medication) return {}

        this.form.extra_details = (({ medication_request_notes, priority, code, date, category, intended_dispenser }) =>
          ({ medication_request_notes, priority, code, date, category, intended_dispenser }))(medication)

        this.form.extra_details.medication_request_category
          = medication.medication_request_category[0].display

        this.form.drugs = medication.medication_detail.map(drug => {
          return {
            medication_detail: [{ display: drug.display }],
            course_of_therapy_type: medication.course_of_therapy_type,
            medication_request_dosage_instruction: medication.medication_request_dosage_instruction,
            next_refill: medication.next_refill,
            quantity: medication.quantity,
          }
        })
      }
    },

    cancelUpdate() {
      this.$v.$reset()
      this.reset()
      this.$router.push({ name: 'EncounterMedications', params: { medicationId: null }})
    },

    submit(reroute= false) {
      if (reroute && this.dataHasNotChanged) {
        this.$router.push({ name: 'EncounterCarePlan', params: { id: this.$route.params.id }})
        return
      }

      this.$v.$touch()

      this.form.extra_details.intended_dispenser = this.provider.organization_name


      if (this.$v.$invalid) {
        this.$toast.error('Please fill in the required fields')
        return
      }
      if (this.mode === 'update') {
        this.update()
      } else {
        this.save(reroute)
      }
    },

    async save(reroute) {
      this.loading = true

      try {
        this.form.requester = this.user.id
        await this.createMedicationRequest(this.formatMedication(this.form))
        this.loading = false
        this.$toast.open({
          message: 'Medication successfully added',
        })
        this.close()
        if (reroute) {
          this.$router.push({ name: 'EncounterCarePlan', params: { id: this.$route.params.id }})
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      this.loading = true
      try {
        let payload = this.formatMedication(this.form)[0]
        payload.id = this.medicationId
        await this.updateMedicationRequest(payload)
        this.loading = false
        this.$toast.open({
          message: 'Medication successfully updated',
        })
        this.close()
        this.$router.push({ name: 'EncounterMedications' })
        /* eslint-disable-next-line */
      } catch (error) {
        this.$utils.error(error)
      }
      this.loading = false
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

    close() {
      this.reset()
      this.$v.$reset()
    },

    reset() {
      this.form = {
        extra_details: {
          medication_request_notes: [{display: ''}],
          medication_request_category: this.$isCurrentWorkspace('OPD') ? 'outpatient' : 'inpatient',
        },
        drugs: [
          {
            medication_detail: [{display: ''}],
            course_of_therapy_type: '',
            medication_request_dosage_instruction: [{frequency: ''}],
          },
        ],
      }
    },
  },
}
</script>
