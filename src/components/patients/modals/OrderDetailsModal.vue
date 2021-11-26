<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    width="450px"
  >
    <div
      slot="title"
      class="flex items-center justify-between mb-6 pr-6 w-full"
    >
      <p>Order details</p>
      <Tag
        show-icon
        :variant="getStatusVariant(bill.status)"
        class="cursor-pointer"
      >
        {{ bill.status }}
      </Tag>
    </div>
    <template>
      <PaymentDetail
        :details="bill"
        label="Payment Transaction"
        :amount="bill.charge"
      />
      <div class="w-full mt-8">
        <SeButton
          variant="secondary"
          full
          @click="close"
        >
          Close
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import PaymentDetail from '@/components/payment/PaymentDetail'
import {mapGetters} from 'vuex'
import modalMixin from '@/mixins/modal'

export default {
  name: 'OrderDetailsModal',

  components: { PaymentDetail },

  mixins: [modalMixin],

  data() {
    return {
      bill: {
        patient: {},
      },
      name: 'order-details-modal',
    }
  },

  events: {
    'order:details:open': function(data){
      this.open()
      this.bill = data.params[0]
      this.bill.patient = {
        mobile: this.bill.patient_mobile,
        fullName: this.bill.patient_name,
      }
    },
  },

  computed: {
    ...mapGetters({
      getStatusVariant: 'billing/getStatusVariant',
    }),

    orders() {
      let orders = []
      for (let index = 0; index < 3; index++) {
        orders.push({
          label: 'Tada',
          amount: 200,
        })
      }
      return orders
    },
  },
}
</script>
