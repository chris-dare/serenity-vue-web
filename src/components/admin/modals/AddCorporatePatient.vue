<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    :title="type === 'update' ? 'Update Employee' : 'Add New Employee'"
    @closed="close"
  >
    <template>
      <SeForm>
        <FilterGroup
          v-if="type === 'add'"
          v-model="selected"
          :filters="filters"
          class="mb-3"
        />
        <div>
          <div class="grid grid-cols-2 gap-8 my-3">
            <div v-if="type === 'add'">
              <AutoCompletePatients
                v-if="selected === 'existing'"
                v-model="patient"
                class="multiselect-white flex-1"
                :custom-label="(value) => `${$utils.concatData(value, ['title', 'first_name', 'last_name'])} - (${value.mr_number})`"
                @input="searchData"
              />
            </div>
            <div
              class="grid grid-cols-2 gap-8 col-span-2"
            >
              <FormInput
                v-model="form.first_name"
                label="First name"
                type="text"
                placeholder="Please enter first name"
                class="inherit-full-input"
                required
              />
              <FormInput
                v-model="form.last_name"
                label="Last name"
                type="text"
                placeholder="Please enter last name"
                class="inherit-full-input"
                required
              />
              <MsisdnPhoneInput
                v-model="form.mobile"
                label="Phone number"
                required
              />
              <FormInput
                v-model="form.email"
                label="Email"
                placeholder="Email"
                class="inherit-full-input"
                required
              />
              <MultiSelect
                v-model="form.gender"
                :options="genders"
                title="Gender"
                placeholder="Male or female"
                track-by="code"
                label="display"
                custom-field="code"
                preselect
                :multiple="false"
                required
              />
              <DatePicker
                v-model="form.date_of_birth"
                kind="single"
                class="se-input-gray"
                placeholder="dd/mm/yyyy"
                label="Date of birth"
                required
              />
            </div>
            <FormInput
              v-model="form.occupational_role"
              label="Occupational role"
              type="text"
              placeholder="Please enter occupational role"
              class="inherit-full-input"
              required
            />
            <FormInput
              v-model="form.employee_tags"
              label="Employee tag"
              type="text"
              placeholder="Please enter employee tag"
              class="inherit-full-input"
              required
            />

            <FormInput
              v-model="form.maximum_dependents_allowed"
              label="Maximum dependents allowed"
              type="number"
              placeholder="Enter the maximum dependents allowed"
              class="inherit-full-input col-span-2"
              required
            />
            <FormInput
              v-model="form.address"
              label="Address"
              placeholder="Enter address here..."
              :rows="2"
              type="textarea"
              class="col-span-2 se-input-gray"
              required
            />
          </div>
        </div>
      </SeForm>
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
          {{ type === 'update' ? 'Update Employee' : 'Add Employee' }}
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'
import modalMixin from '@/mixins/modal'
import DataMixin from '@/mixins/paginated'

export default {
  name: 'AddCorporatePatient',

  mixins: [modalMixin, DataMixin],

  data() {
    return {
      loading: false,
      type: 'add',
      vertical: true,
      form: {},
      selected: 'existing',
      patient: null,
      name: 'add-corporate-patient-modal',
    }
  },

  computed:{
    ...mapState({
      client: (state) => state.clients.client,
      genders: (state) => state.resources.genders,
    }),

    ...mapGetters({
      userName: 'auth/fullName',
    }),

    filters() {
      return [
        { display: 'Existing Patient', code: 'existing' },
        { display: 'New Patient', code: 'new' },
      ]
    },
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      mobile: { required },
      email: { required, email: (val) => email(emailFormatter(val)) },
      gender: { required },
      date_of_birth: { required },
      maximum_dependents_allowed: { required },
      occupational_role: { required },
      address: { required},
    },
  },

  events: {
    'corporate-patient:add:open': function(){
      this.open()
      this.type = 'add'
    },
    'corporate-patient:edit:open': function(data){
      this.open()
      this.form = data.params[0]
      this.type = 'update'
    },
  },

  watch: {
    patient: {
      handler(val) {
        if (val) {
          this.form = this.formattedFields(this.form)
        }
      },
    },
  },

  methods: {
    ...mapActions({
      depositClient: 'clients/deposit',
      updateClient: 'clients/update',
      addEmployee: 'corporate/createCorporateEmployee',
      updateEmployee: 'corporate/updateCorporateEmployee',
      getEmployees: 'corporate/getCorporate',
    }),

    submit(){
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Please these fields are required!',
          type: 'error',
        })
        return
      }

      if (this.type === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true
      let id = this.$route.params.id
      this.form.company_id = id
      try {
        await this.addEmployee({ id, form: this.form })
        this.$toast.open('Client employee successfully created')
        this.getEmployees( id )
        this.loading = false
        this.close()
        // if (data) {
        //   this.$toast.open({
        //     message: 'Client employee successfully created',
        //   })
        //   this.close()
        // } else {
        //   this.$toast.open({
        //     message: 'Creating employee failed',
        //     type: 'error',
        //   })
        //   this.close()
        // }
        // // this.$router.go(-1)
        // this.loading = false
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
        await this.updateEmployee(this.form)
        this.$toast.open({
          message: 'Employee successfully updated',
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

    formattedFields(form) {
      let newForm = { ...form }

      if (this.patient) {
        newForm = {
          ...form,
          first_name: this.patient.first_name,
          last_name: this.patient.last_name,
          date_of_birth: this.patient.birth_date,
          gender: this.patient.gender,
          mobile: this.patient.mobile,
          email: this.patient.email,
        }
      }

      return newForm
    },
  },
}
</script>
