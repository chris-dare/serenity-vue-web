<template>
  <div>
    <cv-search placeholder="Search for appointment" v-model="search">
    </cv-search>

    <div class="flex justify-end mt-4">
        <cv-date-picker class="flex-none se-date-picker" kind="range" :cal-options="calOptions" v-model="date">
      </cv-date-picker>
    </div>

    <div>
      <cv-data-table
        :row-size="rowSize"
        :sortable="sortable"
        :columns="columns"
        :pagination="{
          numberOfItems: 10,
        }"
        @pagination="actionOnPagination"
        v-model="rowSelects"
        @row-select-change="actionRowSelectChange"
        @sort="onSort"
        :overflow-menu="sampleOverflowMenu"
        :data="[]"
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
            v-for="(row, rowIndex) in 10"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <img
                  class="w-10 h-10 rounded-full mr-3"
                  :src="$faker().image.image()"
                  alt=""
                />
                <div>
                  <p>{{ $faker().name.findName() }}</p>
                  <p class="text-secondary text-xs">
                    {{ $faker().random.boolean() ? 'male' : 'female' }}, {{ $utils.createRandom(100) }} years
                  </p>
                </div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $date.formatDate($faker().date.recent(), 'yyyy/MM/dd') }}</p>
                <p class="text-secondary text-xs">{{ $date.formatDate($faker().date.recent(), 'HH:mm a') }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>Specialist Appointment</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>Virtual</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $faker().phone.phoneNumber() }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div
                class="flex items-center cursor-pointer"
                @click="visible = !visible"
              >
                View
                <div
                  class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center"
                >
                  <img src="@/assets/img/view 1.svg" alt="" />
                </div>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <AppointmentSummaryModal :visible.sync="visible" />
  </div>
</template>

<script>
import AppointmentSummaryModal from '@/components/appointments/AppointmentSummaryModal'
export default {
  name: 'AppointmentsTable',
  components: {AppointmentSummaryModal},
  data() {
    return {
      rowSelects: null,
      date: null,
      columns: [
        'Patient',
        'Date/Time',
        'Service',
        'Type',
        'Mobile',
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
      calOptions: {
        dateFormat: 'm/d/Y',
      },
      visible: false,
    }
  },

  methods: {
    onOverflowMenuClick() {},
    onSort() {},
    actionRowSelectChange() {},
    actionOnPagination() {},
  },
}
</script>
