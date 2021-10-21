<template>
  <div class="space-y-8">
    <DataTable
      :columns="columns"
      :data="data"
      :loading="loading"
      no-data-label="You have no intake charts"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="py-2">
            <p>{{ $date.formatDate(row.arrived_at, 'dd MMM, yyyy HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.type_of_fluid }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.fluid_name }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.volume }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            {{ row.recorded_by }}
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>

    <p class="text-serenity-primary text-right cursor-pointer font-semibold text-sm">
      View full chart
    </p>
  </div>
</template>

<script>
export default {
  name: 'IntakeChartTable',

  data() {
    return {
      data: [],
      loading: false,
      columns: [
        'Time',
        'Type of fluid',
        'Fluid name',
        'Volume',
        'Recorded by',
      ],
    }
  },
}
</script>
