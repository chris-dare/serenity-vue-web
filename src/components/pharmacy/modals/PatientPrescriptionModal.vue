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
        <ConfirmPrescriptionModal
          v-if="mode == 'confirm'"
          :prescriptions="medicationRequests"
          @cancel="cancel"
          @success="onPrescriptionsConfirmed"
        />
        <AddPrescriptionModal
          v-else
          @success="onPrescriptionsConfirmed"
        />
        <PrescriptionPaymentForm
          :medication-requests="medicationRequestsToDispense"
          :patient="patient"
          :_form="form"
          @success="onPrescriptionDispensed"
          @prev="prev"
          @cancel="cancel"
        />
        <PrintBillForm
          :_form="form"
          :medication-requests="medicationRequestsToDispense"
          :patient="patient"
          @success="onPrescriptionPrinted"
          @prev="prev"
          @cancel="cancel"
        />
      </MultiStepModal>
    </template>
  </cv-modal>
</template>
<Checkmark32 />
<script>
import { mapState } from 'vuex'
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import MultiStepModall from '@/mixins/multistep_modal'
import PrescriptionPaymentForm from '@/components/pharmacy/PrescriptionPaymentForm'
import PrintBillForm from '@/components/pharmacy/PrintBillForm'
import MultiStepModal from '@/components/global/MultiStepModal'
// import Patient from '@/models/Patient'
import AddPrescriptionModal from '@/components/pharmacy/modals/AddPrescriptionModal'
import ConfirmPrescriptionModal from '@/components/pharmacy/modals/ConfirmPrescriptionModal'

export default {
  name: 'PatientPrescriptionModal',

  components: {
    PrescriptionPaymentForm,
    ConfirmPrescriptionModal,
    MultiStepModal,
    AddPrescriptionModal,
    PrintBillForm,
  },

  mixins: [MultiStepModall],

  props: {
    medicationRequests: {
      type: Array,
      default: () => null,
    },
  },

  data() {
    return {
      form: {},
      visible: false,
      mode: 'confirm',
      icons: {
        Checkmark,
      },
      medicationRequestsToDispense: [],
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
    }),
  },

  methods: {
    cancel() {
      this.visible = false
    },
    onPrescriptionsConfirmed(medicationRequests) {
      this.medicationRequestsToDispense = medicationRequests
      this.next()
    },
    onPrescriptionDispensed() {
      this.next()
    },
    onPrescriptionPrinted() {

    },
  },

  events: {
    'pharmacy:patient_prescription:open': function(mode = 'confirm'){
      this.step = 0
      this.visible = true
      this.mode = mode
    },
    'pharmacy:patient_prescription:close': function(){
      this.visible = false
    },
  },
}
</script>
