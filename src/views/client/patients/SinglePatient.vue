<template>
  <AppStatePage
    :loading="loading"
    :error="error"
    class="max-w-7xl mx-auto"
  >
    <PatientInfoCard>
      <component :is="actionComponent" />
    </PatientInfoCard>

    <div>
      <DetailPageNav />

      <router-view />
    </div>
    <SinglePatientModals />
  </AppStatePage>
</template>

<script>
import { mapActions } from 'vuex'
import SinglePatientModals from '@/components/patients/modals/SinglePatientModals'
import DetailPageNav from '@/components/patients/DetailPageNav'
import PatientInfoCard from '@/components/patients/PatientInfoCard'

export default {
  name: 'SinglePatient',

  components: {
    SinglePatientModals,
    DetailPageNav,
    PatientInfoCard,
    ReceptionActions: () => import('@/components/patients/actions/ReceptionActions'),
    OPDActions: () => import(/* webpackPrefetch: true */ '@/components/patients/actions/OPDActions'),
    IPDActions: () => import(/* webpackPrefetch: true */ '@/components/patients/actions/IPDActions'),
  },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      error: null,
    }
  },

  computed: {
    actionComponent() {
      if (this.$isCurrentWorkspace('RECEPT')) return 'ReceptionActions'
      if (this.$isCurrentWorkspace('IPD')) return 'IPDActions'
      return 'OPDActions'
    },
  },

  watch: {
    $route: {
      immediate: true,
      async handler(route, oldRoute) {
        if (route.params.id === oldRoute?.params?.id) {
          return
        }
        try {
          this.loading = true
          await this.initSinglePatientInformation(this.id)
          this.loading = false
        } catch (error) {
          this.error = error.detail || 'Error loading page. Please check your internet connection and try again.'
          this.loading = false
        }
      },
    },
  },

  beforeRouteLeave (from, to, next) {
    this.refresh()
    next()
  },

  methods: {
    ...mapActions({
      initSinglePatientInformation: 'patients/initSinglePatientInformation',
      refresh: 'patients/refreshCurrentPatient',
    }),
  },
}
</script>
