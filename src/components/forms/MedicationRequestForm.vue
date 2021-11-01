<template>
  <div class="space-y-4">
    <div
      v-for="(drug, index) in localValue.drugs"
      :key="index"
    >
      <p class="text-serenity-green font-semibold mb-4">{{ index+1 }}.</p>
      <div class="grid grid-cols-12 gap-x-4 gap-y-8 items-center">
        <div class="col-span-11 grid grid-cols-3 gap-4 items-center">
          <AutoCompleteMedication
            v-model="drug.medication_detail[0].display"
            class="col-span-3"
          />
          <MultiSelect
            v-model="drug.course_of_therapy_type"
            title="Course of therapy"
            :options="therapyTypes"
            custom-field="value"
            label="label"
            track-by="value"
            :multiple="false"
          />
          <MultiSelect
            v-model="drug.medication_request_dosage_instruction[0].route"
            title="Route of drug administration"
            :options="dosageRoutes"
            :multiple="false"
            custom-field="code"
            label="display"
            track-by="code"
            preselect
          />

          <cv-text-input
            v-model="drug.medication_request_dosage_instruction[0].strength"
            label="Strength"
            type="text"
            class="inherit-full-input"
          />

          <MultiSelect
            v-model="drug.medication_request_dosage_instruction[0].frequency"
            title="Frequency"
            :options="frequencies"
            :multiple="false"
            preselect
            taggable
            @tag="addTag(index, $event)"
          />

          <cv-text-input
            v-model="drug.medication_request_dosage_instruction[0].period"
            label="Period"
            type="number"
            placeholder="eg 4 days"
            class="inherit-full-input"
          />

          <MultiSelect
            v-model="drug.medication_request_dosage_instruction[0].period_unit"
            title="Period unit"
            :options="units"
            :multiple="false"
            preselect
          />          


          <DatePicker
            v-if="!$isCurrentWorkspace('OPD')"
            v-model="drug.next_refill"
            type="datetime"
            label="Next refill"
            class="se-input-gray"
          />
          <cv-number-input
            v-if="!$isCurrentWorkspace('OPD')"
            v-model="drug.quantity"
            label="Quantity"
            type="number"
            placeholder="Quantity"
            class="se-input-gray"
          />
        </div>

        <Trash
          class="w-5 h-5 cursor-pointer"
          @click="removeDrug(index)"
        />
      </div>
    </div>
    <p
      v-if="$utils.validateRequiredField(v, 'drugs')"
      class="error col-span-2"
    >
      All fields are required for drugs
    </p>

    <div
      v-if="mode === 'create'"
      class="flex items-center space-x-2 text-serenity-primary my-6 cursor-pointer text-sm w-auto"
      @click="addDrug"
    >
      <AddAlt class="w-5 h-5" />
      <p class="text-serenity-primary">Add new drug</p>
    </div>

    <div class="grid grid-cols-2 gap-4 items-center">
      <PrioritiesSelect
        v-model="localValue.extra_details.priority"
        :options="priorities"
      />

      <MultiSelect
        v-model="localValue.extra_details.medication_request_category"
        title="Medication request category"
        :options="categories"
        :multiple="false"
      />

      <DatePicker
        v-if="!$isCurrentWorkspace('OPD')"
        v-model="localValue.extra_details.date"
        type="datetime"
        label="Date of administration"
        class="se-input-gray col-span-2"
      />

      <p
        v-if="$utils.validateRequiredField(v, 'extra_details')"
        class="error col-span-2"
      >
        Priority is required
      </p>

      <cv-text-area
        v-model="localValue.extra_details.medication_request_notes[0].display"
        label="Medication notes"
        type="text"
        placeholder="Instruction on how to use the drug"
        :rows="3"
        class="inherit-full-input col-span-2 se-input-gray"
      />
    </div>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import { mapState } from 'vuex'
export default {
  name: 'MedicationRequestForm',

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: () => {},
    },

    mode: {
      type: String,
      default: 'create',
    },
  },

  data() {
    return {
      therapyTypes: [
        { label: 'continuous (longterm)', value: 'continuous'},
        { label: 'acute', value: 'acute'},
        { label: 'seasonal', value: 'seasonal'},
      ],
      categories: [ 'inpatient', 'outpatient', 'community', 'discharge' ],
    }
  },

  computed: {
    ...mapState({
      frequencies: (state) => state.global.frequencies,
      units: (state) => state.global.units,
      priorities: (state) => state.global.priorities,
      dosageRoutes: (state) => state.resources.dosageRoutes,
    }),
  },

  created() {
    this.localValue.extra_details.priority = 'routine'
  },

  methods: {
    addDrug() {
      this.localValue.drugs.push({
        medication_detail: [{display: ''}],
        course_of_therapy_type: '',
        medication_request_dosage_instruction: [{frequency: ''}],
      })
    },

    removeDrug(index) {
      this.localValue.drugs.splice(index, 1)
    },

    addTag(index, tag) {
      this.form.drugs[index].medication_request_dosage_instruction[0].frequency = tag
    },
  },
}
</script>

