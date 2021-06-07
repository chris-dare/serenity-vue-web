<template>
  <cv-modal
    :visible="visible"
    size="sm"
    class="se-no-title-modal"
    @modal-hidden="close"
  >
    <template slot="content">
      <cv-form
        autocomplete="off"
        @submit.prevent
      >
        <div class="divide-y divide-secondary divide-solid">
          <div
            class="w-full flex justify-center items-center flex-col space-y-1 mb-4"
          >
            <img
              class="w-32"
              src="@/assets/img/qr.png"
              alt=""
            >
            <p class="text-xs">Miss Eleanor Pena</p>
            <p class="text-secondary text-xs">Female, 23 years</p>
          </div>

          <div class="space-y-4 py-6">
            <p class="font-semibold">Payment Transaction</p>
            <div
              class="grid grid-cols-4 gap-4"
            >
              <div>
                <p class="text-xs">11453456</p>
                <p class="text-secondary text-xs">Transaction ID</p>
              </div>
              <div>
                <p class="text-xs">Cash</p>
                <p class="text-secondary text-xs">Payment type</p>
              </div>
              <div>
                <p class="text-xs">11453456</p>
                <p class="text-secondary text-xs">Cashier</p>
              </div>
              <div>
                <p class="text-xs">Cash</p>
                <p class="text-secondary text-xs">Phone number</p>
              </div>
            </div>
          </div>
          <div class="space-y-4 py-6">
            <div
              class="flex items-center justify-between"
            >
              <div>
                <p class="font-semibold">Virtual Care Gp Consultation</p>
                <p class="text-secondary text-sm">Service / Product</p>
              </div>
              <div>
                <p class="text-lg font-bold text-primary">GHc 1005.99</p>
                <p class="text-secondary text-sm text-right">Amount recieved</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Go back
          </SeButton>
          <div class="flex items-center space-x-2">
            <SeButton
              variant="secondary"
              @click="close"
            >
              Cancel bill
            </SeButton>
            <SeButton
              :loading="loading"
            >
              Print Bill
            </SeButton>
          </div>
        </div>
      </cv-form>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'TransactionDetailsModal',

  data() {
    return {
      visible: false,
      form: {},
      loading: false,
    }
  },

  events: {
    'transactions:details:open': function() {
      this.visible = true
    },
    'transactions:details:close': function() {
      this.close()
    },
  },

  methods: {
    close() {
      this.form = {}
      this.visible = false
    },
  },
}
</script>
