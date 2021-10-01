<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">{{ type !== 'update' ? 'Edit' : 'Update' }} client account</p>
        <div
          v-if="type === 'update'"
          class="grid grid-cols-1 gap-8"
        >
          <cv-text-input
            v-model="form.company.company_name"
            type="text"
            label="Company name"
            placeholder=""
            disabled
          />
        </div>
        <div
          v-else
          class="grid grid-cols-2 gap-8"
        >
          <cv-number-input
            v-model="form.maximum_employees_allowed"
            type="number"
            label="Maximum employees allowed"
            placeholder=""
            class="se-input-gray"
          />
          <cv-number-input
            v-model="form.creditDurationInDays"
            type="number"
            label="Credit duration in days"
            placeholder=""
            class="se-input-gray"
          />
        </div>
        <div
          v-if="type === 'update'"
          class="grid justify-center"
        >
          <cv-radio-group>
            <cv-radio-button
              v-model="form.status"
              name="VERIFY"
              label="VERIFY"
              value="VERIFY"
            />
            <cv-radio-button
              v-model="form.status"
              name="SUSPEND"
              label="SUSPEND"
              value="SUSPEND"
            />
            <cv-radio-button
              v-model="form.status"
              name="CLOSE"
              label="CLOSE"
              value="CLOSE"
            />
          </cv-radio-group>
        </div>
        <div 
          v-else 
          class="grid grid-cols-1 gap-8"
        >
          <!-- <cv-text-input
            v-model="form.amount"
            type="number"
            label="Amount"
            placeholder=""
            class="se-input-gray"
          /> -->
          <DatePicker
            v-model="form.creditStartDate"
            label="Credit start date"
            class="se-input-gray"
          />
        </div>
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
            {{ type === 'update' ? 'Update client account' : 'Edit client account' }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'AddEditClient',

  data() {
    return {
      loading: false,
      visible: false,
      type: 'add',
      vertical: true,
      form: {},
    }
  },

  computed:{
    ...mapState({
      client: (state) => state.clients.client,
    }),
    ...mapGetters({
      userName: 'auth/fullName',
    }),
  },

  events: {
    'client:add:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.type = 'add'
    },
    'client:edit:open': function(data){
      this.type = 'update'
      this.visible = true
      this.form = data.params[0]
      console.log(this.form)
    },
  },

  methods: {
    ...mapActions({
      depositClient: 'clients/deposit',
      updateClient: 'clients/update',
      providerClient: 'clients/providerAccount',
      addToClient: 'clients/addClientAccount',
      getClientAccount: 'clients/getClientAccount',
      clientAccountUpdate: 'clients/clientAccountUpdate',
    }),

    submit(){

      if (this.type === 'update') {
        this.updateStatus()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true

      const id = this.$route.params.id
      let payload = {
        amount: 0, // required
        accountId: this.form.id, //provider client account(required)
        creditDurationInDays: parseFloat(this.form.creditDurationInDays), //required
        creditStartDate: new Date(this.form.creditStartDate), //required
        depositType: this.form.state, //either limited-credit-active or limited-debit-activerequired
        companyId: this.form.company.main_branch_id,
        authorizedBy: this.userName,
        maximum_employees_allowed: this.form.maximum_employees_allowed, //required
      }
      if(this.form.id){
        try {
          let data = await this.depositClient(payload)
          if (data.successful) {
            let payload = this.client
            payload.amount = data.returnedData.amount
            payload.maximum_employees_allowed = data.returnedData.maximum_employees_allowed
            payload.creditDurationInDays = data.returnedData.creditDurationInDays
            this.getClientAccount(id)
            this.addToClient(payload)
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
      } else {
        try {
          let data = await this.providerClient(payload)
          if (data.successful) {
            let payload = this.client
            payload.amount = data.returnedData.amount
            payload.maximum_employees_allowed = data.returnedData.maximum_employees_allowed
            payload.creditDurationInDays = data.returnedData.creditDurationInDays
            this.getClientAccount(id)
            this.addToClient(payload)
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
      }
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
        this.loading = false
      }
    },

    async updateStatus() {
      const id = this.$route.params.id
      this.loading = true
      try {
        let data = await this.clientAccountUpdate({
          id: this.form.uuid,
          action: this.form.status,
        })
        if (data.success) {
          let payload = this.client
          payload.status = data.status
          this.getClientAccount(id)
          this.addToClient(payload)
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
