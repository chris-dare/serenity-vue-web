<template>
  <div>
    <div>
      <div
        id="printJS-form"
        class="divide-y divide-black divide-solid"
      >
        <div class="w-full flex justify-center items-center flex-col space-y-1 mb-4">
          <img
            class="w-32"
            src="@/assets/img/qr.png"
            alt=""
          >
          <p class="text-xl"> {{ details.patient.fullName | capitalize }} </p>
          <p class="text-secondary text-xs"> {{ details.category }} </p>
        </div>
        <div>
          <p class="text-lg font-bold pt-3"> {{ label }} </p>
          <div class="grid grid-cols-3 items-center py-4 gap-6">
            <div v-if="details.charge">
              <p>{{ $currency(details.charge).format() }}</p>
              <p class="text-secondary text-xs"> Charge </p>
            </div>
            <div>
              <p>{{ details.payment_method | displayCase }}</p>
              <p class="text-secondary text-xs"> Payment type </p>
            </div>
            <div>
              <p>{{ details.service_or_product_name || '-' }}</p>
              <p class="text-secondary text-xs"> Service / Product </p>
            </div>
            <div>
              <p>{{ details.patient.mobile || '-' }}</p>
              <p class="text-secondary text-xs"> Phone Number </p>
            </div>
            <div>
              <p>{{ $date.formatDate(new Date(), 'dd MMM, yyyy hh:mm a') }}</p>
              <p class="text-secondary text-xs"> Date </p>
            </div>
            <div>
              <p>{{ details.practitioner_name || '-' }}</p>
              <p class="text-secondary text-xs"> Practitioner / Doctor </p>
            </div>
            <div
              v-if="doctor"
            >
              <p>{{ doctor || '-' }}</p>
              <p class="text-secondary text-xs"> Dispensed by </p>
            </div>
          </div>
        </div>
        <div v-if="showCart">
          <div
            v-for="item in cart"
            :key="item.id"
            class="flex items-center justify-between pt-4 pb-7 border-b border-solid border-secondary"
          >
            <div>
              <p>{{ item.name }} <span class="ml-2 text-sm">( {{ $currency(item.selling_price).format() }} x {{ item.quantity }} )</span></p>
              <p class="text-secondary text-xs"> Service / Product </p>
            </div>
            <div class="text-right">
              <p class="">{{ $currency(item.line_total).format() }} </p>
              <p class="text-secondary text-xs"> Amount to be paid </p>
            </div>
          </div>
        </div>

        <div
          v-if="!hideTotal"
          class="flex items-center justify-end py-4"
        >
          <p class="text-secondary">Total <span class="text-primary text-xl font-semibold">{{ $currency(total).format() }}</span> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'PaymentDetail',

  props: {
    details: {
      type: Object,
      default: () => {},
    },

    label: {
      type: String,
      default: 'Payment receipt',
    },

    hideTotal: {
      type: Boolean,
      default: false,
    },

    amount: {
      type: Number,
      default: null,
    },

    showCart: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapState({
      cart: state => state.checkout.cart,
      paymentMethod: state => state.checkout.paymentMethod,
    }),

    ...mapGetters({
      cartTotal: 'checkout/cartTotal',
      practitionerName: 'auth/fullName',
    }),

    total() {
      if (this.amount) return this.amount
      return this.cartTotal
    },

    doctor() {
      if (!this.cart.length) return null
      let item = this.cart[0]
      const medicationRequest = item.medicationRequest
      if(!medicationRequest || !medicationRequest.practitioner_detail)return null
      return medicationRequest.practitioner_detail.name
    },
  },
}
</script>
