<template>
  <div>
    <DataTable
      small
      :data="currentEncounterReferrals"
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
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReferralsTable',

  computed: {
    ...mapGetters({
      currentEncounterReferrals: 'encounters/currentEncounterReferrals',
    }),
  },
}
</script>

<style>

</style>