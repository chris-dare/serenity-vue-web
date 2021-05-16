<template>
  <div class="w-4/5 mx-auto">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center space-x-4">
          <ImageBlock
            :url="patient.url"
            :alt="patient.name"
          />
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-secondary  capitalize">
              {{ patient.gender_age_description }}
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
              <p>MR No: {{ patient.mr_number }}</p>
            </div>
          </div>
        </div>
        <div
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img
            src="@/assets/img/edit 1.svg"
            class="w-4 h-4"
          >
        </div>
      </div>
      <div class="flex items-center space-x-4" />
    </div>

    <div class="flex my-4 mb-8">
      <PatientCard
        v-for="(dashboard, index) in availableActions"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <div class="text-xl font-bold mb-4">
      Prescribed Medications
    </div>
    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :data="prescriptions.data"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div>
              <p>{{ row.drug }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.quantity }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.instruction }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <!-- <p>{{ row.date }}</p> -->
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <div class="flex items-center justify-between mt-4 mb-6">
      <cv-button
        class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
        kind="tertiary"
        @click="$router.back()"
      >
        Go Back
      </cv-button>
      <cv-button-skeleton
        v-if="loading"
      />
      <cv-button
        v-else
        :icon="icon"
        kind="primary"
        class="bg-serenity-primary hover:bg-serenity-primary-highlight  ml-6"
        @click="$trigger('pharmacy:confirm_prescription:open')"
      >
        Give drugs
      </cv-button>
    </div>
    <ConfirmPrescriptionModal />
    <AddPrescriptionModal />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ConfirmPrescriptionModal from '@/components/pharmacy/modals/ConfirmPrescriptionModal'
import AddPrescriptionModal from '@/components/pharmacy/modals/AddPrescriptionModal'
import PatientCard from '@/components/appointments/PatientCard'

export default {
  name: 'Patient',

  components: { 
    ConfirmPrescriptionModal,
    PatientCard,
    AddPrescriptionModal,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      hasEncounter: false,
      visible: false,
      admitModal: false,
      prescriptions: {
        data: [
          {
            drug: 'Hydrocodone 5MG / 500MG tabs',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
        ],
        state: null,
      },
      columns: [
        'Drug Name',
        'Quantity',
        'Instruction',
        'Refill',
      ],
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
    }),
    availableActions() {
      const types = [
        {
          label: 'View Prescription',
          description: 'See all prescribed drugs',
          type: 'medication',
          value: 'search',
        },
        {
          label: 'New prescription',
          description: 'See all prescribed drugs',
          type: 'medication',
          value: 'new',
        },
      ]

      return types
    },
    links() {
      let links = [
        { label: 'Summary', path: 'PatientSummary' },
      ]

      if (this.workspaceType === 'Reception') {
        links.push({ label: 'Chart', path: 'PatientCharts' },{ label: 'Appointments', path: 'PatientAppointments' })
      } else {
        links.push(
          { label: 'Timeline', path: 'PatientTimeline' },
          { label: 'Chart', path: 'PatientCharts' },
          { label: 'Appointments', path: 'PatientAppointments' },
          { label: 'Encounters', path: 'PatientEncounters' },
          { label: 'Prescriptions', path: 'PatientPrescriptions' },
          { label: 'Orders/Billing', path: 'PatientOrders' },
          { label: 'Reports', path: 'PatientReports' },
          { label: 'Notes', path: 'PatientNotes' })
      }
      return links

    },

    isSelected() {
      return (index) => this.initialSelected === index
    },
  },

  created() {
    this.findPatient(this.id)
  },

  methods: {
    ...mapActions({
      findPatient: 'patients/findPatient',
    }),
    change(dashboard){
      if (dashboard.value === 'new') {
        this.$trigger('pharmacy:add_prescription:open')
      }
    },
  },
}
</script>
