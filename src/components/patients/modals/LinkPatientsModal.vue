<template>
  <BaseModal
    :name="name"
    :title="title"
    width="450px"
    @closed="close"
  >
    <template>
      <div class="space-y-4">
        <div
          v-if="step === 1"
          class="space-y-6"
        >
          <p>Select the main account you want to link all other patients to</p>
          <div class="space-y-2">
            <div class="space-y-4">
              <div
                v-for="(patient, index) in patients"
                :key="index"
                class="flex items-center justify-between bg-serenity-light-gray px-4 py-2"
              >
                <div class="flex space-x-2 items-center">
                  <ImageBlock
                    :url="patient.photo"
                    :alt="(patient.name || patient.fullName) | capitalize"
                    custom-class="w-12 h-12"
                  />
                  <div>
                    <p class="text-sm font-semibold">{{ patient.mr_number }}</p>
                    <p class="text-sm">{{ (patient.name || patient.fullName) | capitalize }}</p>
                    <p class="text-secondary text-sm capitalize">
                      {{ patient.gender_age_description }}
                    </p>
                  </div>
                </div>

                <cv-radio-button
                  v-model="form.primary_patient"
                  :value="patient.uuid"
                />
              </div>
            </div>
          </div>
          <SeButton
            full
            :disabled="$v.$invalid"
            @click="step = 2"
          >
            Next
          </SeButton>
        </div>
        <div
          v-else-if="step === 2"
          class="space-y-6"
        >
          <p>Give insights to why you are linking the patient data.</p>
          <FormInput
            v-model="form.comment"
            type="textarea"
            :rows="8"
            placeholder="Enter comment"
          />
          <div class="flex items-center justify-between">
            <SeButton
              variant="secondary"
              @click="step = 1"
            >
              Back
            </SeButton>
            <SeButton
              :disabled="$v.$invalid"
              @click="submit"
            >
              Next
            </SeButton>
          </div>
        </div>
        <div
          v-else-if="step === 3"
          class="space-y-6"
        >
          <div class="flex flex-col justify-center items-center space-y-2">
            <Checkmark class="text-success w-16 h-16" />
            <p class="font-semibold text-lg">Accounts linked successfully!!</p>
          </div>
          
          <div class="space-y-2">
            <div class="space-y-4">
              <div
                v-for="(patient, index) in patients"
                :key="index"
                class="flex items-center justify-between bg-serenity-light-gray px-4 py-2"
              >
                <div class="flex space-x-2 items-center">
                  <ImageBlock
                    :url="patient.photo"
                    :alt="(patient.name || patient.fullName) | capitalize"
                    custom-class="w-12 h-12"
                  />
                  <div>
                    <p class="text-sm font-semibold">{{ patient.mr_number }}</p>
                    <p class="text-sm">{{ (patient.name || patient.fullName) | capitalize }}</p>
                    <p class="text-secondary text-sm capitalize">
                      {{ patient.gender_age_description }}
                    </p>
                  </div>
                </div>

                <Link />
              </div>
            </div>
          </div>
          <SeButton
            full
            variant="secondary"
            @click="close"
          >
            Close
          </SeButton>
        </div>
        <p class="italic">NB: Patients can only be linked if they have the same birth date, gender and mobile. Please update the following patient profiles if they do not have that</p>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import { required, requiredIf } from 'vuelidate/lib/validators'
import Link from '@carbon/icons-vue/es/link/16'
import Checkmark from '@carbon/icons-vue/es/checkmark/16'
import { mapActions } from 'vuex'
import intersectionBy from 'lodash/intersectionBy'

export default {
  name: 'LinkPatientsModal',

  components: { Link, Checkmark },


  mixins: [modalMixin],

  data() {
    return {
      form: {},
      name: 'link-patients-modal',
      patients: [],
      step: 1,
      selected: null,
    }
  },

  validations() {
    return {
      form: {
        primary_patient: { required },
        comment: {
          required: requiredIf(() => {
            return this.step === 2
          }),
        },
      },
    }
  },

  events: {
    'patients:link:open': function({params}){
      this.open()
      this.patients = params.map(patient => {
        patient.name = this.$utils.concatData(patient, ['first_name', 'last_name'])
        patient.gender_age_description = patient.age ? `${this.$utils.concatData(patient, ['gender', 'age'], ', ')} years` : this.$utils.concatData(patient, ['gender', 'age'], ', ')
        return patient
      })
      this.form.linked_patients = this.patients.map(patient => patient.uuid)
    },
    'patients:link:close': function(){
      this.close()
    },
  },

  computed: {
    title() {
      let titles = {
        1: 'Choose Primary Patient',
        2: 'Link Patient Data',
        3: '',
      }

      return titles[this.step]
    },

    isSamePatient() {
      let isSameGender = intersectionBy(this.patients, 'gender') === 1
      let isSamePhone = intersectionBy(this.patients, 'mobile') === 1
      let isSameDOB = intersectionBy(this.patients, 'birth_date') === 1
      return isSameGender && isSamePhone && isSameDOB
    },
  },

  methods: {
    ...mapActions({
      getPatients: 'patients/getPatients',
    }),

    async submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill in the required fields')
        return
      }
  
      this.loading = true
  
      try {
        await this.$api.patients.linkPatients(this.$providerId, this.form)
        this.loading = false
        this.step = 3
        this.getPatients({ page: 1, page_size: 10 })
      } catch (error) {
        this.loading = false
        this.$utils.error(error)
        throw error
      }
    },
  },
}
</script>
