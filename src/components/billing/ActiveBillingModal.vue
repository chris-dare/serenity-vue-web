<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <h1>Active bill</h1>
    </template>
    <template slot="content">
      <cv-form
        autocomplete="off"
        @submit.prevent
      >
        <div class="space-y-6">
          <div
            v-for="(service, index) in form.services"
            :key="index"
            class="grid grid-cols-12 gap-x-4 gap-y-8 items-end"
          >
            <div class="col-span-11 grid grid-cols-2 gap-4">
              <cv-text-input
                v-model="service.service"
                label="Service / product"
                placeholder="Service / product"
              />
              <cv-text-input
                v-model="service.amount"
                label="Amount"
                placeholder="Amount"
              />
            </div>
      
            <Trash
              class="w-5 h-5 cursor-pointer mb-3"
              @click="removeService(index)"
            />
          </div>
          <div class="flex item-center justify-end">
            <SeButton @click="addService">
              Add new bill
            </SeButton>
          </div>
        </div>

        <div class="bg-secondary bg-opacity-30 w-full h-px my-8" />

        <div class="flex justify-end">
          <div>
            <p class="text-lg font-semibold text-primary">GHc 1005.99</p>
            <p class="text-secondary text-sm text-right">Current Total</p>
          </div>
        </div>

        <div class="flex items-center justify-between mt-6">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Go back
          </SeButton>
          <div class="flex items-center">
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
  name: 'ActiveBillingModal',

  data() {
    return {
      visible: false,
      form: {
        services: [{service: '', amount: ''}],
      },
      loading: false,
    }
  },

  events: {
    'active:billing:open': function() {
      this.visible = true
    },
  },

  methods: {
    close() {
      this.form = {services: [{service: '', amount: ''}]}
      this.visible = false
    },

    addService() {
      this.form.services.push({service: '', amount: ''})
    },

    removeService(index) {
      this.form.services.splice(index, 1)
    },
  },
}
</script>
