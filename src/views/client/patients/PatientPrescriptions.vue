<template>
  <div>
    <cv-search
      v-model="search"
      placeholder="Search for medication or date or condition"
    />
    <div class="my-4 flex items-center justify-between">
      <div>
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          All ({{ 23 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
          @click="visible = !visible"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Medications ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
          @click="treatmentVisible = !treatmentVisible"
        >
          <div class="w-2 h-2 rounded-full bg-warning mr-2" />
          Treatment plans ({{ 1 }})
        </cv-button>
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

      <cv-data-table
        ref="table"
        v-model="rowSelects"
        :columns="columns"
        :pagination="{
          numberOfItems: 10,
        }"
        :data="[]"
        class="transparent-table"
        size="tall"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 10"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
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
          </cv-data-table-row>
        </template>
      </cv-data-table>
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
