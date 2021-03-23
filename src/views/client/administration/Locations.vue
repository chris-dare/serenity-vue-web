<template>
  <div class="mx-auto w-4/5 space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Locations ({{ dataCount }})</p>

      <cv-button
        class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
        kind="primary"
        @click="$trigger('location:add:open')"
      >
        Add new location
        <Add class="ml-4 w-5 h-5 text-white" />
      </cv-button>
    </div>

    <cv-search
      v-model="search"
      placeholder="Search for location"
      autocomplete="off"
    />
    <cv-data-table
      ref="table"
      :data="filteredData"
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
              <p>{{ row.location_name }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.street_address }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.location_contact_number }}</p>
            </div>
          </cv-data-table-cell>
          <!-- APIS not ready for these -->
          <!-- <cv-data-table-cell>
            <div class="flex items-center space-x-6">
              <p
                class="cursor-pointer"
                @click="$trigger('location:edit:open', { ...row })"
              >
                View
              </p>
              <p
                class="text-red-500 cursor-pointer"
                @click="remove(row.id)"
              >
                Delete
              </p>
            </div>
          </cv-data-table-cell> -->
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <p
      v-if="!dataCount"
      class="text-center w-full py-6"
    >
      No locations to show
    </p>
    <AddEditLocation />
  </div>
</template>

<script>
import AddEditLocation from '@/components/admin/modals/AddEditLocation'
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'Locations',

  components: { AddEditLocation },

  mixins: [DataMixin],

  data() {
    return {
      columns: ['Name', 'Address', 'City'],
      loading: false,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.locations.locations,
    }),
  },

  created() {
    this.searchTerms = ['location_name', 'city', 'street_address']
  },

  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      deleteLocation: 'locations/deleteLocation',
    }),

    async refresh() {
      this.loading = true
      await this.getLocations()
      this.loading = false
    },

    async remove(id) {
      this.loading = true
      await this.deleteLocation(id)
      this.loading = false
    },
  },
}
</script>
