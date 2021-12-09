<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Inventory ({{ dataCount }})</p>
        <div class="flex items-center space-x-2">
          <SeButton
            variant="secondary"
          >
            Upload CSV
            <Upload class="ml-4 w-5 h-5" />
          </SeButton>
          <SeButton
            @click="$trigger('inventory:add:open')"
          >
            Add new item
            <Add class="ml-4 w-5 h-5" />
          </SeButton>
        </div>
      </div>



      <Search
        v-model="params.search"
        placeholder="Search for inventory item"
        @input="searchData"
      />

      <DataTable
        ref="table"
        :data="data"
        :columns="columns"
        :pagination="pagination"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{row}">
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.name | capitalize }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.unit_price }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.selling_price }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.initial_quantity }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.in_hand_quantity }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.net_release_quantity }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.expiry_date }}</p>
          </cv-data-table-cell>

          <cv-data-table-cell>
            <div class="flex items-center space-x-6">
              <p
                class="cursor-pointer"
                @click="$trigger('inventory:edit:open', {...row})"
              >
                Edit
              </p>
              <p
                class="text-red-500 cursor-pointer"
                @click="remove(row)"
              >
                Delete
              </p>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <AddEditInventory />
  </div>
</template>

<script>
import AddEditInventory from '@/components/admin/modals/AddEditInventory'
import { mapState, mapActions } from 'vuex'
import DataMixin from '@/mixins/paginated'

export default {
  name: 'Inventory',

  components: { AddEditInventory },

  mixins: [DataMixin],

  data() {
    return {
      columns: [
        'Item name',
        'Unit Price',
        'Selling Price',
        'Initial Quantity',
        'In-Hand Quantity',
        'Release Quantity',
        'Expiry Date',
        'Action',
      ],
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.inventory.inventory,
    }),
  },

  created() {
    // this.params.search = ''
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'inventory/getInventory',
      deleteInventory: 'inventory/deleteInventory',
    }),

    remove(data) {
      const id = data.id
      this.$trigger('confirm-action-modal:open', {
        label: data.name,
        type: 'delete',
        callback: async ()=>{
          this.loading = true
          try {
            await this.deleteInventory(id)
            this.$toast.open({
              message: 'Inventory deleted successfully',
            })
          } catch (error) {
            this.$toast.open({
              message: 'Something went wrong!',
              type: 'error',
            })
          }finally{
            this.loading = false
          }
        },
      })
    },
  },
}
</script>
