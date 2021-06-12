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
          @success="onPatientCreated"
          @prev="prev"
          @cancel="cancel"
        />
        <AddPrescriptionForm
          :patient="patient"
          :_form="form"
          @success="onMedicationRequestsCreated"
          @prev="prev"
          @cancel="cancel"
        />
        <PrescriptionPaymentForm
          :medication-requests="medicationRequests"
          :patient="patient"
          :_form="form"
          @next="next"
          @prev="prev"
          @cancel="cancel"
        />
        <PrintBillForm
          :medication-requests="medicationRequests"
          :patient="patient"
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
import Patient from '@/models/Patient'

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
      // eslint-disable-next-line
      // patient: new Patient({"id":"a1314487-f67f-4bb0-b700-ae67c169f868","created_at":"2021-06-10T23:09:13.356010Z","modified_at":"2021-06-10T23:09:13.356024Z","status":null,"mr_number":"19957bf6-57d8-4e3e-91cd-cf66f83af05a","address":null,"birth_date":null,"birth_time":null,"blood_type":null,"communication":null,"contact":null,"deceased_date_time":null,"first_name":"CALEB","gender":"MALE","is_active":true,"is_deceased":false,"is_deleted":false,"last_name":"KPABITEY","marital_status":"UNKNOWN","meta":null,"multiple_birth_boolean":null,"multiple_birth_integer":null,"name":null,"other_names":null,"photo":null,"religious_affiliation":null,"user":84,"general_practitioner":null,"managing_organization":"94985fa6-6460-483c-a5fc-4ee11c5a35d9"}).getNormalizedView(),
      patient: null,
      // eslint-disable-next-line
      // medicationRequests: [{"id":"569df134-29f9-4867-acd2-0de3546de4fe","priority":"stat","form":null,"category":null,"code":null,"date":"2021-06-10T00:00:00Z","encounter":null,"visit":null,"intended_dispenser":"New Hospital","patient":null,"medication_detail":[{"id":"ae6e1985-eba9-4851-9f4b-591c5d0c7411","created_at":"2021-06-11T07:59:17.285018Z","is_deleted":false,"modified_at":"2021-06-11T07:59:17.285034Z","display":"Hyoscine hydrobromide (Kwells and Joy-Rides)"}],"careplan":null,"status_reason":null,"status":"active","intent":"order","do_not_perform":false,"performer_practitioner":null,"performer_practitioner_role":null,"requester_practitioner":null,"requester_patient":null,"requester_practitioner_role":"8b5c0858-2ae8-4ff5-8c34-28a7059d7230","recorder_practitioner":null,"recorder_practitioner_role":null,"course_of_therapy_type":"acute","prior_prescription":null,"medication_request_notes":[{"id":"52920dc4-743a-4c2b-9df0-271b42f9c71e","created_at":"2021-06-11T07:59:17.288973Z","modified_at":"2021-06-11T07:59:17.288988Z","display":"Test","medication_request":"569df134-29f9-4867-acd2-0de3546de4fe"}],"medication_request_dosage_instruction":[{"frequency":"1","period":"1","period_unit":"Hours","frequency_unit":"Hourly","strength":null}],"created_at":"2021-06-11T07:59:17.279960Z","modified_at":"2021-06-11T07:59:17.279979Z","medication_request_insurance":[],"medication_request_reason_reference":[],"medication_request_reason_code":[],"medication_request_category":[{"id":"757c3d4a-7fea-4564-80f2-9037b1754145","created_at":"2021-06-11T07:59:17.296416Z","is_deleted":false,"modified_at":"2021-06-11T07:59:17.296430Z","display":"outpatient"}],"medication":{"id":7,"provider":"Nyaho Medical Center 94985fa6-6460-483c-a5fc-4ee11c5a35d9","code":null,"name":"Syrup","batch_number":"EFSD333","rate":null,"purchase_tax_percentage":null,"discount_percentage":null,"unit_price":"45.00","selling_price":"57.00","initial_quantity":99,"net_release_quantity":null,"in_hand_quantity":0,"total_cost_value":null,"expiry_date":"2032-09-02","category":"medical-stock","created_at":"2021-05-14T13:52:06.170644Z","modified_at":"2021-05-14T13:52:06.170670Z","medication":null}}],
      medicationRequests: [],
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
    onPatientCreated(patient) {
      this.patient = new Patient(patient).getNormalizedView()
      this.next({})
    },
    onMedicationRequestsCreated(medicationRequests) {
      this.medicationRequests = medicationRequests
      this.next({})
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
