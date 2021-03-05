<template>
  <div class="mx-auto w-4/5 space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Locations ({{ locations.length }})</p>

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
    />

    <cv-data-table
      ref="table"
      :data="filteredLocations"
      :columns="columns"
    >
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in filteredLocations"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.location_name }}</p>
            </div>
          </cv-data-table-cell>
            
          <!-- <cv-data-table-cell>
            <div class="flex items-center space-x-6">
              <p
                class="cursor-pointer"
                @click="$trigger('location:edit:open', {...row})"
              >
                Edit
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
      v-if="!locations.length"
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
export default {
  components: {AddEditLocation},
  data() {
    return {
      search: '',
      columns: [
        'Name',
        'Address',
        'City',
      ],
      loading: false,
    }
  },

  computed: {
    ...mapState({
      locations: (state) => state.locations.locations,
    }),
    filteredLocations() {
      return this.locations.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },

  created() {
    this.refresh()
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
