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
        <p class="text-lg font-semibold">Prescriptions</p>
        <div>
          <div
            v-for="row in prescriptions.data"
            :key="row.drug"
            class="border-b border-gray-200 pb-6 mb-6 border-solid"
          >
            <div class="flex text-gray-500 text-sm mb-2">
              <div class="w-1/4">
                <div>Name of medicine</div>
              </div>
              <div class="w-1/4">
                <div>Duration</div>
              </div>
              <div class="w-1/4">
                <div>Dosage</div>
              </div>
              <div class="w-1/4">
                <div>Instruction</div>
              </div>
            </div>
            <div class="flex mb-2">
              <div class="w-1/4">
                <div>{{ row.drug }}</div>
              </div>
              <div class="w-1/4">
                <div>{{ row.duration }}</div>
              </div>
              <div class="w-1/4">
                <div>{{ row.dosage }}</div>
              </div>
              <div class="w-1/4">
                <div>{{ row.instruction }}</div>
              </div>
            </div>
            <div class="flex items-center justify-end mt-4">
              <SeButton class="mr-4">Prescription filled<Checkmark class="w-4 h-4 text-white ml-4" /></SeButton>
              <SeButton variant="danger-outline">
                Drug is unavailable <span class="ml-4">&#8212;</span>
              </SeButton>
            </div>
          </div>
        </div>
        <div />
      </div>
    </template>
  </cv-modal>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'

export default {
  name: 'ConfirmPrescriptionModal',

  data() {
    return {
      form: {},
      visible: false,
      icons: {
        Checkmark,
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

  events: {
    'pharmacy:confirm_prescription:open': function(){
      this.visible = true
    },
    'pharmacy:confirm_prescription:close': function(){
      this.visible = false
    },
  },
}
</script>
