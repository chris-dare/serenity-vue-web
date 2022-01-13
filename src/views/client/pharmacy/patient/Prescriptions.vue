<template>
  <div>
    <div class="flex bg-white p-2 mb-8">
      <div class="w-1/4 border-r border-serenity-subtle-border border-solid pt-4 px-6">
        <div class="bx--tabs__nav-item--selected mb-2"><div class="bx--tabs__nav-link border-none">Allergies</div></div>
        <div>
          <p
            v-if="!patientAllergies.length"
            class="text-sm py-8 text-gray-400"
          >
            No allergies
          </p>
          <span
            v-for="(allergy, index) in patientAllergies"
            :key="index"
            class="inline-block px-2 bg-gray-200 mr-2 mb-1 rounded-full"
          >
            {{ allergy.code }}
          </span>
        </div>
      </div>
      <div class="w-2/4 px-6  border-r border-serenity-subtle-border border-solid">
        <cv-tabs
          class="se-tabs"
          :container="false"
          aria-label="navigation tab label"
        >
          <cv-tab
            id="tab-1"
            label="Final Diagnosis"
          >
            <div class="py-3 font-bold text-gray-500">
              <div
                v-for="diag in finalDiagnosis"
                :key="diag.id"
                class="py-1"
              >
                {{ diag.condition }}
              </div>
            </div>
          </cv-tab>
          <cv-tab
            id="tab-2"
            label="Provisional Diagnosis"
          >
            <div class="py-3 font-bold text-gray-500">
              <div
                v-for="diag in provisionalDiagnosis"
                :key="diag.id"
                class="py-1"
              >
                {{ diag.condition }}
              </div>
            </div>
          </cv-tab>
        </cv-tabs>
      </div>
      <div class="w-1/4 pt-4 px-6">
        <div class="bx--tabs__nav-item--selected"><div class="bx--tabs__nav-link border-none">Payment methods</div></div>
        <div />
        <div
          class="py-4 font-bold text-gray-500"
        >
          <div
            v-if="corporateAccounts && corporateAccounts.length > 0"
            class="mb-1"
          >
            Corporate account ({{ corporateAccountNames }})
          </div>
          <div v-if="userAccounts && corporateAccounts.length > 0">User account</div>
        </div>
      </div>
    </div>
    <PharmacyDateFilters
      v-model="lists"
    >
      <Search
        v-model="params.search"
        placeholder="Search for prescription..."
      />
    </PharmacyDateFilters>
    <ConfirmPrescriptionModal
      mode="prescription"
      :prescriptions="activeMedications"
    />
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ConfirmPrescriptionModal from '@/components/pharmacy/modals/ConfirmPrescriptionModal'
import PharmacyDateFilters from '@/components/pharmacy/PharmacyDateFilters'
import DataMixin from '@/mixins/paginated'

export default {
  name: 'Prescriptions',

  components: {
    ConfirmPrescriptionModal,
    PharmacyDateFilters,
  },

  mixins: [DataMixin],

  data() {
    return {
      filteredStatus: 'active',
      loading: false,
      columns: [
        'Drug Name',
        'Quantity',
        'Instruction',
        'Refill',
      ],
      lists: {},
      prescriptions: {
        loading: false,
        data: [],
      },
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      patientAllergies: state => state.patientAllergies.allergies,
      workspaceType: (state) => state.global.workspaceType,
    }),
    ...mapGetters({
      patientMedications: 'patients/patientMedications',
      currentEncounterDiagnosis: 'encounters/currentEncounterDiagnosis',
      userAccounts: 'billing/userAccounts',
      corporateAccounts: 'billing/corporateAccounts',
    }),
    corporateAccountNames(){
      return this.corporateAccounts.map(el => el.description).join(', ')
    },
    userAccountNames(){
      return this.userAccounts.map(el => el.description).join(', ')
    },
    provisionalDiagnosis() {
      return this.currentEncounterDiagnosis.filter(el => {
        return el.status === 'PROVISIONAL'
      })
    },
    finalDiagnosis() {
      return this.currentEncounterDiagnosis.filter(el => {
        return el.status !== 'PROVISIONAL'
      })
    },
    availableActions() {
      const types = [
        {
          label: 'New Prescription',
          description: 'Create a new prescription',
          type: 'add',
          value: 'new',
        },
      ]

      return types
    },
    activeMedications() {
      return this.patientMedications.filter(el => el.status == 'active')
    },

    isSelected() {
      return (index) => this.initialSelected === index
    },
  },

  watch: {
    lists: {
      handler(val){
        if(val){

          if (val.end) {
            this.params.created_on__before = this.$date.formatQueryParamsDate(val.end)
            this.params.created_on__after = this.$date.formatQueryParamsDate(val.start || Date.now())
          }
          this.searchData()
        }
      },
    },
  },

  created() {
    this.setCheckoutPatient(this.patient)
  },

  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
      setCheckoutPatient: 'checkout/setCheckoutPatient',
    }),
  },
}
</script>

