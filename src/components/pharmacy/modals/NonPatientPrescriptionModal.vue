<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <MultiStepModal
        ref="steps"
        v-model="step"
      >
        <NonPatientDetailsForm
          :_form="form"
          @next="next"
          @prev="prev"
          @cancel="cancel"
        />
        <AddPrescriptionForm
          :_form="form"
          @next="next"
          @prev="prev"
          @cancel="cancel"
        />
        <PrescriptionPaymentForm
          :_form="form"
          @next="next"
          @prev="prev"
          @cancel="cancel"
        />
        <PrintBillForm
          :_form="form"
          @next="next"
          @prev="prev"
          @cancel="cancel"
        />
      </MultiStepModal>
    </template>
  </cv-modal>
</template>
<Checkmark32 />
<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import MultiStepModall from '@/mixins/multistep_modal'
import NonPatientDetailsForm from '@/components/pharmacy/NonPatientDetailsForm'
import AddPrescriptionForm from '@/components/pharmacy/AddPrescriptionForm'
import PrescriptionPaymentForm from '@/components/pharmacy/PrescriptionPaymentForm'
import PrintBillForm from '@/components/pharmacy/PrintBillForm'
import MultiStepModal from '@/components/global/MultiStepModal'

export default {
  name: 'NonPatientPrescriptionModal',

  components: {
    NonPatientDetailsForm,
    AddPrescriptionForm,
    PrescriptionPaymentForm,
    MultiStepModal,
    PrintBillForm,
  },

  mixins: [MultiStepModall],

  data() {
    return {
      form: {a: 1},
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

  methods: {
    cancel() {
      this.visible = false
    },
  },

  events: {
    'pharmacy:nonpatient_prescription:open': function(){
      this.step = 0
      this.visible = true
    },
    'pharmacy:nonpatient_prescription:close': function(){
      this.visible = false
    },
  },
}
</script>
