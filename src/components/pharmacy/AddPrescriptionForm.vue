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
        Checkout
      </SeButton>
    </div>
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'

export default {
  name: 'AddPrescriptionForm',

  props: {
    step: {
      type: [Number, String],
      default: null,
    },

    patient: {
      type: [Object, String],
      default: null,
    },
  },

  data() {
    return {
      // eslint-disable-next-line
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
      visible: false,
      icons: {
        Checkmark,
        ChevronRight,
        Add,
      },
      prescriptions: {
        data: [
          {
            drug: 'Hydrocodone 5MG / 500MG tabs',
            duration: '7 days',
            dosage: '2 times daily',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
          {
            drug: 'Efpac 5MG / 500MG tabs',
            duration: '7 days',
            dosage: '2 times daily',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
        ],
        state: null,
      },
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
          medication_detail: {
            required,
            minLength: minLength(1),
            $each: {
              display: { required },
            },
          },
          inventory: required,
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

  methods: {
    ...mapActions({
      createMedicationRequest: 'patients/createMedicationRequest',
    }),
    submit() {
      if (this.dataHasNotChanged) {
        this.close()
        return
      }

      console.info('submit')
      this.$v.$touch()

      this.form.extra_details.intended_dispenser = this.provider.organization_name


      if (this.$v.$invalid) {
        console.info('submit 2')
        this.$toast.error('Please fill in the required fields')
        return
      }
      this.save()
    },

    async save() {
      this.loading = true

      try {
        this.form.requester = this.user.id
        const payload = this.formatMedication(this.form)
        console.info('pay ', this.form.drugs)
        let medicationRequests = await this.createMedicationRequest(payload)
        for(let i = 0; i < this.form.drugs.length; i++){
          medicationRequests[i].medication = this.form.drugs[i].inventory
        }
        this.$emit('success', medicationRequests)
        this.loading = false
      } catch (error) {
        this.loading = false
        throw(error)
      }
    },

    formatMedication(data) {
      let newForm = []

      data.drugs.forEach(drug => {
        newForm.push({
          ...drug,
          ...data.extra_details,
          requester_practitioner_role: this.provider.practitionerRoleId,
          patient: this.patient.id,
          medication_request_category: [{ display: data.extra_details.medication_request_category }],
        })
      })

      return newForm
    },

    prev() {
      this.$emit('prev')
    },
    addRow() {
      this.form.drugs.push({
        uid: Math.random().toString(36).substring(7),
        name: '',
        quantity: '',
        duration: '',
        instruction: '',
      })
    },
    removeRow(index) {
      const drugs = this.form.drugs
      drugs.splice(index, 1)
    },
  },
}
</script>
