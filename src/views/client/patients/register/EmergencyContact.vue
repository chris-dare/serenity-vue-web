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
        v-model="form.patient_related_person[0].first_name"
        label="First Name"
        placeholder="First Name"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.patient_related_person[0].last_name"
        label="Last Name"
        type="text"
        placeholder="Last Name"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.patient_related_person[0].other_names"
        label="Other Names"
        type="text"
        placeholder="Other Names"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.patient_related_person[0].line_address"
        label="Home/Residential address"
        placeholder="Home or residential address"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.patient_related_person[0].email"
        label="Email"
        placeholder="Email"
        class="inherit-full-input"
      />
      <MsisdnPhoneInput
        v-model="form.patient_related_person[0].mobile"
        label="Phone number"
      />
      <cv-text-input
        v-model="form.patient_related_person[0].place_of_work"
        label="Place of work"
        placeholder="Place of work"
        type="text"
        class="inherit-full-input"
      />

      <MultiSelect
        v-model="form.patient_related_person[0].preferred_communication"
        title="Home Language"
        :multiple="false"
        :options="languages"
        label="display"
        track_by="code"
        placeholder="Primary language you speak"
        custom-field="code"
      />
    </div>
    <p
      v-if="$utils.validateRequiredField($v, 'patient_related_person')"
      class="error col-span-2"
    >
      All fields are required when any field is filled
    </p>
  </MultiStepBase>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { requiredIf, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'EmergencyContact',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        patient_related_person: [{}],
      },
      parent: 'Patients',
      previous: 'ContactInfo',
      next: 'SocialInfo',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
      languages: state => state.resources.languages,
    }),

    hasFirstName() {
      return !!this.form.patient_related_person[0].first_name
    },
    hasLastName() {
      return !!this.form.patient_related_person[0].last_name
    },

    empty() {
      return this.$utils.checkForEmpty({ ...this.form.patient_related_person[0] })
    },
  },

  validations() {
    return {
      form: {
        patient_related_person: {
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
            mobile: {
              required: requiredIf(() => {
                return !this.empty
              }),
            },
            email: {email: (val) => email(emailFormatter(val))},
            line_address: {
              required: requiredIf(() => {
                return !this.empty
              }),
            },
          },
        },
      },
    }
  },

  created() {
    if (isEmpty(this.form.patient_related_person[0])) {
      this.form.patient_related_person[0] = {}
    }
    this.getLanguages()
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
      getLanguages: 'resources/getLanguages',
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

      if (!this.empty) {
        this.form.patient_related_person[0].relationship = 'EMERGENCY_CONTACT'
      }

      if (this.form.patient_related_person[0].preferred_communication) {
        this.form.patient_related_person[0].related_person_communication =  [
          {
            'language': this.form.patient_related_person[0].preferred_communication,
            'preferred': true,
          },
        ],
        delete this.form.patient_related_person[0].preferred_communication
      }


      this.addToStoreData(this.form)
      this.$router.push({ name: this.next, query: { ...this.$route.query } })
    },
  },
}
</script>
