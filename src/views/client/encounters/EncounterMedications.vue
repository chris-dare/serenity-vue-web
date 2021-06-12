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
        <p class="text-serenity-primary mb-2">{{ patient.fullName }}'s allergies</p>

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
              custom-field="value"
              label="label"
              track-by="value"
              :multiple="false"
            />
            <!-- <cv-text-input
              v-model="detail.medication_request_dosage_instruction[0].frequency"
              label="Frequency"
              type="number"
              placeholder="eg 2 for twice frequency unit"
              class="inherit-full-input"
            /> -->
            <MultiSelect
              v-model="detail.medication_request_dosage_instruction[0].frequency"
              title="Frequency"
              :options="frequencies"
              :multiple="false"
              preselect
              taggable
              @tag="addTag(index, $event)"
            />
            <cv-text-input
              v-model="detail.medication_request_dosage_instruction[0].period"
              label="Period"
              type="number"
              placeholder="eg 4 days"
              class="inherit-full-input"
            />

            <MultiSelect
              v-model="detail.medication_request_dosage_instruction[0].period_unit"
              title="Period unit"
              :options="units"
              :multiple="false"
              preselect
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
        v-if="mode === 'create'"
        class="flex items-center space-x-2 text-serenity-primary my-4 cursor-pointer text-sm w-auto"
        @click="addDrug"
      >
        <AddAlt class="w-5 h-5" />
        <p class="text-serenity-primary">Add new drug</p>
      </div>
      <div class="grid grid-cols-3 gap-4 items-center">
        <PrioritiesSelect
          v-model="form.extra_details.priority"
          :options="priorities"
        />
        <MultiSelect
          v-model="form.extra_details.medication_request_category"
          title="Medication request category"
          :options="categories"
          :multiple="false"
        />

        <DatePicker
          v-if="!$isCurrentWorkspace('OPD')"
          v-model="form.extra_details.date"
          type="datetime"
          label="Date of administration"
          class="se-input-gray"
        />
        
        <p
          v-if="$utils.validateRequiredField($v, 'extra_details')"
          class="error col-span-3"
        >
          Priority is required
        </p>
        
        <cv-text-area
          v-model="form.extra_details.medication_request_notes[0].display"
          label="Medication notes"
          type="text"
          placeholder="Instruction on how to use the drug"
          :rows="3"
          class="inherit-full-input col-span-3"
        />
      </div>
      

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

export default {
  name: 'EncounterMedications',

  components: { EncounterMedicationTable },

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
      deleteLoading: false,
      intentOptions: [ 'proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option' ],
      statuses: [ 'draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown' ],
      therapyTypes: [
        { label: 'continuous (longterm)', value: 'continuous'},
        { label: 'acute', value: 'acute'},
        { label: 'seasonal', value: 'seasonal'},
      ],
      categories: [ 'inpatient', 'outpatient', 'community', 'discharge' ],
      propertiesToCompareChanges: ['form'],
      columns: [
        'Drug/Proceedure',
        'Type',
        'Duration',
        'Instructions',
        'Action',
      ],
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
      priorities: (state) => state.global.priorities,
      provider: (state) => state.auth.provider,
      encounter: (state) => state.encounters.currentEncounter,
      patient: (state) => state.patients.currentPatient,
      units: (state) => state.global.units,
      frequencies: (state) => state.global.frequencies,
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
    medicationId() {
      this.init()
    },
  },

  methods: {
    ...mapActions({
      createMedicationRequest: 'patients/createMedicationRequest',
      updateMedicationRequest: 'patients/updateMedicationRequest',
      deleteMedicationRequest: 'patients/deleteMedicationRequest',
    }),

    init() {
      if(this.mode === 'update'){
        let medication = this.currentEncounterMedicationRequests.find(el => el.id === this.medicationId)
        medication = JSON.parse(JSON.stringify(medication))
        this.form.extra_details = this.$utils.objectSubset(medication, [
          'medication_request_notes', 'priority',
          'code', 'date', 'category', 'intended_dispenser',
        ])
        this.form.id = medication.id
        let extra_details = this.form.extra_details
        extra_details.medication_request_category 
          = medication.medication_request_category[0].display
        this.form.drugs = medication.medication_detail.map(drug => {
          return {
            medication_detail: [{display: drug.display}],
            course_of_therapy_type: medication.course_of_therapy_type,
            medication_request_dosage_instruction: medication.medication_request_dosage_instruction,
          }
        })
      }
    },

    cancelUpdate() {
      this.$router.go(-1)
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
        payload.id = this.form.id
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

    addTag(index, tag) {
      this.form.drugs[index].medication_request_dosage_instruction[0].frequency = tag
    },
  },
}
</script>
