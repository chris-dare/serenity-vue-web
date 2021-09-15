<template>
  <div class="mx-auto max-w-7xl space-y-4">
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
    <Search
      v-model="search"
      placeholder="Search for location"
    />
    <DataTable
      :columns="columns"
      :data="filteredData"
      :loading="loading"
    >
      <template #default="{row}">
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
        <cv-data-table-cell>
          <div class="flex items-center space-x-6">
            <p
              class="cursor-pointer"
              @click="$trigger('location:edit:open', { ...row })"
            >
              Edit
            </p>
            <p
              class="text-red-500 cursor-pointer"
              @click="$trigger('confirm:delete:open', { data:row.id, label: 'Are you sure you want to delete this location?' })"
            >
              Delete
            </p>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <AddEditLocation />
    <ConfirmDeleteModal
      :loading="loading"
      @delete="remove"
    />
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
      columns: ['Name', 'Address', 'Contact Number', ''],
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

    async remove(rowId) {
      this.loading = true
      try {
        await this.deleteLocation(rowId).then(()=>{
          this.$toast.open({
            message: 'Location successfully deleted',
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
  },
}
</script>
