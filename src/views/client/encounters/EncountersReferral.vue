<template>
  <div class="relative h-main flex flex-col">
    <SeForm class="space-y-8 flex-1">
      <p class="font-semibold">Patient Referral</p>

      <EncounterReferralForm />

      <div>
        <p class="mb-2 font-semibold">Previous Referrals</p>

        <DataTable
          small
          :data="currentEncounterReferrals"
          :columns="columns"
          no-data-label="No Referrals"
        >
          <template #default="{row}">
            <cv-data-table-cell>
              <div>
                <p>{{ $date.formatDate(row.created_at, 'yyyy/MM/dd') }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <!-- <p>{{ getSinglePractitioner(row.practitioner) }}</p> -->
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
                <p>{{ row.status | capitalize }}</p>
              </div>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>

      <div class="flex justify-between items-center">
        <SeButton
          variant="secondary"
          :to="{name: 'EncounterCarePlan', params: { id: $route.params.id }}"
        >
          Back to Care plan
        </SeButton>
      </div>
    </SeForm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EncounterReferral',

  components: {
    EncounterReferralForm: () => import('@/components/patients/encounters/forms/EncounterReferralForm'),
  },

  data() {
    return {
      columns: ['Date', 'Practitioner', 'Priority', 'Referral Type', 'Status'],
    }
  },

  computed: {
    ...mapGetters({
      getSinglePractitioner: 'practitioners/getSinglePractitioner',
      currentEncounterReferrals: 'encounters/currentEncounterReferrals',
    }),
  },
}
</script>
