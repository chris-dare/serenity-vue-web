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
        <p class="text-md font-semibold">{{ type === 'update' ? 'Update Policy' : 'Add New Policy' }}</p>
        <!-- <div>
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
        </div> -->
        <div class="py-4">
          <div class="my-5">
            <div class="grid  items-end">
              <FormInput
                v-model="form.name"
                placeholder="Enter policy care plan"
                label="Policy name"
                type="text"
                class="se-input-gray col-span-4"
                required
              />
            </div>
            <MultiSelect
              v-model="form.service_categories"
              :options="serviceCategories"
              multiple
              placeholder="Select a category"
              label="code"
              class="pt-3"
              track-by="code"
              title="Service category"
              required
            />
            <cv-text-area
              v-model="form.comment"
              label="Policy description"
              class="pt-3"
              placeholder="Enter a description of the policy"
              :rows="5"
            />
          </div>
          <div v-if="type === 'update'">
            <!-- @click="$trigger('exclude:add:open', {})" -->
            <SeButton
              full
              class="mt-8"
            >
              Add exclusion services
            </SeButton>
            <small>By default, all services are covered under the policy, added services to the exclusion list removes them from the care plan.</small>
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
          {{ type === 'update' ? 'Update' : 'Save' }}
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'AddNewPolicy',

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
      categories: (state) => state.resources.categories,
    }),
    ...mapGetters({
      userName: 'auth/fullName',
    }),
    serviceCategories() {
      return this.categories.map(service => {
        return {
          code: service.code,
        }
      })
    },
  },

  events: {
    'policy:add:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.type = 'add'
    },
    'policy:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.type = 'update'
    },
  },

  methods: {
    ...mapActions({
      createPolicy: 'clients/createClientPolicy',
      updatePolicy: 'clients/updateClientPolicy',
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
        name: this.form.name,
        policy_holders: [],
        service_categories: this.form.service_categories.map((ele) => ele.code),  
        exclusions:{
          medications: [],
          specialties: [],
          diagnostic_tests: [],
          procedures: [],
          diagnoses: [],
        },
      }
      try {
        let data = await this.createPolicy({id, form: payload})
        if (data.success) {
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
      this.$emit('done')
      this.loading = false
    },

    async update() {
      this.loading = true
      const id = this.$route.params.id
      this.form.service_categories = this.form.service_categories.map((ele) => ele.code)
      try {
        let data = await this.updatePolicy({id, form: this.form})
        if (data.success) {
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
      this.$emit('done')
      this.loading = false
    },
  },
}
</script>
