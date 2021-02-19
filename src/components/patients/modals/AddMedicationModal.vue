<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-4">
        <p class="text-lg font-semibold">Medication</p>
        <div class="grid grid-cols-3 gap-4">
          <cv-select
            v-model="form.name"
            label="Name of medicine"
          >
            <cv-select-option
              disabled
              selected
              hidden
            >
              Name of drug
            </cv-select-option>
            <cv-select-option
              value="network"
            >
              In Patient Department
            </cv-select-option>
          </cv-select>
          <cv-select
            v-model="form.duration"
            label="Duration"
          >
            <cv-select-option
              disabled
              selected
              hidden
            >
              Number of days
            </cv-select-option>
            <cv-select-option
              value="network"
            >
              In Patient Department
            </cv-select-option>
          </cv-select>

          <cv-text-input
            label="Dosage"
            type="text"
            placeholder="Quantity of drugs "
            class="inherit-full-input"
          />
          <cv-text-area
            v-model="form.instruction"
            label="Quantiy of drugs "
            placeholder="Instruction on how to use the drug"
            :rows="10"
            class="col-span-2"
          />
          <cv-text-input
            label="Price"
            type="text"
            placeholder="Price"
            class="inherit-full-input"
          />
        </div>
        <SeButton>Add New Drug <Add32 class="w-4 h-4 text-white ml-4" /></SeButton>
        <div class="flex items-center justify-between">
          <SeButton variant="secondary">Go back</SeButton>
          <SeButton>Submit<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import Add32 from '@carbon/icons-vue/es/add/32'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'AddMedicationModal',

  components: { Add32, ChevronRight },

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'profile:medication:open': function(){
      this.visible = true
    },
    'profile:medication:close': function(){
      this.visible = false
    },
  },
}
</script>
