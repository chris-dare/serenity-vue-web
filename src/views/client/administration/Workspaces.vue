<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Workspaces/Departments ({{ 5 }})</p>
        <cv-button
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
          @click="$trigger('workspace:add:open')"
        >
          Add new workspace
          <Add class="ml-4 w-5 h-5" />
        </cv-button>
      </div>

      <cv-search
        v-model="search"
        placeholder="Search for workspace"
      />

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
              <p>{{ 'Default' }}</p>
            </cv-data-table-cell>
            
            <cv-data-table-cell>
              <div class="flex items-center space-x-6">
                <p
                  class="cursor-pointer"
                  @click="$trigger('workspace:edit:open', { name: $faker().name.findName() })"
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
    <AddEditWorkspace />
  </div>
</template>

<script>
import AddEditWorkspace from '@/components/admin/modals/AddEditWorkspace'
export default {
  name: 'Workspaces',

  components: {AddEditWorkspace},

  data() {
    return {
      search: '',
      columns: [
        'Name',
        'Type',
        'Action',
      ],
    }
  },
}
</script>
