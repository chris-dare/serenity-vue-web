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
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Update' }} client account</p>
        <div
          v-if="type === 'update'"
          class="grid grid-cols-1 gap-8"
        >
          <cv-text-input
            v-model="form.company_name"
            type="text"
            label="Company name"
            placeholder=""
            disabled
          />
          <!-- <cv-text-input
            v-model="form.creditDurationInDays"
            type="number"
            label="Credit duration in days"
            placeholder=""
          /> -->
        </div>
        <div
          v-else
          class="grid grid-cols-2 gap-8"
        >
          <cv-text-input
            v-model="form.maximum_employees_allowed"
            type="number"
            label="Maximum employees allowed"
            placeholder=""
          />
          <cv-text-input
            v-model="form.creditDurationInDays"
            type="number"
            label="Credit duration in days"
            placeholder=""
          />
        </div>
        <div
          v-if="type === 'update'"
          class="grid justify-center"
        >
          <cv-radio-group>
            <cv-radio-button
              v-model="form.state"
              name="Verified"
              label="Verified"
              value="verified"
            />
            <cv-radio-button
              v-model="form.state"
              name="Unverified"
              label="Unverfied"
              value="unverified"
            />
            <cv-radio-button
              v-model="form.state"
              name="Suspended"
              label="Suspended"
              value="suspended"
            />
          </cv-radio-group>
        </div>
        <div 
          v-else 
          class="grid grid-cols-2 gap-8"
        >
          <cv-text-input
            v-model="form.amount"
            type="number"
            label="Amount"
            placeholder=""
          />
          <cv-date-picker
            v-model="form.creditStartDate"
            kind="single"
            date-label="Credit start date"
            class="inherit-full-input"
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
            {{ type === 'update' ? 'Update client account' : 'Edit client' }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// import { required } from 'vuelidate/lib/validators'

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
