<template>
  <div class="space-y-4">
    <p class="text-lg font-semibold">Medication</p>
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
          <AutoCompletePharmacyInventory
            v-model="detail.inventory"
            :medication-request="detail"
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
          <cv-text-input
            v-model="detail.medication_request_dosage_instruction[0].frequency"
            label="Frequency"
            type="number"
            placeholder="eg 2 for twice frequency unit"
            class="inherit-full-input"
          />
          <MultiSelect
            v-model="detail.medication_request_dosage_instruction[0].frequency_unit"
            title="Frequency unit"
            :options="frequencies"
            :multiple="false"
            preselect
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

      <DatePicker
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

    <div class="flex items-center justify-between">
      <SeButton variant="secondary">Go back</SeButton>
      <SeButton
        :loading="loading"
        :icon="add"
        @click="submit"
      >
        Submit
      </SeButton>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'

export default {
  name: 'AddMedicationModal',

  data() {
    return {
      mode: 'create',
      icon: ChevronRight,
      add: Add,
      loading: false,
      /* eslint-disable-next-line */
      // form: {"extra_details":{"medication_request_notes":[{"display":"Test"}],"medication_request_category":"outpatient","priority":"stat","date":"2021-06-10T00:00:00Z","intended_dispenser":"New Hospital"},"drugs":[{"medication_detail":[{"display":"Hyoscine hydrobromide (Kwells and Joy-Rides)"}],"course_of_therapy_type":"acute","medication_request_dosage_instruction":[{"frequency":"1","frequency_unit":"Hourly","period_unit":"Hours","period":"1"}]}],"requester":1},
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
      intentOptions: [ 'proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option' ],
      statuses: [ 'draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown' ],
      therapyTypes: [
        { label: 'continuous (longterm)', value: 'continuous'},
        { label: 'acute', value: 'acute'},
        { label: 'seasonal', value: 'seasonal'},
      ],
      categories: [ 'inpatient', 'outpatient', 'community', 'discharge' ],
      visible: false,
    }
  },

  computed: {
    ...mapState({
      priorities: (state) => state.global.priorities,
      provider: (state) => state.auth.provider,
      units: (state) => state.global.units,
      user: (state) => state.auth.user,
      frequencies: (state) => state.global.frequencies,
    }),
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
          inventory: { required },
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

  events: {
    'pharmacy:add_prescription:open': function(){
      // this.$resetData()
      this.visible = true
    },
    'pharmacy:add_prescription:close': function(){
      this.visible = false
    },
  },

  methods: {
    ...mapActions({
      createMedicationRequest: 'patients/createMedicationRequest',
      dispenseDrugs: 'patients/dispenseDrugs',
    }),
    formatMedication(data) {
      let newForm = []

      data.drugs.forEach(drug => {
        newForm.push({
          ...drug,
          ...data.extra_details,
          requester_practitioner_role: this.provider.practitionerRoleId,
          patient: this.$route.params.id,
          medication_request_category: [{ display: data.extra_details.medication_request_category }],
        })
      })

      return newForm
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

    submit() {
      
      if (this.dataHasNotChanged) {
        this.close()
        return
      }

      console.info('submit')
      this.$v.$touch()

      this.form.extra_details.intended_dispenser = this.provider.organization_name


      if (this.$v.$invalid) {
        this.$toast.error('Please fill in the required fields')
        return
      }
      this.save()
    },

    async save() {
      this.loading = true

      try {
        this.form.requester = this.user.id
        let medicationRequests = await this.createMedicationRequest(this.formatMedication(this.form))
        for(let i = 0; i < this.form.drugs.length; i++){
          medicationRequests[i].medication = this.form.drugs[i].inventory
        }
        this.$emit('success', medicationRequests)
        this.loading = false
        this.close()
      } catch (error) {
        this.loading = false
        throw(error)
      }
    },

    close() {
      this.visible = false
    },
    
  },
}
</script>
