<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template>
      <SeForm
        v-if="drug"
        class="space-y-8"
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
      </SeForm>
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
  </BaseModal>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapGetters, mapState, mapActions } from 'vuex'

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
      name: 'dosage-modal',
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
    ...mapActions({
      removeCartItem: 'checkout/removeCartItem',
    }),
    submit() {
      this.callback({quantity: parseInt(this.form.quantity)})
      this.close()
    },

    open(item, callback) {
      this.drug = item
      this.$modal.show(this.name)
      this.callback = callback
    },

    close() {
      this.$modal.hide(this.name)
    },
  },
}
</script>
