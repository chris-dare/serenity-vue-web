<template>
  <div>
    <DataTable
      small
      :data="data"
      :columns="columns"
      no-data-label="No Referrals"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.created_at, 'dd MMM, yyyy') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.requester_detail.name }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.recipient_detail ? row.recipient_detail.name : row.recipient_extra_detail }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.priority | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.referral_type | removeUnderscore | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.reason }}</p>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'ReferralsTable',

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      columns: ['Date', 'Referrer', 'Referee', 'Priority', 'Referral Type', 'Reason'],
    }
  },
}
</script>
