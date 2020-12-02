<template>
  <div>
    <cv-search
      placeholder="Search for patient, enter name or MR number"
      v-model="search"
    >
    </cv-search>
    <div class="my-4 flex items-center justify-between">
      <div>
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          All ({{ patientsCount }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-gray-900"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2"></div>
          Delayed ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-gray-900"
        >
          <div class="w-2 h-2 rounded-full bg-serenity-warning mr-2"></div>
          Urgent ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-gray-900"
        >
          Male({{ maleCount }})
          <img src="@/assets/img/gender--male 1.svg" class="ml-2" alt="" />
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-gray-900"
        >
          Female({{ femaleCount }})
          <img src="@/assets/img/gender--female 1.svg" class="ml-2" alt="" />
        </cv-button>
      </div>
      <cv-button
        size="field"
        kind="ghost"
        class="px-4 bg-white hover:bg-white mr-2 text-gray-900"
      >
        Filters
        <img src="@/assets/img/filter 1.svg" class="ml-2" alt="" />
      </cv-button>
    </div>

    <div>
      <cv-data-table
        :row-size="rowSize"
        :sortable="sortable"
        :columns="columns"
        :pagination="{
          numberOfItems: patientsCount,
        }"
        @pagination="actionOnPagination"
        v-model="rowSelects"
        @row-select-change="actionRowSelectChange"
        @sort="onSort"
        :overflow-menu="sampleOverflowMenu"
        :data="patients"
        @overflow-menu-click="onOverflowMenuClick"
        ref="table"
      >
        <template slot="batch-actions">
          <cv-button>
            Delete
          </cv-button>
        </template>
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in patients"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <img
                  class="w-12 h-12 rounded-full mr-3"
                  :src="row.image"
                  alt=""
                />
                <div>
                  <p class="text-sm">{{ row.name }}</p>
                  <p class="text-gray-400 text-xs">
                    {{ row.gender }}, {{ row.age }} years
                  </p>
                </div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ row.weight }}kg</p>
                <p class="text-gray-400 text-xs">{{ row.height }}cm</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ row.phone }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ row.recent }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <router-link tag="div" :to="`/patients/${row.id}`" class="flex items-center cursor-pointer" >
                View
                <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
                <img src="@/assets/img/view 1.svg" alt="">
                </div>
              </router-link>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      rowSelects: null,
      columns: [
        'Patient',
        'Weight/Height',
        'Mobile',
        'Last encounter',
        'Action',
      ],
      use_batchActions: true,
      rowSize: '',
      autoWidth: false,
      sortable: false,
      title: 'Table title',
      actionBarAriaLabel: 'Custom action bar aria label',
      batchCancelLabel: 'Cancel',
      zebra: false,
      search: '',
      sampleOverflowMenu: [],
    }
  },
  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
      patientsCount: (state) => state.patients.patientsCount,
    }),

    maleCount() {
      return this.patients.filter((p) => p.gender == 'male').length
    },
    femaleCount() {
      return this.patients.filter((p) => p.gender == 'female').length
    },
  },

  methods: {
      onOverflowMenuClick() {},
      onSort() {},
      actionRowSelectChange() {},
      actionOnPagination() {},
  },
}
</script>
