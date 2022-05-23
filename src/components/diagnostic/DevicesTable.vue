<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="params.search"
      placeholder="Search for patient, enter name or MR number"
      @input="searchData"
    />
    <div
      v-if="hideSearch"
      class="my-4 flex items-center space-x-2"
    >
      <cv-button
        class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
        kind="tertiary"
        @click="$router.go(-1)"
      >
        Go Back
      </cv-button>
    </div>
    <FilterGroup
      v-model="search"
      :filters="filters"
    />
    <DataTable
      ref="table"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ row && row.user_friendly_name || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row && row.type || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row && row.manufacturer }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag
              show-icon
              :variant="getStatusVariant(row.status)"
              class="cursor-pointer"
            >
              {{ row.status }}
            </Tag>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer"
            :disabled="!$userCan('diagnostic.devices.read')"
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
      </template>
    </DataTable>
    <LabTestModal />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/paginated'
import LabTestModal from '@/components/patients/reports/LabTestModal'


export default {
  name: 'DevicesTable',

  components: { LabTestModal },

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },

    hideWalk: {
      type: Boolean,
      default: false,
    },

    id: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      search: '',
      selected: 'all',
      loading: false,
      columns: [
        'Device',
        'Type',
        'Manufacturer',
        'Status',
        'Action',
      ],
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.diagnostic.diagnosticDevices,
    }),

    filters() {
      return [
        { display: `All devices (${ this.dataCount })`, code: '' },
        { display: 'Connected', code: 'active' },
        { display: 'Disconnected', code: 'inactive' },
      ]
    },
  },

  watch: {
    search: {
      handler(val) {
        if (val) {
          this.loading = true
          this.getData({search: val}).finally(() =>  this.loading = false)
         
        }
      },
    },
  },


  created() {
    let id = { patient: this.$route.params.id}
    this.refresh(id ? id : null).then(() => this.loading = false).finally(() => this.loading = false)
  },

  methods: {
    ...mapActions({
      getData: 'diagnostic/getDevices',
    }),
    getStatusVariant(status) {
      if (status === 'active') {
        return 'success'
      }

      if (status === 'inactive') {
        return 'error'
      }

      return 'primary'
    },
  },


}
</script>
