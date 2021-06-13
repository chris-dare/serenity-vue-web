<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-2 divide-y divide-black divide-solid">
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
              <p class="text-md">{{ form && form.state }}</p>
              <p class="text-secondary text-xs"> Account type </p>
            </div>
            <div class="text-right">
              <p class="text-md">{{ $date.formatDate(form.creditStartDate, 'yyyy/MM/dd') }}</p>
              <p class="text-secondary text-xs"> Date </p>
            </div>
          </div>
        </div>
        <div class="py-4">
          <cv-select
            v-model="form.paymentMethod"
            class="se-custom-input"
            label="Mode of payment"
          >
            <cv-select-option
              disabled
              hidden
              :selected="!form.paymentMethod"
            >
              Please select a mode of payment
            </cv-select-option>
            <cv-select-option
              value="cash"
            >
              Cash
            </cv-select-option>
            <!-- <cv-select-option
                  value="corporate"
                >
                  Corporate
                </cv-select-option> -->
          </cv-select>
          <div class="py-4">
            <cv-text-input
              v-model="form.amount"
              class="inherit-full-input"
              type="number"
              label="Amount Recieved"
              placeholder="0.00"
            />
            <div v-if="form.paymentMethod === 'corporate'">
              <cv-select
                v-model="form.corporate"
                class="se-custom-input pt-3"
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
            <cv-text-input
              v-else
              v-model="form.depositor"
              class="inherit-full-input pt-4"
              type="text"
              label="Name of Depositor"
              placeholder="Please enter the name of the depositor"
            />
          </div>
        </div>
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
          Deposit amount
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// import { required } from 'vuelidate/lib/validators'

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
      },
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
    'deposit:add:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.type = 'add'
    },
    'deposit:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.type = 'update'
    },
  },

  methods: {
    ...mapActions({
      depositClient: 'clients/deposit',
      updateClient: 'clients/update',
      addToClient: 'clients/addClientAccount',
    }),

    submit(){
      // this.$v.$touch()
      // if (this.$v.$invalid) {
      //   this.$toast.open({
      //     message: 'Please these fields are required!',
      //     type: 'error',
      //   })
      //   return
      // }

      if (this.type === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true
      let payload = {    
        amount: parseFloat(this.form.amount), // required
        accountId: this.form.id, //provider client account(required)
        creditDurationInDays: parseFloat(this.form.creditDurationInDays), //required
        creditStartDate: new Date(this.form.creditStartDate), //required
        depositType: this.form.state, //either limited-credit-active or limited-debit-activerequired
        depositedBy: this.userName,
        maximum_employees_allowed: parseFloat(this.form.maximum_employees_allowed), //required
      }
      try {
        let data = await this.depositClient(payload)
        if (data.successful) {
          let payload = this.client
          payload.amount = data.returnedData.amount
          payload.maximum_employees_allowed = data.returnedData.maximum_employees_allowed
          payload.creditDurationInDays = data.returnedData.creditDurationInDays
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
  },
}
</script>
