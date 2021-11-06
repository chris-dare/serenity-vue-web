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
        v-model="search"
        placeholder="Search for inventory item"
      />
      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="filteredData"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{row}">
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ $utils.formatName(row.name) }}</p>
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
import debounce from 'lodash/debounce'
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
        'Initial Quantity',
        'Quantity Available',
        'Expiry Date',
        'Action',
      ],
      filters: {},
      total: 0,
      loading: false,
      meta: 0,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.inventory.inventory,
    }),
  },
  

  watch: { 
    search: {
      handler(val){
        if(val){
          this.searchInventory(val)
        }
      },
    },
  },

  created() {
    this.paginate = true
    this.pageLength = 10
    this.searchTerms = ['name', 'medication', 'category', 'selling_price', 'batch_number']
    this.filters = { page: this.page, page_size: this.pageLength }
    this.refresh()
  },

  methods: {
    ...mapActions({
      getInventory: 'inventory/getInventory',
      deleteInventory: 'inventory/deleteInventory',
    }),

    actionOnPagination(ev) {
      this.pageLength = ev.length
      this.page = ev.page
      this.filters = { page: ev.page, page_size: ev.length }
      this.getData()
    },

    async getData() {
      try {
        this.loading = true
        const data = await this.getInventory(this.filters)
        this.meta = data.meta
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    searchInventory: debounce(function(search) {
      this.filters = { search, page: this.page, page_size: this.pageLength }
      this.getData()
    }, 300, false),

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
