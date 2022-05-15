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
        <div
          class="py-4"
        >
          <div
            v-if="patient.payment_methods.corporate && patient.payment_methods.corporate.length > 0"
            class="mb-1"
          >
            <div class="text-gray-500"> Corporate account : </div>
            <cv-list
              v-for="(list, index) in patient.payment_methods.corporate"
              :key="index"
            >
              <cv-list-item class=" font-bold">
                - {{ list.description }} ({{ list.status }})
              </cv-list-item>
            </cv-list>
          </div>
          <div
            v-if="patient.payment_methods.patient_user && patient.payment_methods.patient_user.length > 0"
            class="mb-1"
          >
            <div class="text-gray-500"> Patient account : </div>
           
            <cv-list
              v-for="(list, index) in patient.payment_methods.patient_user"
              :key="index"
            >
              <cv-list-item class=" font-bold">
                - {{ list.description }} ({{ list.status }})
              </cv-list-item>
            </cv-list>
          </div>
          <div
            v-if="patient.payment_methods.insurance && patient.payment_methods.insurance.length > 0"
            class="mb-1"
          >
            <div class="text-gray-500"> Insurance account : </div>
            <cv-list
              v-for="(list, index) in patient.payment_methods.insurance"
              :key="index"
            >
              <cv-list-item class=" font-bold">
                - {{ list.description }} ({{ list.status }})
              </cv-list-item>
            </cv-list>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <PharmacyDateFilters
        v-model="lists"
        @input="searchByDate"
      >
        <Search
          v-model="search"
          placeholder="Search prescription..."
          custom-class="se-input-white"
        />
        <MultiSelect
          v-model="filteredStatus"
          title="Status"
          :multiple="false"
          :options="['active', 'draft', 'completed']"
          class="multiselect-white flex-1"
          @input="changeStatus"
        />
      </PharmacyDateFilters>
      <ConfirmPrescriptionModal
        mode="prescription"
        :prescriptions="activeData"
      />
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ConfirmPrescriptionModal from '@/components/pharmacy/modals/ConfirmPrescriptionModal'
import PharmacyDateFilters from '@/components/pharmacy/PharmacyDateFilters'
import DataMixin from '@/mixins/data'
import isWithinInterval from 'date-fns/isWithinInterval'
import parseISO from 'date-fns/parseISO'
import isAfter from 'date-fns/isAfter'
// import isBefore from 'date-fns/isBefore'
// import isAfter from 'date-fns/isAfter'

export default {
  name: 'Prescriptions',

  components: {
    ConfirmPrescriptionModal,
    PharmacyDateFilters,
  },

  mixins: [DataMixin],

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

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
      lists: '',
      search: '',
      searchTerms: ['course_of_therapy_type', 'name', 'practitioner_detail.name'],
      prescriptions: {
        loading: false,
        data: [],
      },
      activeMedications: [],
      created_on_before: '',
      created_on_after: '',
    }
  },

  computed: {
    activeData: {
      get: function () {
        return this.activeMedications.filter(data =>
          !this.search ||
        data.practitioner_detail?.name?.toLowerCase().includes(this.search?.trim().toLowerCase()) ||
        data.medication_detail[0]?.display?.toLowerCase().includes(this.search?.trim().toLowerCase()) ||
        data.course_of_therapy_type?.toLowerCase().includes(this.search?.trim().toLowerCase()),
        )
      },
      // setter
      set: function (newValue) {
        this.activeMedications = newValue
      },
    },

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

    isSelected() {
      return (index) => this.initialSelected === index
    },
  },

  watch: {
    lists: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.searchByDate(val)
        }
      },
    },
  },
  

  created() {
    this.setCheckoutPatient(this.patient)
    this.activeMedications = this.patientMedications.filter(el => el.status == 'active')
    // this.params.patient = this.patient.id
    this.getAllergies(this.patient?.id)
  },

  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
      setCheckoutPatient: 'checkout/setCheckoutPatient',
      getData: 'patients/getMedicationRequests',
      getAllergies: 'patientAllergies/getAllergies',
    }),

    changeStatus(){
      this.activeData = this.patientMedications.filter(el => el.status == this.filteredStatus)
    },
    
    async searchByDate(el){
      if (!el) {
        this.activeData = this.patientMedications
        return
      }
      let d = el?.split(' to ')
      let start = d[0]
      let end = d[1]

      let list = this.patientMedications
      if (!start && !end) return


      list = await this.patientMedications.filter((date) => end ? isWithinInterval(new Date(date.created_at), {
        start: new Date(start),
        end:  new Date(end),
      }) : isAfter(parseISO(date.created_at), parseISO(start)))

      this.activeData = list
    },
  },
}
</script>

