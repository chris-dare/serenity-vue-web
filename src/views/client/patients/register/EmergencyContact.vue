<template>
  <MultiStepBase
    next-label="Next: Social Information"
    :loading="loading"
    :next="next"
    :previous="previous"
    :icon="icon"
    :query="$route.query"
    @cancel="cancel"
    @save="save"
  >
    <div class="grid grid-cols-2 gap-8">
      <cv-text-input
        v-model="form.contact[0].first_name"
        label="First Name"
        placeholder="First Name"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.contact[0].last_name"
        label="Last Name"
        type="text"
        placeholder="Last Name"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.contact[0].other_names"
        label="Other Names"
        type="text"
        placeholder="Other Names"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.contact[0].address.line"
        label="Home/Residential address"
        placeholder="Home or residential address"
        type="text"
        class="inherit-full-input"
      />
      <MultiSelect
        v-model="form.contact[0].telecom.system"
        :options="systemOptions"
        title="Type of contact"
        :multiple="false"
      />
      <MultiSelect
        v-model="form.contact[0].telecom.use"
        :options="['home', 'mobile']"
        title="Use"
        :multiple="false"
      />
      <cv-text-input
        v-if="form.contact[0].telecom.system === 'email'"
        v-model="form.contact[0].telecom.value"
        label="Email"
        placeholder="Email"
        class="inherit-full-input col-span-2"
      />
      <MsisdnPhoneInput
        v-else
        v-model="form.contact[0].telecom.value"
        label="Phone number"
      />
    </div>
    <p
      v-if="$utils.validateRequiredField($v, 'contact')"
      class="error col-span-2"
    >
      All fields are required when any field is filled
    </p>
  </MultiStepBase>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'EmergencyContact',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        contact: [{
          telecom: {},
          address: {},
        }],
      },
      parent: 'Patients',
      previous: 'ContactInfo',
      next: 'SocialInfo',
      systemOptions: ['phone', 'email'],
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
    }),

    hasFirstName() {
      return !!this.form.contact[0].first_name
    },
    hasLastName() {
      return !!this.form.contact[0].last_name
    },

    empty() {
      return this.$utils.checkForEmpty({ ...this.form.contact[0] })
    },
  },

  validations() {
    return {
      form: {
        contact: {
          $each: {
            first_name: {
              required: requiredIf(() => {
                return !this.empty
              }),
            },
            last_name: {
              required: requiredIf(() => {
                return !this.empty
              }),
            },
            telecom: {
              system: {
                required: requiredIf(() => {
                  return !this.empty
                }),
              },
              value: {
                required: requiredIf(() => {
                  return !this.empty
                }),
              },
              use: {
                required: requiredIf(() => {
                  return !this.empty
                }),
              },
            },
            address: {
              line: {
                required: requiredIf(() => {
                  return !this.empty
                }),
              },
            },
          },
        },
      },
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),

    save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      this.form.contact[0].relationship ='emergency_contact',

      this.addToStoreData(this.form)
      this.$router.push({ name: this.next, query: { ...this.$route.query } })
    },
  },
}
</script>
