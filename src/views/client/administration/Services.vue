<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Services ({{ dataCount }})</p>
        <div class="flex items-center space-x-2">
          <SeButton
            variant="secondary"
          >
            Upload CSV
            <Upload class="ml-4 w-5 h-5" />
          </SeButton>
          <SeButton
            @click="goTo"
          >
            Add new service
            <Add class="ml-4 w-5 h-5" />
          </SeButton>
        </div>
      </div>
      <Search
        v-model="search"
        placeholder="Search for service"
      />

      <DataTable
        :columns="columns"
        :data="filteredData"
      >
        <template #default="{row}">
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.healthcare_service_name }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.categories }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p class="lowercase">{{ row.healthcare_service_appointment_required ? 'Yes' : 'No' }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ getLocations(row.healthcare_service_locations) }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div class="flex items-center space-x-6">
              <p
                class="cursor-pointer"
                @click="$trigger('service:view:open', { ...row })"
              >
                View
              </p>
              <p
                class="text-red-500 cursor-pointer"
                @click="$trigger('confirm:delete:open', { data:row.id, label: 'Are you sure you want to delete this service?' })"
              >
                Delete
              </p>
            </div>
          </cv-data-table-cell>
        </template>
        <template #expand="{row}">
          <div class="px-8">
            <div class="grid grid-cols-5 gap-6 border-b border-solid border-subtle py-2 mb-4">
              <p class="text-secondary">Service Tier</p>
              <p class="text-secondary">Tier Price</p>
              <p class="text-secondary">Description</p>
              <p class="text-secondary">Priority</p>
              <p
                v-if="row.service_class === 'Diagnostic'"
                class="text-secondary"
              >
                Turnaround
              </p>
            </div>
            <div
              v-for="(tier, index) in row.price_tiers"
              :key="index"
              class="grid grid-cols-5 gap-6 py-2"
            >
              <p class="capitalize">{{ tier.display }}</p>
              <p>{{ tier.currency }}{{ $currency(tier.charge) }}</p>
              <p class="capitalize">{{ tier.description }}</p>
              <p class="capitalize">{{ tier.priority }}</p>
              <p
                v-if="row.service_class === 'Diagnostic'"
                class="capitalize"
              >
                {{ tier.turnaround_time_value }} {{ tier.turnaround_time_unit }}
              </p>
            </div>
            <p
              v-if="!row.price_tiers.length"
              class="text-center text-sm text-secondary"
            >
              There are no price tiers for this service
            </p>
          </div>
        </template>
      </DataTable>
    </div>
    <ViewService />
    <ConfirmDeleteModal
      :loading="loading"
      @delete="remove"
    />
  </div>
</template>

<script>
import ViewService from '@/components/admin/modals/ViewService'
import DataMixin from '@/mixins/data'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Services',

  components: { ViewService },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      columns: [
        'Service',
        'Category',
        'Appointment?',
        'Locations',
        'Action',
      ],
      loading: false,
    }
  },

  computed: {
    ...mapGetters({
      data: 'services/normalizedServices',
    }),
  },

  created() {
    this.searchTerms = ['healthcare_service_name']
  },

  methods: {
    ...mapActions({
      deleteService: 'services/deleteService',
      refreshCurrentService: 'services/refreshCurrentService',
    }),
    getLocations(services) {
      if(!services.length) {
        return ''
      }
      return services.map(service => service.location_name || service.display).join(',')
    },

    async remove(rowId) {
      this.loading = true
      try {
        await this.deleteService(rowId).then(()=>{
          this.$toast.open({
            message: 'Service successfully deleted',
          })
        })
        this.loading = false
        this.$trigger('confirm:delete:close')
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      }
    },

    goTo() {
      this.refreshCurrentService()
      this.$router.push({name: 'ServiceInformation'})
    },
  },

}
</script>
