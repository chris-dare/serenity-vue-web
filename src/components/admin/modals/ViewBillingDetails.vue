<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div>
        <div class="divide-y divide-black divide-solid">
          <div class="w-full flex justify-center items-center flex-col space-y-1 mb-4">
            <img
              class="w-32"
              src="@/assets/img/qr.png"
              alt=""
            >
            <p class="text-xs"> {{ billing.patientname }} </p>
            <p class="text-secondary text-xs"> {{ billing.category }} </p>
          </div>
          <div class="flex items-center justify-between py-4">
            <p>Total Cost</p>
            <p class="text-lg font-bold">{{ $currency(billing.amount).format() }} </p>
          </div>
          <div class="py-4">
            <cv-select
              v-model="billing.paymentMethod"
              class="se-custom-input"
              label="Mode of payment"
            >
              <cv-select-option
                disabled
                selected
                hidden
              >
                Please select a mode of payment
              </cv-select-option>
              <cv-select-option
                value="cash"
              >
                Cash
              </cv-select-option>
            </cv-select>
          </div>
          <div class="py-4">
            <cv-text-input
              v-model="billing.amount"
              class="inherit-full-input"
              type="text"
              label="Amount Recieved"
              placeholder="0.00"
            />
          </div>
        </div>
        <div class="flex items-center justify-between mt-4">
          <SeButton variant="secondary">Cancel</SeButton>
          <SeButton>Confirm payment</SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'ViewBillingDetails',

  data() {
    return {
      billing: {},
      visible: false,
    }
  },

  events: {
    'billing:detail:open': function(data){
      this.visible = true
      this.billing = data.params[0]
    },
    'billing:detail:close': function(){
      this.visible = false
    },
  },
}
</script>
