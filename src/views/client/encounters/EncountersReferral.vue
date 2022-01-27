<template>
  <div class="relative h-main flex flex-col">
    <SeForm class="space-y-8 flex-1">
      <p class="font-semibold">Patient Referral</p>

      <EncounterReferralForm :referral="referral" />

      <div v-if="mode == 'create'">
        <p class="mb-2 font-semibold">Referrals</p>

        <FilterGroup
          v-model="selectedFilter"
          :filters="filters"
        />

        <DataTable
          small
          :data="referrals"
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
              <div class="flex items-center space-x-2">
                <Edit
                  class="w-4 h-4 cursor-pointer"
                  @click="$router.push({ name: 'EditEncounterReferral', params: { referralId: row.id } })"
                />
                <Printer
                  class="w-4 h-4 cursor-pointer"
                  @click="print(row)"
                />
                <Trash
                  class="w-4 h-4 cursor-pointer"
                  @click="removeReferral(row.id)"
                />
              </div>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>

      <div
        v-show="false"
        id="printMe"
      >
        <div class="p-8 space-y-4">
          <h1>Referral request</h1>

          <div>
            <div
              class="grid grid-cols-3"
            >
              <p class="text-gray-900 text-lg">Referral created at</p>
              <p class="text-lg">{{ $date.formatDate(referralToBePrinted.created_at, 'dd MMM, yyyy') }}</p>
            </div>
            <div
              class="grid grid-cols-3"
            >
              <p class="text-gray-900">Referrer</p>
              <p class="text-lg">{{ getSinglePractitionerByRole(referralToBePrinted.requester).fullName }}</p>
            </div>
            <div
              class="grid grid-cols-3"
            >
              <p class="text-gray-900 text-lg">Referree</p>
              <p class="text-lg">{{ referralToBePrinted.recipient ? getSinglePractitionerByRole(referralToBePrinted.recipient).fullName : referralToBePrinted.recipient_extra_detail }}</p>
            </div>
            <div
              class="grid grid-cols-3"
            >
              <p class="text-gray-900 text-lg">Priority</p>
              <p class="text-lg">{{ referralToBePrinted.priority | capitalize }}</p>
            </div>
            <div
              class="grid grid-cols-3"
            >
              <p class="text-gray-900 text-lg">Referral Type</p>
              <p class="text-lg">{{ referralToBePrinted.referral_type | removeUnderscore | capitalize }}</p>
            </div>
          </div>
        </div>
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
import { mapActions, mapGetters, mapState } from 'vuex'
import Printer from '@carbon/icons-vue/es/printer/16'

export default {
  name: 'EncounterReferral',

  components: {
    EncounterReferralForm: () => import(/* webpackPrefetch: true */'@/components/patients/encounters/forms/EncounterReferralForm'),
    Printer,
  },

  props: {
    referralId: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      columns: ['Date', 'Referrer', 'Referee', 'Priority', 'Referral Type', ''],
      referral: null,
      output: null,
      referralToBePrinted: {},
      selectedFilter: 'current',
    }
  },


  computed: {
    ...mapState({
      patientReferrals: state => state.patients.patientReferrals,
    }),

    ...mapGetters({
      getSinglePractitionerByRole: 'practitioners/getSinglePractitionerByRole',
      currentEncounterReferrals: 'encounters/currentEncounterReferrals',
    }),

    mode() {
      return this.referralId ? 'update' : 'create'
    },

    referrals() {
      if (this.selectedFilter === 'previous') {
        return this.patientReferrals.filter(ref => ref.encounter !== this.$route.params.encounter)
      }

      return this.currentEncounterReferrals
    },

    filters() {
      return [
        { display: 'Current encounter referrals', code: 'current' },
        { display: 'Previous referrals', code: 'previous' },
      ]
    },
  },

  watch: {
    referralId() {
      this.init()
    },
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    ...mapActions({
      deleteReferral: 'patients/deleteReferral',
      getUsers: 'practitioners/getUsers',
    }),

    async removeReferral(id) {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'Delete',
        type: 'delete',
        confirmButtonVariant: 'danger',
        label: 'Are you sure you want to delete this referral?',
        callback: async () => {
          try {
            this.loading = true
            await this.deleteReferral(id)
            this.$toast.open({ message: 'The referral has successfully been deleted' })
            this.loading = false

          } catch (error) {
            this.loading = false
          }
        },
      })

    },

    print (row) {
      // Pass the element id here
      this.referralToBePrinted = row
      this.$nextTick(() => {
        this.$htmlToPaper('printMe')
      })
    },

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
