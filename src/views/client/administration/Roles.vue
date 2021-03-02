<template>
  <div class="mx-auto w-4/5 space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Roles (1)</p>

      <cv-button
        class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
        kind="primary"
        @click="$trigger('role:add:open')"
      >
        Add new role 
        <Add class="ml-4 w-5 h-5 text-white" />
      </cv-button>
    </div>

    <cv-search
      v-model="search"
      placeholder="Search for role"
    />

    <cv-data-table
      ref="table"
      :data="[]"
      :columns="columns"
      :pagination="{ itemsPerPage:10, numberOfItems: 5, pageSizes: [10, 15, 20, 25] }"
    >
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in 5"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ $faker().name.findName() }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>Default</p>
          </cv-data-table-cell>
            
          <cv-data-table-cell>
            <div class="flex items-center space-x-6">
              <p
                class="cursor-pointer"
                @click="$trigger('location:edit:open', {name:$faker().name.findName()})"
              >
                Duplicate
              </p>
              <!-- <p class="text-red-500">Delete</p> -->
            </div>
          </cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <AddEditRole />
    <SuccessModal />
  </div>
</template>

<script>
import AddEditRole from '@/components/admin/modals/AddEditRoles'
export default {
  name: 'Roles',

  components: { AddEditRole },

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
