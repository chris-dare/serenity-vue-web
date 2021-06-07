<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div>
        <div v-if="!done">
          <div class="divide-y divide-black divide-solid">
            <div class="w-full flex justify-center items-center flex-col space-y-1 mb-4">
              <img
                v-if="true"
                class="w-32"
                src="@/assets/img/qr.png"
                alt=""
              >
              <p class="text-xl"> {{ billing.patientname }} </p>
              <p class="text-secondary text-xs"> {{ billing.category }} </p>
            </div>
            <div>
              <p class="text-lg font-bold pt-3"> Payment Transaction </p>
              <div class="flex items-center justify-between py-4">
                <div>
                  <p>{{ billing.transactionid || '-' }}</p>
                  <p class="text-secondary text-xs"> Transaction ID </p>
                </div>
                <div>
                  <p>{{ billing.paymentMethod || '-' }}</p>
                  <p class="text-secondary text-xs"> Payment type </p>
                </div>
                <div>
                  <p>{{ billing.practitioner_name }}</p>
                  <p class="text-secondary text-xs"> Practitioner </p>
                </div>
                <div>
                  <p>{{ billing.patient_mobile }}</p>
                  <p class="text-secondary text-xs"> Phone Number </p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-4 pb-7">
              <div>
                <p>{{ billing.service_or_product_name }}</p>
                <p class="text-secondary text-xs"> Service / Product </p>
              </div>
              <div class="text-right">
                <p class="text-xl font-bold">{{ $currency(billing.amount).format() }} </p>
                <p class="text-secondary text-xs"> Amount to be paid </p>
              </div>
            </div>
            <div 
              v-if="settle" 
              class="py-3" 
            >
              <div>
                <cv-select
                  v-model="billing.paymentMethod"
                  class="se-custom-input"
                  label="Mode of payment"
                >
                  <cv-select-option
                    disabled
                    hidden
                  >
                    Please select a mode of payment
                  </cv-select-option>
                  <cv-select-option
                    value="cash"
                  >
                    Cash
                  </cv-select-option>
                  <cv-select-option
                    value="corporate"
                  >
                    Corporate
                  </cv-select-option>
                </cv-select>
              </div>
            </div>
            <div
              v-if="settle"
              class="py-4"
            >
              <cv-text-input
                v-if="billing.paymentMethod === 'cash'"
                v-model="billing.amount"
                class="inherit-full-input"
                type="number"
                label="Amount Recieved"
                placeholder="0.00"
              />
              <div v-else>
                <cv-select
                  v-model="billing.corporate"
                  class="se-custom-input"
                  label="Select the corporate body"
                >
                  <cv-select-option
                    disabled
                    hidden
                    selected
                  >
                    Choose a corporate body to bill to
                  </cv-select-option>
                </cv-select>
                <cv-toast-notification
                  v-if="true"
                  caption="paymeny would be billed to the corporate account"
                  sub-title="paymeny would be billed to the corporate account"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mt-4">
            <SeButton
              v-if="!settle"
              variant="secondary"
              @click="close"
            >
              Cancel
            </SeButton>
            <SeButton
              v-else
              variant="secondary"
              @click="settle = false"
            >
              Back
            </SeButton>
            <SeButton
              v-if="!settle"
              @click="settle = true"
            >
              Confirm payment
            </SeButton>
            <SeButton
              v-else
              @click="settleBill"
            >
              Settle payment
            </SeButton>
          </div>
        </div>
        <div v-else>
          <div class="p-10 text-center">
            <div class="p-4 flex items-center justify-center"><CheckMark /></div>
            <h1 class="text-xl font-bold"> Payment successful! </h1>
            <p class="text-secondary text-sm"> Congratulations, the transaction was successfully accepted</p>
          </div>
          <div class="flex items-center justify-center mt-4">
            <SeButton @click="close">Close</SeButton>
          </div>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import CheckMark from '@carbon/icons-vue/es/checkmark/32'
export default {
  name: 'ViewBillingDetails',

  components: {
    CheckMark,
  }, 

  data() {
    return {
      billing: {},
      visible: false,
      settle: false,
      done: false,
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

  methods: {
    close(){
      this.visible = false
      this.done = false
      this.billing = {}
    },
    settleBill(){
      this.done = true
    },
  },
}
</script>
