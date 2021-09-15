<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Invoices</p>
      </div>

      <div>
        <InvoicesTable />
      </div>
    </div>
  </div>
</template>

<script>
import InvoicesTable from '@/components/billing/InvoicesTable'

export default {
  name: 'Invoices',

  components: { InvoicesTable },
}
</script>
