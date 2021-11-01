<template>
  <SeForm>
    <Titles
      v-if="enableTitle"
      v-model="localValue.title"
    />
    <div
      class="grid grid-cols-2 gap-8 py-3"
    >
      <FormInput
        v-model="localValue.first_name"
        required
        type="text"
        label="First name"
        placeholder="First name"
        :invalid-message="$utils.validateRequiredField($v, 'first_name', 'localValue')"
        @input="$v.$touch()"
      />
      <FormInput
        v-model="localValue.last_name"
        required
        type="text"
        label="Last name"
        placeholder="Last name"
        :invalid-message="$utils.validateRequiredField($v, 'last_name', 'localValue')"
        @input="$v.$touch()"
      />
    </div>
    <div
      class="grid grid-cols-2 gap-8 py-3"
    >
      <MultiSelect
        v-model="localValue.gender"
        :options="genders"
        title="Gender"
        placeholder="Male or female"
        track-by="code"
        label="display"
        custom-field="code"
        preselect
        :multiple="false"
        :invalid-message="$utils.validateRequiredField($v, 'gender', 'localValue')"
        required
        @input="$v.$touch()"
      />
      <DatePicker
        v-model="localValue.birth_date"
        :max-date="Date.now()"
        class="inherit-full-input se-input-gray"
        placeholder="dd/mm/yyyy"
        label="Date of birth"
        :error-message="$utils.validateRequiredField($v, 'birth_date', 'localValue')"
        required
        @input="$v.$touch()"
      />
    </div>
    <div
      class="grid grid-cols-2 gap-8 py-3"
    >
      <MsisdnPhoneInput
        v-model="localValue.mobile"
        :error-message="$utils.validateRequiredField($v, 'mobile', 'localValue')"
        label="Phone number"
        required
        @input="$v.$touch()"
      />
      <FormInput
        v-model="localValue.email"
        required
        label="Email"
        placeholder="Email"
        class="inherit-full-input"
        :invalid-message="$utils.validateRequiredField($v, 'email', 'localValue')"
        type="email"
        @input="$v.$touch()"
      />
    </div>
  </SeForm>
</template>

<script>
import { mapState } from 'vuex'
import modelMixin from '@/mixins/model'
import { required, email } from 'vuelidate/lib/validators'
import UsersAPI from '@/api/users'
import { emailFormatter } from '@/services/custom-validators'

export default {
  name: 'AddPatientForm',

  mixins: [modelMixin],

  props: {
    allowExisting: {
      default: false,
      type: Boolean,
    },

    enableTitle: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapState({
      genders: (state) => state.resources.genders,
    }),
  },

  watch: {
    '$v.localValue.$invalid': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('invalid', newVal)
        }
      },
    },
  },

  validations() {
    let data = {
      localValue: {
        first_name: {required},
        last_name: {required},
        email: {
          email: (val) => email(emailFormatter(val)),
          required,
          async isUnique(value) {
            if (value === '' || !this.$v.localValue.email.email || this.allowExisting) return true
            const { data } = await UsersAPI.search({ email: value.toLowerCase() }).catch(() => false)

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
            if (value === '' || value?.length < 10 || this.allowExisting) return true
            const { data } = await UsersAPI.search({ mobile: value }).catch(() => false)

            if (data.length) {
              return false
            } else {
              return true
            }
          },
        },
        gender: { required },
        birth_date: { required },
      },

    }
    return data
  },

}
</script>
