<template>
  <div class="grid grid-cols-1">
    <p class="border-serenity-subtle-border border-b border-solid py-2">Details</p>
    <div class="border-serenity-subtle-border border-b border-solid">
      <div
        v-for="(order, index) in orders"
        :key="index"
        class="flex items-center justify-between my-4"
      >
        <p class="text-secondary capitalize">{{ order.label }}</p>
        <p class="font-semibold">{{ order.amount | formatMoney | toCedis }}</p>
      </div>
    </div>
    <div class="my-2">
      <div class="flex items-center justify-between">
        <p class="text-secondary">Total</p>
        <p class="font-semibold">{{ total | formatMoney | toCedis }}</p>
      </div>
      <div class="flex items-center justify-between my-4">
        <p class="text-secondary">Amount Paid</p>
        <p class="font-semibold">{{ total | formatMoney | toCedis }}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-secondary">Balance</p>
        <p class="text-warning font-semibold">{{ 0 | formatMoney | toCedis }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderReceipts',

  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    total() {
      const orders = this.orders.map(order => order.amount)
      return orders.reduce(function (a, b) {
        return a + b
      }, 0)
    },
  },
}
</script>
