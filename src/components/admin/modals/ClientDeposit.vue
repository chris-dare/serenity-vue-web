<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <SeForm class="space-y-2 divide-y divide-secondary divide-solid">
        <p class="text-md font-semibold">New deposit</p>
        <div>
          <div class="flex items-center py-5">
            <div class="space-y-1">
              <p class="text-lg font-semibold">{{ form && form.companyName }}</p>
              <div class="flex items-center">
                <p class="text-xs">Client TIN No: {{ form && form.company.tin_number }}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 pb-2">
            <div>
              <p class="text-md">{{ form && form.account_type }}</p>
              <p class="text-secondary text-xs"> Account type </p>
            </div>
            <div class="text-right">
              <p class="text-md">{{ $date.formatDate(form.service_period_start, 'dd MMM, yyyy') }}</p>
              <p class="text-secondary text-xs"> Date </p>
            </div>
          </div>
        </div>
        <div class="py-4">
          <div class="my-5">
            <div class="grid grid-cols-6 items-end">
              <FormInput
                v-model="form.amount"
                placeholder="Enter the amount received"
                label="Amount"
                type="number"
                class="se-input-gray col-span-4"
                required
              />
              <MultiSelect
                v-model="form.currency"
                :options="currencies"
                track-by="code"
                label="display"
                class="col-span-2"
                custom-field="code"
                title="Currency"
              />
            </div>
            <MultiSelect
              v-model="form.reference_type"
              placeholder="Please select a reference types"
              custom-field="code"
              track-by="code"
              class="my-4"
              label="display"
              title="Reference types"
              :options="referenceTypes"
              preselect
            />
            <cv-text-input
              v-model="form.reference"
              class="inherit-full-input pt-2"
              type="text"
              label="Reference"
              placeholder="Enter reference"
            />
            <div v-if="form.paymentMethod === 'corporate'">
              <MultiSelect
                v-model="form.corporate"
                placeholder="Choose a corporate body to bill"
                title="Select the corporate body"
              />
              <cv-toast-notification
                v-if="true"
                caption="payment would be billed to the corporate account"
                sub-title="payment would be billed to the corporate account"
              />
            </div>
          </div>
        </div>
      </SeForm>
      <div class="flex justify-between items-center">
        <p 
          class="text-center" 
          style="cursor: pointer" 
          @click="visible = false"
        >
          Cancel
        </p>
        <SeButton 
          :loading="loading"
          @click="submit"
        >
          Deposit amount
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'AddClientDeposit',

  data() {
    return {
      loading: false,
      visible: false,
      type: 'add',
      vertical: true,
      form: {
        paymentMethod: 'cash',
        company: {},
      },
      options: [
        {display: 'Cash', code: 'cash'},
      ],
    }
  },

  computed:{
    ...mapState({
      client: (state) => state.clients.client,
      referenceTypes: (state) => state.resources.referenceTypes,
      currencies: state => state.resources.currencies,
    }),
    ...mapGetters({
      userName: 'auth/fullName',
    }),
  },

  events: {
    'deposit:add:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.getCurrencies()
      this.type = 'add'
    },
    'deposit:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.getCurrencies()
      this.type = 'update'
    },
  },

  methods: {
    ...mapActions({
      depositClient: 'clients/deposit',
      updateClient: 'clients/update',
      addToClient: 'clients/addClientAccount',
      getClientAccount: 'clients/getClientAccount',
      getCurrencies: 'resources/getCurrencies',
    }),

    submit(){
      if (this.type === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true
      const id = this.$route.params.id
      let payload = {
        amount: parseFloat(this.form.amount), // required
        accountId: this.form.id, //provider client account(required)
        id: this.form.uuid,
        action:'DEPOSIT',
        currency: this.form.currency,
        reference: this.form.reference,
        reference_type: this.form.reference_type,
        comment:'',
      }
      try {
        let data = await this.depositClient(payload)
        if (data.success) {
          let payload = this.client
          payload.balance = data.data.balance
          this.getClientAccount(id)
          this.$toast.open({
            message: data.message || 'Client successfully updated',
          })
          this.visible = false
        } else {
          this.$toast.open({
            message: data.message || 'Client account update failed',
            type: 'error',
          })
          this.visible = false
        }
        // this.$router.go(-1)
        this.loading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
      this.loading = false
    },

    async update() {
      this.loading = true
      try {
        await this.updateClient(this.form)
        this.$toast.open({
          message: 'Client successfully verified',
        })
        this.visible = false
        this.loading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
    },
  },
}
</script>
