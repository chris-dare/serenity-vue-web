<template>
  <div>
    <cv-search v-if="!hideSearch" placeholder="Search for appointment" v-model="search">
    </cv-search>

    <div class="flex justify-end mt-4">
        <cv-date-picker class="flex-none se-date-picker" kind="range" :cal-options="calOptions" v-model="date">
      </cv-date-picker>
    </div>

    <div v-if="appointments.length">
      <cv-data-table
        :row-size="rowSize"
        :columns="columns"
        :pagination="{
          numberOfItems: 5,
          pageSizes: [5, 10, 15, 20, 25]
        }"
        v-model="rowSelects"
        :data="[]"
        ref="table"
      >
        <template slot="batch-actions">
          <cv-button>
            Delete
          </cv-button>
        </template>
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 5"
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
    <div v-else>
        <div class="bg-white w-full h-auto flex flex-col justify-center items-center py-6 my-4">
            <img src="@/assets/img/calendar--event 1.svg" class="w-12 h-12" alt="">
            <p class="my-2">Uh oh! You have no appointments.</p>
            <p class="text-secondary font-light mb-6">You currently have no active or incoming appointments.</p>
            <router-link :to="{name:'SelectPatient'}" tag="cv-button" class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4" kind="primary">
              Book an appointment <img class="ml-4 w-5 h-5" src="@/assets/img/add 1.svg" alt="">
            </router-link>
        </div>
    </div>
    <AppointmentSummaryModal :visible.sync="visible" @print="billingVisible = !billingVisible" />
    <BillingModal :visible.sync="billingVisible" />
  </div>
</template>

<script>
import AppointmentSummaryModal from '@/components/appointments/AppointmentSummaryModal'
import BillingModal from '@/components/appointments/BillingModal'
import { mapState } from 'vuex'
export default {
  name: 'AppointmentsTable',
  components: {AppointmentSummaryModal, BillingModal},
  props: {
      hideSearch: {
          type: Boolean,
          default: false,
      },
  },
  data() {
    return {
      rowSelects: null,
      billingVisible: false,
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

  computed: {
    ...mapState({
        appointments: (state) => state.appointments.appointments,
    }),
  },

  methods: {
    onOverflowMenuClick() {},
    onSort() {},
    actionRowSelectChange() {},
    actionOnPagination() {},
  },
}
</script>
