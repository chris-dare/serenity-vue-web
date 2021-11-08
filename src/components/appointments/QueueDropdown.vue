<template>
  <Dropdown
    :visible.sync="visible"
    with-shadow
  >
    <SeButton
      slot="label"
      variant="warning"
      @click="visible = !visible"
    >
      Add to queue
    </SeButton>
    <div class="w-96 bg-white mt-2 p-4 space-y-2">
      <SeButton full>Auto assign to doctor</SeButton>
      <Search
        v-model="search"
        placeholder="Search Doctor name or ID"
      />
      <DataTable
        :data="[]"
        :columns="columns"
      >
        <template #default="{row}">
          <cv-data-table-cell>
            <p class="font-semibold">{{ row.fullName | capitalize }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p class="text-secondary">{{ row.id }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p class="text-secondary">{{ row.number }}</p>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
  </Dropdown>
</template>

<script>
export default {
  name: 'QueueDropdown',

  data() {
    return {
      visible: false,
      search: '',
      columns: ['Doctor', 'ID', 'Patients in queue'],
    }
  },
}
</script>
