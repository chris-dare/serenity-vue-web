<template>
  <div class="mt-2">
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
      data: state => state.patients.referrals,
    }),
  },

  mounted() {
    this.params = this.$route.params.id
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'patients/getReferrals',
    }),
  },
}
</script>
