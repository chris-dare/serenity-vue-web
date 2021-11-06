<template>
  <div class="my-4">
    <DataTable
      ref="table"
      :columns="columns"
      :data="data"
      class="small-table"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          <div class="py-2">
            {{ $utils.formatName(row.performer_name) }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.role | removeDash }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.condition }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.modified_at, 'dd MMM, yyyy HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <!-- <cv-data-table-cell>
          <div>
            <Edit
              class="text-serenity-primary w-5 h-5"
              @click="$trigger('encounter:add:diagnosis:edit', row)"
            />
          </div>
        </cv-data-table-cell> -->
      </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'EncounterDiagnosis',

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      columns: [
        'Performer name',
        'Role',
        'Condition',
        'Date',
      ],
    }
  },
}
</script>
