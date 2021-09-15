<template>
  <div class="space-y-4">
    <p class="text-lg font-semibold">Customer Information</p>
    <div>
      <div class="grid grid-cols-2 gap-8 my-8">
        <FormInput
          v-model="form.first_name"
          :invalid-message="$utils.validateRequiredField($v, 'first_name')"
          label="First Name"
          placeholder="Enter First name"
          type="text"
          class="inherit-full-input"
          required
        />
        <FormInput
          v-model="form.last_name"
          :invalid-message="$utils.validateRequiredField($v, 'last_name')"
          label="Last Name"
          type="text"
          placeholder="Enter Last name"
          class="inherit-full-input"
          required
        />
        <DatePicker
          v-model="form.birth_date"
          kind="single"
          class="inherit-full-input"
          placeholder="dd/mm/yyyy"
          label="Date of birth"
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
        />
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
      <div class="flex items-center justify-between">
        <SeButton
          variant="secondary"
          @click="$emit('cancel')"
        >
          Go back
        </SeButton>
        <SeButton
          :loading="loading"
          @click="submit"
        >
          Next<ChevronRight class="w-4 h-4 text-white ml-4" />
        </SeButton>
      </div>
    </div>
    <div />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import UsersAPI from '@/api/users'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NonPatientDetailsForm',

  props: {
    step: {
      type: [Number, String],
      default: null,
    },

    // eslint-disable-next-line vue/prop-name-casing
    _form: {
      type: [Object, String],
      default: null,
    },
  },

  data() {
    return {
      /* eslint-disable-next-line */
      // form: {"first_name":"CALEB","last_name":"KPABITEY","email":"gesixad705@vvaa1.com","mobile":"","birth_date":"06/10/2021"},
      form: {},
      visible: false,
      loading: false,
      icons: {
        Checkmark,
      },
      prescriptions: {
        data: [
          {
            drug: 'Hydrocodone 5MG / 500MG tabs',
            duration: '7 days',
            dosage: '2 times daily',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
          {
            drug: 'Efpac 5MG / 500MG tabs',
            duration: '7 days',
            dosage: '2 times daily',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
        ],
        state: null,
      },
    }
  },

  computed:{
    ...mapState({
      // client: (state) => state.clients.client,
      genders: (state) => state.resources.genders,
    }),
    // ...mapGetters({
    //   userName: 'auth/fullName',
    // }),
  },

  mounted() {
    this.form = Object.assign(this.form, this._form)
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
    }),
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
      payload.birth_date = new Date(payload.birth_date)
      try {
        const patient = await this.createPatient(payload)
        this.$toast.open({
          message: 'Patient successfully added',
        })
        this.$emit('success', patient)

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
