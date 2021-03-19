<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
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
            :to="{name: 'ServiceInformation'}"
          >
            Add new service
            <Add class="ml-4 w-5 h-5" />
          </SeButton>
        </div>
      </div>

      <cv-search
        v-model="search"
        placeholder="Search for service"
      />

      <cv-data-table
        ref="table"
        :data="[]"
        :columns="columns"
      >
        <template
          slot="data"
        >
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredData"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
            aria-label-expand-row="Go large"
            aria-label-collapse-row="Go small"
          >
            <cv-data-table-cell>
              <div class="flex items-center space-x-2 py-2">
                <p>{{ row.healthcare_service_name }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p class="lowercase">{{ row.healthcare_service_appointment_required ? 'Yes' : 'No' }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ getLocations(row.healthcare_service_locations) }}</p>
            </cv-data-table-cell>
            <!-- Actions not ready -->
            <cv-data-table-cell>
              <div class="flex items-center space-x-6">
                <p
                  class="cursor-pointer"
                  @click="$trigger('service:view:open', { ...row })"
                >
                  View
                </p>
                <!-- <p class="text-red-500">Delete</p> -->
              </div>
            </cv-data-table-cell>
            <template slot="expandedContent">
              <div class="px-8">
                <div class="grid grid-cols-4 gap-8 border-b border-solid border-subtle py-2 mb-4">
                  <p class="text-secondary">Service Tier</p>
                  <p class="text-secondary">Tier Price</p>
                </div>
                <div
                  v-for="(tier, index) in row.price_tiers"
                  :key="index"
                  class="grid grid-cols-4 gap-8 py-2"
                >
                  <p class="capitalize">{{ tier.name }}</p>
                  <p>{{ tier.cost | formatMoney | toCedis }}</p>
                </div>
              </div>
            </template>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <AddEditService />
    <ViewService />
  </div>
</template>

<script>
import AddEditService from '@/components/admin/modals/AddEditService'
import ViewService from '@/components/admin/modals/ViewService'
import DataMixin from '@/mixins/data'
import { mapGetters } from 'vuex'

export default {
  name: 'Services',

  components: { AddEditService, ViewService },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      columns: [
        'Service',
        'Appointment?',
        'Locations',
        'Action',
      ],
    }
  },

  computed: {
    // ...mapState({
    //   data: (state) => state.services.services,
    // }),

    ...mapGetters({
      data: 'services/normalizedServices',
    }),
  },

  created() {
    this.searchTerms = ['healthcare_service_name']
  },

  methods: {
    getLocations(services) {
      if(!services.length) {
        return ''
      }
      return services.map(service => service.location_name || service.display).join(',')
    },
  },

}
</script>
