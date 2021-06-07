<template>
  <div class="relative h-main flex flex-col">
    <SeForm class="space-y-8 flex-1">
      <p class="font-semibold">Patient Referral</p>

      <EncounterReferralForm :referral="referral" />

      <div v-if="mode == 'create'">
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
                <p>{{ getSinglePractitionerByRole(row.requester).fullName }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ row.recipient ? getSinglePractitionerByRole(row.recipient).fullName : row.recipient_extra_detail }}</p>
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
            <cv-data-table-cell>
              <div>
                <Edit
                  class="w-4 h-4 cursor-pointer"
                  @click="$router.push({ name: 'EditEncounterReferral', params: { referralId: row.id } })"
                />
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
    EncounterReferralForm: () => import(/* webpackPrefetch: true */'@/components/patients/encounters/forms/EncounterReferralForm'),
  },

  props: {
    referralId: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      columns: ['Date', 'Referrer', 'Referee', 'Priority', 'Referral Type', 'Status', ''],
      referral: null,
    }
  },
  

  computed: {
    ...mapGetters({
      getSinglePractitionerByRole: 'practitioners/getSinglePractitionerByRole',
      currentEncounterReferrals: 'encounters/currentEncounterReferrals',
    }),

    mode() {
      return this.referralId ? 'update' : 'create'
    },
  },

  watch: {
    referralId() {
      this.init()
    },
  },

  methods: {
    init() {
      if(this.mode === 'update'){
        let ref = this.currentEncounterReferrals.find(el => el.id === this.referralId)
        if (ref.recipient) {
          ref.recipient = this.getSinglePractitionerByRole(ref.recipient)
        }
        
        this.referral = ref
      } else {
        this.referral = null
      }
    },
  },
}
</script>
