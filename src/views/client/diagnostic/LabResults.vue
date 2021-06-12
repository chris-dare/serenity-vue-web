<template>
  <div class="w-4/5 mx-auto">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center space-x-4">
          <ImageBlock
            url=""
            alt="Dadson Papa"
          />
          <div>
            <p class="text-lg font-bold">Dadson Papa</p>
            <p class="text-secondary  capitalize">
              Male, 22 years
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
              <p>MR No: 230</p>
            </div>
          </div>
        </div>
        <div
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img
            src="@/assets/img/edit 1.svg"
            class="w-4 h-4 cursor-pointer"
          >
        </div>
      </div>
      <div class="flex items-center text-right space-x-2">
        <div>
          <p class="text-lg font-bold">Men ward</p>
          <p class="text-secondary ">
            Room 2, bed No 05
          </p>
        </div>
        <!-- <DiagnoticActions /> -->
      </div>
    </div>
    <div class="space-y-4 my-6">
      <!-- <p class="text-serenity-primary font-semibold">
        Perform action
      </p>
      <div class="grid grid-cols-5 gap-2 lg:gap-4 my-4">
        <InfoLinkCard
          v-for="(dashboard, index) in dashboardTypes"
          :key="index"
          :is-selected="selected === dashboard.value"
          :details="dashboard"
          :type="dashboard.type"
          custom-class="bg-white border-0"
          @click="onCardClick(dashboard.value)"
        />
      </div> -->

      <LabsTable />
    </div>

    <AddLabResultsModal />
    <ViewLabResultsModal />
  </div>
</template>

<script>
import LabsTable from '@/components/diagnostic/LabRequests'
import AddLabResultsModal from '@/components/diagnostic/modals/AddLabResultsModal'
import ViewLabResultsModal from '@/components/diagnostic/modals/ViewLabResultsModal'
// import PatientInfoCard from '@/components/patients/PatientInfoCard'

export default {
  name: 'Patient',

    
  components: { LabsTable, AddLabResultsModal, ViewLabResultsModal },

  data() {
    return {
      selected: '',
    }
  },

  computed: {
    dashboardTypes() {
      return [
        {
          label: 'Add Labs',
          description: 'Create a new lab test for patient',
          type: 'add',
          value: 'add',
        },
        {
          label: 'Enter Lab Results',
          description: 'Enter results for the tests taken',
          type: 'edit',
          value: 'result',
        },
        {
          label: 'Sample Requests',
          description: 'Accept or decline sample requests',
          type: 'lab',
          value: 'sample',
        },
        {
          label: 'View Lab results',
          description: 'View previous enteted lab results',
          type: 'lists',
          value: 'view',
        },
      ]
    },
  },

  methods: {
    onCardClick(action) {
      switch (action) {
      case 'add':
        this.$trigger('lab:add:open')
        break
      case 'view':
        this.$trigger('lab:view:open')
        break
          
      default:
        break
      }
    },
  },
}
</script>