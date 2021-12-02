<template>
  <BaseModal
    :name="name"
    title="Add new dependent"
    width="450px"
    @closed="close"
  >
    <template>
      <div>
        <div>
          <div class="grid grid-cols-2 gap-8 my-3">
            <AutoCompletePatients v-model="form" />

            <cv-text-input
              v-model="form.first_name"
              label="First name"
              type="text"
              placeholder="Please enter first name"
              class="inherit-full-input"
              :invalid-message="$utils.validateRequiredField($v, 'first_name')"
            />

            <cv-text-input
              v-model="form.last_name"
              label="Last name"
              type="text"
              placeholder="Please enter last name"
              class="inherit-full-input"
              :invalid-message="$utils.validateRequiredField($v, 'last_name')"
            />

            <DatePicker
              v-model="form.birth_date"
              placeholder="dd/mm/yyyy"
              label="Date of birth"
              class="se-input-gray"
              :error-message="$utils.validateRequiredField($v, 'birth_date')"
            />

            <!-- <MultiSelect
              v-model="form.relation"
              :options="['Brother', 'Sister', 'Child', 'Parent', 'Other']"
              title="Choose dependant relation"
              placeholder="Choose dependant relation"
            /> -->
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center my-8">
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
          Add dependant
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import modalMixin from '@/mixins/modal'
import { requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'AddDependent',

  mixins: [modalMixin],

  data() {
    return {
      loading: false,
      type: 'add',
      vertical: true,
      form: {
        relationship: 'DEPENDENT',
      },
      name: 'add-dependent-modal',
    }
  },

  computed:{
    ...mapState({
      client: (state) => state.clients.client,
    }),
  },

  validations() {
    return {
      form: {
        mr_number: {
          required: requiredIf(() => {
            return !this.form.first_name || !this.form.birth_date || !this.form.last_name
          }),
        },
        birth_date: {
          required: requiredIf(() => {
            return !this.form.mr_number 
          }),
        },
        first_name: {
          required: requiredIf(() => {
            return !this.form.mr_number
          }),
        },
        last_name: {
          required: requiredIf(() => {
            return !this.form.mr_number
          }),
        },
      },
    }
  },

  events: {
    'dependent:add:open': function(){
      this.open()
      this.type = 'add'
    },
    'dependent:edit:open': function(data){
      this.open()
      this.form = data.params[0]
      this.type = 'update'
    },
  },

  methods: {
    ...mapActions({
      createDependent: 'dependents/createDependent',
      updateDependent: 'dependents/updateDependent',
    }),

    submit(){
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill in the required fields')
        return
      }

      
      if (this.type === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      
      try {
        this.loading = true
        const form = {
          mr_number: this.form.mr_number,
          birth_date: this.form.birth_date,
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          relationship: 'DEPENDENT',
        }
        await this.createDependent(form)
        this.$toast.open({
          message: 'Dependent successfully created',
        })
        this.close()
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      this.loading = true
      try {
        await this.updateDependent(this.form)
        this.$toast.open({
          message: 'Dependent successfully updated',
        })
        this.close()
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
