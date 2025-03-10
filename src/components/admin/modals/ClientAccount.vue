<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    width="450px"
    title="Update client account"
    @closed="close"
  >
    <template>
      <div class="space-y-2 divide-y divide-black divide-solid">
        <div>
          <div class="flex items-center py-5">
            <div class="space-y-1">
              <p class="text-lg font-semibold">{{ (form.first_name + ' ' + form.last_name) | capitalize }}</p>
              <div class="flex items-center">
                <p class="text-xs">Client Role: {{ form.occupational_role }}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 pb-2">
            <div>
              <p class="text-md">{{ form.maximum_dependents_allowed || 0 }}</p>
              <p class="text-secondary text-xs"> Dependents </p>
            </div>
            <div class="text-right">
              <p class="text-md">{{ $currency(form.credit_amount || 0).format() }}</p>
              <p class="text-secondary text-xs"> Credit </p>
            </div>
          </div>
        </div>
        <div class="py-4">
          <div>
            <cv-text-input
              v-model="form.credit_amount"
              class="inherit-full-input"
              type="number"
              label="Credit amount"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <p 
          class="text-center" 
          style="cursor: pointer" 
          @click="close"
        >
          Cancel
        </p>
        <SeButton 
          :loading="loading"
          @click="submit"
        >
          Update account
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import modalMixin from '@/mixins/modal'
// import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddClientAccount',

  mixins: [modalMixin],

  data() {
    return {
      loading: false,
      visible: false,
      type: 'add',
      vertical: true,
      form: {
        paymentMethod: 'cash',
      },
      name: 'client-account-modal',
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
    'client-account:add:open': function(data){
      this.open()
      this.form = data.params[0]
      this.type = 'add'
    },
    'client-account:edit:open': function(data){
      this.open()
      this.form = data.params[0]
      this.type = 'update'
    },
  },

  methods: {
    ...mapActions({
      depositClient: 'corporate/updateClientAccount',
      updateClient: 'clients/update',
      addToClient: 'clients/addClientAccount',
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
      let payload = { id: this.$route.params.id,
        form: { amount: Number(this.form.credit_amount)}}
      try {
        let data = await this.depositClient(payload)
        if (data.successful) {
          this.$toast.open({
            message: data.message || 'Client account successfully updated',
          })
          this.close()
        } else {
          this.$toast.open({
            message: data.message || 'Client account update failed',
            type: 'error',
          })
          this.close()
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
        this.close()
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
