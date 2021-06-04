<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <div class="flex items-center justify-between mb-6 w-full">
        <p>Order details</p>
        <Tag
          label="Fully paid"
          class="bg-success text-white"
          kind="gray"
        />
      </div>
      <div>
        <div class="mb-6">
          <p class="text-gray-500  mb-2">Prescribed by</p>
          <div class="flex items-center">
            <img
              class="w-12 h-12 rounded-full mr-3"
              src="@/assets/img/user 1.svg"
              alt=""
            >
            <div>
              <div>
                <p class="mt-1 ">
                  {{ 'Chris Dare' }}
                </p>
                <p class="mt-1  text-secondary">
                  {{ 'aha' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="my-6">
          <p class="text-gray-500 ">Encounter</p>
          <p class=" text-primary">
            {{ 'aha' }}
            <router-link
              to="/"
              class="text-serenity-primary font-bold underline ml-2"
            >
              View encounter
            </router-link>
          </p>
        </div>
        <div class="my-6">
          <p class="text-gray-500 ">Payment Method</p>
          <p class="text-serenity-primary ">
            {{ 'aha' }}
          </p>
        </div>
        <OrderReceipts :orders="orders" />
      </div>
      <div class="w-full mt-8">
        <SeButton
          variant="secondary"
          full
        >
          Close
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import OrderReceipts from '@/components/patients/OrderReceipts'
export default {
  name: 'PrescriptionModal',

  components: { OrderReceipts },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
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
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>

<style></style>
