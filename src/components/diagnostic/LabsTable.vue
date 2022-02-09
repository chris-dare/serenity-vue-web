<template>
  <div class="space-y-4">
    <FilterGroup
      v-model="search"
      :filters="filters"
    />
    <DataTable
      ref="table"
      :data="filteredData || []"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      no-data-label="No labs"
      @pagination="actionOnPagination"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <p>{{ $date.formatDate(row.authored_on, 'dd MMM, yyyy') }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ row.display }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ row.priority | capitalize }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ $utils.getFirstData(row.order_detail) }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ $utils.getFirstData(row.service_request_bodysite) }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ $utils.getFirstData(row.specimen, 'display' ) || '-' }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <Tag
            :variant="row.status === 'Done' ? 'success' : row.status === 'Awaiting sample' ? 'error' : 'primary'"
            :label="row.status"
          />
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center space-x-2">
            <div
              class="m-1 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer"
              :disabled="!$userCan('diagnostic.requests.read')"
              @click="$trigger('diagnostic-order:add:open', {...row})"
            >
              <img
                src="@/assets/img/view 1.svg"
                alt=""
              >
            </div>
            <Edit
              class="w-4 h-4 cursor-pointer"
              :disabled="!$userCan('diagnostic.requests.write')"
              @click="$trigger('lab-report:update:open', {...row})"
            />
            <Trash
              class="w-4 h-4 cursor-pointer"
              :disabled="!$userCan('diagnostic.requests.delete')"
              @click="confirmDeleteLab(row.id)"
            />
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <DeleteModal
      :loading="deleteLoading"
      @delete="removeLab"
    />
    <DiagnosticOrder />
    <AddLabResultsModal />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DataMixin from '@/mixins/data'
import DeleteModal from '@/components/ui/modals/ConfirmDeleteModal'
import AddLabResultsModal from '@/components/diagnostic/modals/AddLabResultsModal'
import DiagnosticOrder from '@/components/diagnostic/modals/DiagnosticOrderModal'

export default {
  name: 'LabsTable',

  components: { DeleteModal, AddLabResultsModal, DiagnosticOrder },

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
  },

  data() {
    return {
      search: '',
      selected: 'all',
      columns: ['Date', 'Lab type', 'Priority', 'Order detail', 'Bodysite', 'Specimen', 'State', 'Action'],
      deleteLoading: false,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.patients.patientServiceRequests,
    }),
    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),
    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Active', code: 'active' },
        { display: 'Draft', code: 'draft' },
        { display: 'Completed', code: 'completed' },
        { display: 'Rejected', code: 'rejected' },
      ]
    },
  }, 

  mounted() {
    this.paginate = true
    this.searchTerms = ['code', 'specimen', 'status']
  },

  created(){
    this.init()
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      getPatientServiceRequests: 'patients/getPatientServiceRequests',
      deleteServiceRequest: 'patients/deleteServiceRequest',
    }),

    init() {
      this.loading = true
      let id = this.$route.params.id
      this.getPatientServiceRequests({ patient: id }).finally(() => this.loading = false )
      
    },

    async removeLab(id) {
      this.deleteLoading = true
      try {
        await this.deleteServiceRequest(id).then(() => {
          this.$toast.open({
            message: 'Lab successfully deleted',
          })
        })
        this.deleteLoading = false
        this.$trigger('confirm:delete:close')
      /* eslint-disable-next-line */
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      }
      this.deleteLoading = false
    },

    confirmDeleteLab(lab) {
      this.$trigger('confirm:delete:open', { data: lab, label: 'Are you sure you want to delete this lab?' })
    },


  },

}
</script>
