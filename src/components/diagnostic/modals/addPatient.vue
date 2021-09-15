<template>
  <div>
    <div>
      <h1 class="text-lg font-semibold py-8">Add new patient</h1>
    </div>
    <div>
      <Titles v-model="form.name_prefix" />
      <div
        class="grid grid-cols-2 gap-8 py-8"
      >
        <FormInput
          v-model="form.first_name"
          required
          :invalid-message="$utils.validateRequiredField($v, 'first_name')"
          label="First Name"
          placeholder="Enter First name"
          type="text"
          class="inherit-full-input"
        />
        <FormInput
          v-model="form.last_name"
          required
          :invalid-message="$utils.validateRequiredField($v, 'last_name')"
          label="Last Name"
          type="text"
          placeholder="Enter Last name"
          class="inherit-full-input"
        />
      </div>
      <div
        class="grid grid-cols-2 gap-8 py-3"
      >
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
        />
        <cv-date-picker
          v-model="form.birth_date"
          kind="single"
          class="inherit-full-input"
          placeholder="dd/mm/yyyy"
          date-label="Date of birth"
        />
      </div>
      <div
        class="grid grid-cols-2 gap-8 py-3"
      >
        <MsisdnPhoneInput
          v-model="form.mobile"
          label="Phone number"
          :error-message="$utils.validateRequiredField($v, 'mobile')"
          required
          @input="$v.$touch()"
        />
        <FormInput
          v-model="form.email"
          :invalid-message="$utils.validateRequiredField($v, 'email')"
          label="Email address"
          type="email"
          placeholder="Email address"
          class="inherit-full-input"
          required
        />
      </div>
    </div>

    <div class="flex items-center justify-between mt-12">
      <div class="flex items-center">
        <SeButton
          :loading="loading"
          @click="submit"
        >
          Add Patient
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'
import data from '@/mixins/data'
import UsersAPI from '@/api/users'

export default {
  name: 'AddPatientModal',

  mixins: [data],

  props: {
    patient: {
      type: Object,
      default: () => {},
    },
    update: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      visible: false,
      form: {},
      loading: false,
    }
  },

  events: {
    'labpatient:add': function() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Fill all required fields in previous steps!')
        return
      }

      this.save()
    },
  },

  computed: {
    ...mapState({
      genders: (state) => state.resources.genders,
    }),

    internalPatient: {
      set(val) {
        this.$emit('update:patient', val)
      },
      get() {
        return this.patient
      },
    },
  },


  validations() {
    let data = {
      form: {
        first_name: {required},
        last_name: {required},
        email: {
          email: (val) => email(emailFormatter(val)),
          required,
          async isUnique(value) {
            if (value === '' || !this.$v.form.email.email) return true
            const { data } = await UsersAPI.search({ email: value }).catch(() => false)

            if (data && data.length) {
              return false
            } else {
              return true
            }
          },
        },
        mobile: {
          required,
          async isUnique(value) {
            if (value === '' || value.length < 10) return true
            const { data } = await UsersAPI.search({ mobile: value }).catch(() => false)

            if (data.length) {
              return false
            } else {
              return true
            }
          },
        },
      },
    }
    return data
  },

  methods: {
    ...mapActions({
      createPatient: 'patients/createPatient',
      addToStoreData: 'appointments/addToCurrentAppointment',
    }),

    close() {
      this.$router.go()(-1)
    },

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Fill all required fields in previous steps!')
        return
      }

      this.save()
    },

    async save() {
      this.loading = true
      let payload = Object.assign({}, this.form)
      payload.mobile = '+' + this.form.mobile
      payload.birth_date = new Date(payload.birth_date)
      try {
        const patient = await this.createPatient(payload)
        this.$toast.open({
          message: 'Patient successfully added',
        })
        this.internalPatient = patient
        let form = {}
        form.patient = patient
        this.addToStoreData(form)
        this.loading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw(error)
      }
    },
  },
}
</script>
