<template>
  <div>
    <Search
      v-model="search"
      placeholder="Search for medication or date or condition"
    />
    <div class="my-4 flex items-center justify-between">
      <div class="space-x-2">
        <SeButton>
          All ({{ 23 }})
        </SeButton>
        <SeButton
          variant="white"
          @click="visible = !visible"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Medications ({{ 1 }})
        </SeButton>
        <SeButton
          variant="white"
          @click="treatmentVisible = !treatmentVisible"
        >
          <div class="w-2 h-2 rounded-full bg-warning mr-2" />
          Treatment plans ({{ 1 }})
        </SeButton>
      </div>
    </div>
    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Prescriptions</p>
        <div
          class="bg-serenity-light-gray w-9 h-9 rounded-full ml-6 flex items-center justify-center"
        >
          <img
            src="@/assets/img/pills--add 1.svg"
            class="w-4 h-4"
          >
        </div>
      </div>

      <DataTable
        ref="table"
        :columns="columns"
        :pagination="{
          numberOfItems: 10,
        }"
        :data="[]"
        class="transparent-table"
      >
        <cv-data-table-cell>
          <p class="text-serenity-primary ">{{ $faker().lorem.word() }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p class="">{{ $faker().lorem.word() }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p class="">{{ $faker().lorem.word() }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p class="">{{ $faker().lorem.word() }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer "
            @click="showPrescription(row)"
          >
            View
            <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
              <img
                src="@/assets/img/view 1.svg"
                alt=""
              >
            </div>
          </div>
        </cv-data-table-cell>
      </DataTable>
    </div>
    <PrescriptionModal :visible.sync="visible" />
    <TreatmentPlanModal :visible.sync="treatmentVisible" />
  </div>
</template>

<script>
import PrescriptionModal from '@/components/patients/modals/PrescriptionModal'
import TreatmentPlanModal from '@/components/patients/modals/TreatmentPlanModal'
export default {
  name: 'PatientPrescriptions',

  components: { PrescriptionModal, TreatmentPlanModal },

  data() {
    return {
      search: '',
      rowSelects: null,
      columns: [
        'Drug/Proceedure',
        'Type',
        'Duration',
        'Instructions',
        'Action',
      ],
      visible: false,
      prescription: {},
      treatmentVisible: false,
    }
  },

  methods: {
    showPrescription(data) {
      this.prescription = data
      this.visible = true
    },
  },
}
</script>

<style></style>
