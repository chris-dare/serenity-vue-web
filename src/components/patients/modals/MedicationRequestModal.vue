<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <cv-form
        autocomplete="off"
        class="space-y-8"
        @submit.prevent
      >
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
              <MultiSelect
                v-model="detail.course_of_therapy_type"
                title="Course of therapy"
                :options="therapyTypes"
                :multiple="false"
              />
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
          class="flex items-center space-x-2 text-serenity-primary my-4 cursor-pointer text-sm"
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
            v-model="form.extra_details.date"
            type="datetime"
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
            v-model="form.extra_details.medication_notes[0].display"
            label="Medication notes"
            type="text"
            placeholder="Instruction on how to use the drug"
            :rows="2"
            class="inherit-full-input col-span-3"
          />
        </div>
        

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
      </cv-form>
    </template>
  </cv-modal>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'


export default {
  name: 'MedicationRequestModal',

  data() {
    return {
      form: {
        extra_details: {
          medication_notes: [{display: ''}],
        },
        drugs: [
          {
            medication_detail: [{display: ''}],
            course_of_therapy_type: '',
            medication_request_dosage_instruction: [{frequency: ''}],
          },
        ],
      },
      icon: ChevronRight,
      visible: false,
      loading: false,
      intentOptions: [ 'proposal', 'plan', 'directive', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option' ],
      statuses: [ 'draft', 'active', 'on-hold', 'revoked', 'completed', 'entered-in-error', 'unknown' ],
      therapyTypes: [ 'continuous', 'acute', 'seasonal' ],
      categories: [ 'inpatient', 'outpatient', 'community', 'discharge' ],
    }
  },

  events: {
    'profile:medication:request:open': function(){
      this.visible = true
    },
    'profile:medication:request:close': function(){
      this.visible = false
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
          patient: this.$route.params.id,
          encounter: this.encounter.id,
          requester_practitioner_role: this.provider.practitionerRoleId,
          medication_request_category: [{ display: data.extra_details.medication_request_category }],
        })
      })

      return newForm
    },

    close() {
      this.form = {
        extra_details: {
          medication_notes: [{display: ''}],
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
      this.visible = false
    },

    addTag(index, tag) {
      this.form.drugs[index].medication_request_dosage_instruction[0].frequency = tag
    },
  },
}
</script>
