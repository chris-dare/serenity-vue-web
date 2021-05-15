<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
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

      

      <cv-form autocomplete="off">
        <cv-search
          v-model="search"
          placeholder="Search for inventory item"
        />
      </cv-form>

      <cv-data-table
        ref="table"
        :data="filteredData"
        :columns="columns"
        :pagination="pagination"
        @pagination="actionOnPagination"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredData"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center space-x-2 py-2">
                <p>{{ row.name }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.unit_price }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.selling_price }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.in_hand_quantity }}</p>
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
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <AddEditInventory />
  </div>
</template>

<script>
import AddEditInventory from '@/components/admin/modals/AddEditInventory'
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'Inventory',

  components: {AddEditInventory},

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      columns: [
        'Item name',
        'Unit Price',
        'Selling Price',
        'Item Quantity',
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
    this.paginate = true
    this.searchTerms = ['name', 'category', 'selling_price']
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
            const data = await this.deleteInventory(id)
            this.$toast.open({
              message: data.message,
            })
          } catch (error) {
            this.$toast.open({
              message: error.message || 'Something went wrong!',
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
