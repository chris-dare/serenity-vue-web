<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Bills</p>
      </div>

      <BillingTable />
    </div>
  </div>
</template>

<script>

import BillingTable from '@/components/billing/BillingTable'


export default {
  name: 'Billing',

  components: { BillingTable },
}
</script>
