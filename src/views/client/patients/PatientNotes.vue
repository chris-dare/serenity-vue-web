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
          Doctor’s Notes ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
        >
          Nurse’s Notes ({{ 1 }})
        </cv-button>
      </div>
    </div>
    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Notes</p>
        <div
          class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center cursor-pointer"
        >
          <Add32 class="w-4 h-4 text-serenity-primary" />
        </div>
      </div>

      <cv-data-table
        ref="table"
        v-model="rowSelects"
        :columns="columns"
        :data="[]"
        class="transparent-table"
        size="tall"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 3"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <p class="">{{ $date.formatDate($faker().date.recent(), 'MMM. dd, yyyy') }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <img
                  class="w-10 h-10 rounded-full mr-3"
                  :src="$faker().image.image()"
                  alt=""
                >
                <div>
                  <p>Dr. {{ $faker().name.findName() }}</p>
                  <p class="text-secondary text-xs">
                    General Practitioner
                  </p>
                </div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>In Patient</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="font-semibold underline ml-2">View encounter</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div
                class="flex items-center cursor-pointer "
                @click="showOrder(row)"
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
    <PatientNotesModal :visible.sync="visible" />
  </div>
</template>

<script>
import PatientNotesModal from '@/components/patients/modals/PatientNotesModal'
import Add32 from '@carbon/icons-vue/es/add/32'
export default {
  name: 'PatientNotes',

  components: { PatientNotesModal, Add32 },

  data() {
    return {
      search: '',
      rowSelects: null,
      columns: [
        'Date',
        'Written By',
        'Area',
        'Encounter',
        'Action',
      ],
      visible: false,
      order: {},
    }
  },

  methods: {
    showOrder(data) {
      this.order = data
      this.visible = true
    },
  },
}
</script>
