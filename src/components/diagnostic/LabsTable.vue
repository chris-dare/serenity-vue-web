<template>
  <div>
    <DataTable :data="[]">
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ row.test }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.diagnosis }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.physician }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.state }}
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'LabsTable',

  data() {
    return {
      columns: [
        'Test requested',
        'Diagnosis',
        'Physician',
        'State',
      ],
    }
  },
}
</script>
