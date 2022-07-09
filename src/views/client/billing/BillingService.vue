<template>
  <div>
    <component :is="serviceComponent" />
  </div>
</template>

<script>
import BillingSelectCreateClinic from '@/components/billing/request/BillingSelectCreateClinic'
import BillingSelectClinic from '@/components/billing/request/BillingSelectClinic'

export default {
  name: 'BillingService',

  components: { BillingSelectClinic, BillingSelectCreateClinic },

  computed: {
    serviceComponent() {
      return this.$route.query.type === 'create' ? 'BillingSelectCreateClinic' : 'BillingSelectClinic'
    },
  },

}
</script>
