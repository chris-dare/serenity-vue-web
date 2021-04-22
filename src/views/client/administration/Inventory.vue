<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Inventory ({{ 5 }})</p>
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
        :data="[]"
        :columns="columns"
        :pagination="{ itemsPerPage:10, numberOfItems: 12, pageSizes: [10, 15, 20, 25] }"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 10"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center space-x-2 py-2">
                <p>{{ $faker().lorem.word() }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p class="lowercase">{{ Math.random() }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ 100.00 }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ $date.formatDate($faker().date.recent(), 'yyyy/MM/dd') }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ $faker().name.findName() }}</p>
            </cv-data-table-cell>
            
            <cv-data-table-cell>
              <div class="flex items-center space-x-6">
                <p
                  class="cursor-pointer"
                  @click="$trigger('inventory:edit:open', {name:$faker().name.findName()})"
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
    <AddEditInventory />
  </div>
</template>

<script>
import AddEditInventory from '@/components/admin/modals/AddEditInventory'
export default {
  name: 'Inventory',

  components: {AddEditInventory},

  data() {
    return {
      search: '',
      columns: [
        'Item name',
        'Item Id',
        'In stock',
        'Last updated',
        'Updated by',
        'Action',
      ],
    }
  },
}
</script>
