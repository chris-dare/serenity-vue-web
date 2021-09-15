<template>
  <div>
    <p class="text-lg font-semibold py-8">Items in cart</p>
    <div
      v-if="cart.length == 0"
      class="font-light text-center text-serenity-subtle-border"
    >
      Cart is empty
    </div>
    <div
      v-for="(row) in cart"
      v-else
      :key="row.id"
      class="border-b border-1 border-solid border-serenity-subtle-border py-4"
    >
      <div class="flex justify-between items-center mb-1">
        <div>
          <div class="font-bold mb-1">
            {{ row.inventory.name }} -
            <template v-if="row.inventory.dosage_amount">{{ parseInt(row.inventory.dosage_amount) }} {{ row.inventory.dosage_unit }}</template>
          </div>
          <div>{{ row.description }}</div>
        </div>
        <div
          class="text-gray-600 text-xs cursor-pointer hover:text-danger"
          @click="removeCartItem(row.id)"
        >
          Remove
        </div>
      </div>
      <div class="flex justify-between">
        <div><span class="font-bold mr-2">{{ row.quantity }}</span>X <span>{{ row.selling_price | formatMoney | toCedis }}</span></div>
        <div>
          <span>{{ row.line_total | formatMoney | toCedis }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <div>
        <div class="text-right">Total Cost</div>
        <div class="text-right font-bold text-xl">{{ cartTotal | formatMoney | toCedis }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapGetters, mapState, mapMutations } from 'vuex'


export default {
  name: 'Cart',

  data() {
    return {
      form: {
      },
      icon: ChevronRight,
      visible: false,
      loading: false,
    }
  },


  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      user: (state) => state.auth.user,
      cart: (state) => state.checkout.cart,
      cartAction: (state) => state.checkout.action,
    }),
    ...mapGetters({
      cartTotal: 'checkout/cartTotal',
    }),
  },

  methods: {
    ...mapMutations({
      removeCartItem: 'checkout/REMOVE_CART_ITEM',
    }),
    submit() {
      this.$router.push({name: 'CheckoutSelectPatient'})
      this.close()
    },

    close() {
      this.visible = false
    },
  },
}
</script>
