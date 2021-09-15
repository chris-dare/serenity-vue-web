<template>
  <AppStatePage
    :loading="loading"
    class="h-main"
  >
    <div class="grid grid-cols-4 gap-4 overflow-hidden">
      <div class="overflow-y-auto">
        <EncounterPatientSummary
          :patient="patient"
          :vitals="vitals"
          :status="status"
        />
      </div>

      <div class="col-span-3 bg-white h-full p-8">
        <div>
          <Cart />
        </div>
        <div class="mt-12">
          <div class="flex items-center justify-between">
            <div />
            <SeButton
              :loading="loading"
              :disabled="cart.length == 0"
              @click="checkout"
            >
              Checkout
              <ChevronRight class="w-4 h-4 text-white ml-4" />
            </SeButton>
          </div>
        </div>
      </div>
    </div>

    <CaptureVitalsModal />
    <EndVisitConfirmationModal />
    <BookAppointmentModal />
    <MedicalHistoryModal />
  </AppStatePage>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import EncounterBasicInfo from '@/components/patients/encounters/EncounterBasicInfo'
// import EncounterActions from '@/components/patients/encounters/EncounterActions'
import EncounterPatientSummary from '@/components/patients/encounters/EncounterPatientSummary'
import Cart from '@/components/checkout/Cart'

export default {
  name: 'Dispense',

  components: {
    // EncounterBasicInfo,
    // EncounterActions,
    EncounterPatientSummary,
    Cart,
    CaptureVitalsModal: () => import(/* webpackPrefetch: true */'@/components/vitals/CaptureVitalsModal'),
    EndVisitConfirmationModal: () => import(/* webpackPrefetch: true */'@/components/patients/modals/EndVisitConfirmationModal'),
    BookAppointmentModal: () => import(/* webpackPrefetch: true */'@/components/appointments/book/BookAppointmentModal'),
    MedicalHistoryModal: () => import(/* webpackPrefetch: true */'@/components/patients/encounters/modals/MedicalHistoryModal'),
  },

  data() {
    return {
      loading: false,
      hasEncounter: false,
      visible: false,
      admitModal: false,
      selected: 'action',
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.checkout.existingPatient,
      currentEncounter: (state) => state.encounters.currentEncounter,
      cart: (state) => state.checkout.cart,
    }),

    ...mapGetters({
      vitals: 'encounters/currentEncounterLatestVitals',
      status: 'encounters/currentEncounterStatus',
    }),

    links() {
      return [
        // { label: 'Basic Info', slug: 'basic-info' },
        { label: 'Action', slug: 'action' },
      ]
    },

    selectedComponent() {
      if (this.selected === 'basic-info') {
        return 'EncounterBasicInfo'
      }

      return 'EncounterActions'
    },
  },

  methods: {
    ...mapActions({
      initSinglePatientInformation: 'patients/initSinglePatientInformation',
      endEncounter: 'encounters/endEncounter',
      setCurrentEncounterState: 'encounters/setCurrentEncounterState',
    }),

    checkout() {
      if(this.patient){
        this.$router.push({name: 'CheckoutPaymentOptions'})
      }else{
        this.$router.push({name: 'CheckoutSelectPatient'})
      }
    },
  },
}
</script>
