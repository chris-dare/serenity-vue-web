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
            @click="$trigger('service:add:open')"
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
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredData"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center space-x-2 py-2">
                <p>{{ row.healthcare_service_name }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p class="lowercase">{{ Math.random() }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ 100.00 }}</p>
            </cv-data-table-cell>
            
            <cv-data-table-cell>
              <div class="flex items-center space-x-6">
                <p
                  class="cursor-pointer"
                  @click="$trigger('service:edit:open', { ...row })"
                >
                  Edit
                </p>
                <p class="text-red-500">Delete</p>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <AddEditService />
  </div>
</template>

<script>
import AddEditService from '@/components/admin/modals/AddEditService'
import DataMixin from '@/mixins/data'
import { mapState } from 'vuex'

export default {
  name: 'Services',

  components: {AddEditService},

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      columns: [
        'Service',
        'Service Id',
        'Price',
        'Action',
      ],
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.services.services,
    }),
  },

  created() {
    this.searchTerms = ['healthcare_service_location_name', 'healthcare_service_name']
  },

}
</script>
