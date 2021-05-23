<template>
  <div class="relative h-full">
    <SeForm class="space-y-8">
      <p class="font-semibold">Medication</p>


      <div
        v-for="(detail, index) in form.drugs"
        :key="index"
      >
        <p class="text-serenity-green font-semibold mb-4">{{ index+1 }}.</p>
        <div class="grid grid-cols-12 gap-x-4 gap-y-8 items-center">
          <div class="col-span-11 grid grid-cols-3 gap-4 items-center">
            <AutoCompleteMedication
              v-model="detail.medication_detail[0].display"
              class="col-span-3"
            />
            <MultiSelect
              v-model="detail.course_of_therapy_type"
              title="Course of therapy"
              :options="therapyTypes"
              :multiple="false"
            />
            <cv-text-input
              v-model="detail.medication_request_dosage_instruction[0].frequency"
              label="Frequency"
              type="text"
              placeholder="eg twice daily"
              class="inherit-full-input"
            />
            <cv-text-input
              v-model="detail.medication_request_dosage_instruction[0].period"
              label="Period"
              type="text"
              placeholder="eg 4 days"
              class="inherit-full-input"
            />
            <cv-text-input
              v-model="detail.medication_request_dosage_instruction[0].period_unit"
              label="Period unit"
              placeholder="eg mml"
              type="text"
              class="inherit-full-input"
            />
            <cv-text-input
              v-model="detail.medication_request_dosage_instruction[0].frequency_unit"
              label="Frequency unit"
              placeholder="eg 50mml"
              type="text"
              class="inherit-full-input"
            />
            <cv-text-input
              v-model="detail.medication_request_dosage_instruction[0].strength"
              label="Strength"
              type="text"
              class="inherit-full-input"
            />
          </div>
      
          <Trash
            class="w-5 h-5 cursor-pointer"
            @click="removeDrug(index)"
          />
        </div>
      </div>
      <p
        v-if="$utils.validateRequiredField($v, 'drugs')"
        class="error col-span-2"
      >
        All fields are required for drugs
      </p>

      <div
        class="flex items-center space-x-2 text-serenity-primary my-4 cursor-pointer text-sm"
        @click="addDrug"
      >
        <AddAlt class="w-5 h-5" />
        <p class="text-serenity-primary">Add new drug</p>
      </div>
      <div class="grid grid-cols-3 gap-4 items-center">
        <MultiSelect
          v-model="form.extra_details.priority"
          title="Priority"
          :options="priorities"
          :multiple="false"
        />
        <MultiSelect
          v-model="form.extra_details.medication_request_category"
          title="Medication request category"
          :options="categories"
          :multiple="false"
        />
        <cv-text-input
          v-model="form.extra_details.category"
          label="Category"
          type="text"
          class="inherit-full-input"
        />
        <cv-text-input
          v-model="form.extra_details.code"
          label="Code"
          type="text"
          class="inherit-full-input"
        />
        <DatePicker
          v-model="form.extra_details.date"
          type="date"
          label="Date"
          class="se-input-gray"
        />
        <cv-text-input
          v-model="form.extra_details.intended_dispenser"
          label="Intended dispenser"
          type="text"
          placeholder="Intended dispenser"
          class="inherit-full-input"
        />
        <cv-text-area
          v-model="form.extra_details.medication_request_notes[0].display"
          label="Medication notes"
          type="text"
          placeholder="Instruction on how to use the drug"
          :rows="3"
          class="inherit-full-input col-span-3"
        />
      </div>

      <SeButton
        :loading="loading"
        :icon="add"
        @click="submit"
      >
        Add Drug
      </SeButton>
    

      <div>
        <p class="mb-2 font-semibold">Previous medications</p>

        <div
          v-if="!currentEncounterMedicationRequests.length"
          class="flex items-center my-4"
        >
          No medication available
        </div>
        <div
          v-else
          class="space-y-3"
        >
          <div
            v-for="(diagnosis, index) in currentEncounterMedicationRequests"
            :key="index"
            class="flex items-center space-x-2"
          >
            <router-link
              class="underline"
              :to="{ name: 'EncounterReview', params: { ...$route.params } }"
            >
              view encounter
            </router-link>
          </div>
        </div>
      </div>
    </SeForm>

    <div class="flex justify-between items-center">
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

export default {
  name: 'EncounterMedications',

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {
        extra_details: {
          medication_request_notes: [{display: ''}],
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
      therapyTypes: [ 'continuous', 'acute', 'seasonal' ],
      categories: [ 'inpatient', 'outpatient', 'community', 'discharge' ],
    }
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
    }),

    ...mapGetters({
      currentEncounterMedicationRequests: 'encounters/currentEncounterMedicationRequests',
    }),
  },

  methods: {
    ...mapActions({
      createMedicationRequest: 'patients/createMedicationRequest',
    }),

    submit(reroute= false) {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill in the required fields')
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.form.requester_practitioner_role = this.provider.practitionerRoleId
        this.form.patient = this.$route.params.id
        this.form.encounter = this.encounter.id
        this.save(reroute)
      }
    },

    async save(reroute) {
      this.loading = true

      try {
        await this.createMedicationRequest(this.formatMedication(this.form))
        this.loading = false
        this.$toast.open({
          message: 'Medication successfully added',
        })
        this.close()
        if (reroute) {
          this.$router.push({ name: 'PatientSummary' })
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        await this.updateServiceRequest(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Medication successfully updated',
        })
        this.close()
      } catch (error) {
        this.loading = false
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
          medication_request_category: [{ display: data.extra_details.medication_request_category }],
        })
      })

      return newForm
    },

    close() {
      this.form = {
        extra_details: {
          medication_request_notes: [{display: ''}],
        },
        drugs: [
          {
            medication_detail: [{display: ''}],
            course_of_therapy_type: '',
            medication_request_dosage_instruction: [{frequency: ''}],
          },
        ],
      },
      this.$v.$reset()
    },
  },
}
</script>
