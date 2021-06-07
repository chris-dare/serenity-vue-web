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
        <div
          v-for="(drug, index) in form.drugs"
          :key="drug.uid"
        >
          <div class="mb-4 grid grid-cols-3 gap-4">
            <cv-select
              v-model="drug.name"
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
              v-model="drug.duration"
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
              v-model="drug.instruction"
              label="Quantiy of drugs "
              placeholder="Instruction on how to use the drug"
              :rows="10"
              class="col-span-2"
            />
          </div>
          <SeButton
            v-if="index == form.drugs.length - 1"
            @click="addRow"
          >
            Add New Drug <Add class="w-4 h-4 text-white ml-4" />
          </SeButton>
          <SeButton
            v-else
            variant="secondary-outline"
            @click="removeRow(index)"
          >
            Remove drug <span class="ml-4">&#8212;</span>
          </SeButton>
        </div>
        <div class="flex items-center justify-between">
          <SeButton variant="secondary">Go back</SeButton>
          <SeButton>Submit<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AddMedicationModal',

  data() {
    return {
      form: {
        drugs: [
        ],
      },
      visible: false,
    }
  },

  events: {
    'pharmacy:add_prescription:open': function(){
      this.$resetData()
      this.addRow()
      this.visible = true
    },
    'pharmacy:add_prescription:close': function(){
      this.visible = false
    },
  },

  methods: {
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
