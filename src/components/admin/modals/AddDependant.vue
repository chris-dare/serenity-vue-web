<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div>
        <p class="text-md font-semibold">Add new dependant</p>
        <div>
          <cv-text-input
            v-model="form.dependant"
            class="inherit-full-input pt-4"
            type="text"
            label="Name of the dependant"
            placeholder="Please enter the name of the dependant"
          />
          <div class="grid grid-cols-2 gap-8 my-8">
            <cv-select
              v-model="form.gender"
              label="Gender"
              class="inherit-full-input"
              placeholder="Male or female"
            >
              <cv-select-option value="male">Male</cv-select-option>
              <cv-select-option value="female">Female</cv-select-option>
            </cv-select>
            <cv-date-picker
              v-model="form.birth_date"
              kind="single"
              class="inherit-full-input"
              placeholder="dd/mm/yyyy"
              date-label="Date of birth"
            />
          </div>
          <cv-text-input
            v-model="form.hosp_id"
            label="Has the patient visited the hospital before? If yes, enter the dependants hospital id"
            type="text"
            placeholder="Enter the depandat hospital ID number"
            class="inherit-full-input my-8"
          />
          <cv-select
            v-model="form.relation"
            label="Choose dependant relation to benefactor"
            class="inherit-full-input my-8"
            placeholder="Choose dependant relation to benefactor"
          >
            <cv-select-option value="brother">Brother</cv-select-option>
          </cv-select>
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
          Add dependant
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
    'dependant:add:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.type = 'add'
    },
    'dependant:edit:open': function(data){
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
          console.log(data)
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
