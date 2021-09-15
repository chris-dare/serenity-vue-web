<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <cv-form
        v-if="drug"
        autocomplete="off"
        class="space-y-8"
        @submit.prevent
      >
        <div class="mt-8 flex justify-between items-center">
          <div>
            <div class="text-lg text--serenity-primary">{{ drug.name }}</div>
          </div>
          <div>
            <div class="text-right font-bold text-xl">{{ cartTotal | formatMoney | toCedis }}</div>
          </div>
        </div>
        <div class="border-solid border-t border-serenity-subtle-border" />
        <div>
          <cv-text-input
            v-model="form.quantity"
            label="Quantity"
            type="number"
            placeholder="Quantity"
            class="inherit-full-input"
          />
        </div>
      </cv-form>
      <div class="mt-12 flex justify-between items-center">
        <SeButton
          variant="secondary"
          @click="close"
        >
          Cancel
        </SeButton>
        <SeButton 
          :loading="loading"
          @click="submit"
        >
          Add to cart
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapGetters, mapState, mapMutations } from 'vuex'


export default {
  name: 'DosageModal',

  data() {
    return {
      form: {
        quantity: 1,
      },
      icon: ChevronRight,
      visible: false,
      loading: false,
      drug: null,
      callback: null,
    }
  },


  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      user: (state) => state.auth.user,
      cart: (state) => state.checkout.cart,
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
      this.callback({quantity: parseInt(this.form.quantity)})
      this.close()
    },

    open(item, callback) {
      this.drug = item
      this.visible = true
      this.callback = callback
    },

    close() {
      this.visible = false
    },
  },
}
</script>
