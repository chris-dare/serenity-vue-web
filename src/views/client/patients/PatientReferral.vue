<template>
  <div class="mt-2 space-y-2">
    <div class="flex items-center justify-between">
      <Search
        v-model="params.search"
        placeholder="Search by practitioner name"
        class="se-input-white"
        @input="searchData"
      />
      <DatePicker
        v-model="params.date"
        kind="single"
        class="se-input-white"
        placeholder="dd/mm/yyyy"
        @input="searchData"
      />
    </div>
    <ReferralsTable :data="data" />
  </div>
</template>

<script>
import ReferralsTable from '@/components/patients/tables/ReferralsTable'
import paginated from '@/mixins/paginated'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PatientReferral',

  components: { ReferralsTable },

  mixins: [paginated],

  computed: {
    ...mapState({
      data: state => state.patients.patientReferrals,
    }),
  },

  mounted() {
    this.params = {patient: this.$route.params.id, search: '' }
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'patients/getReferrals',
    }),
  },
}
</script>
