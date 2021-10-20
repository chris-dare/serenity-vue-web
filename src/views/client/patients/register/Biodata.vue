<template>
  <div>
    <MultiStepBase
      next-label="Next: Contact Info"
      :loading="loading"
      :next="next"
      :icon="icon"
      :query="$route.query"
      @cancel="cancel"
      @save="validateAndReroute"
    >
      <!-- title -->
      <div class="space-y-8">
        <Titles
          v-model="form.name_prefix"
        />

        <div class="grid grid-cols-2 gap-8 my-8">
          <FormInput
            v-model="form.first_name"
            required
            label="First name"
            placeholder="Patient First Name"
            :invalid-message="$utils.validateRequiredField($v, 'first_name')"
            type="text"
            class="inherit-full-input"
          />

          <FormInput
            v-model="form.last_name"
            required
            label="Last name"
            placeholder="Patient last or family name"
            :invalid-message="$utils.validateRequiredField($v, 'last_name')"
            type="text"
            class="inherit-full-input"
          />
          <div class="space-y-8">
            <FormInput
              v-model="form.other_names"
              label="Other names"
              placeholder="Any other name"
              type="text"
              class="inherit-full-input"
            />
            <DatePicker
              v-model="form.birth_date"
              kind="single"
              class="w-full max-w-full inherit-full-input se-input-gray"
              placeholder="dd/mm/yyyy"
              label="Date of Birth"
              :error-message="$utils.validateRequiredField($v, 'birth_date')"
              required
            />

            <MultiSelect
              v-model="form.gender"
              :options="genders"
              title="Gender"
              placeholder="Male or female"
              required
              track-by="code"
              label="display"
              custom-field="code"
              preselect
              :multiple="false"
              :invalid-message="$utils.validateRequiredField($v, 'gender')"
            />
            <MultiSelect
              v-model="form.blood_type"
              :options="bloodTypes"
              title="Blood Type"
              placeholder=""
              :multiple="false"
            />
          </div>
            
          <UploadImage
            v-model="form.photo"
            label="Capture or Upload Patient Photo"
          />
        </div>
      </div>
    </MultiStepBase>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import { mapActions, mapState } from 'vuex'
import subYears from 'date-fns/subYears'

export default {
  name: 'Biodata',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        name_prefix: 'Mr',
      },
      next: 'ContactInfo',
      parent: 'Patients',
      calOptions: {
        'dateFormat': 'Y-m-d',
      },
      image: null,
    }
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      gender: { required },
      birth_date: { required },
    },
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
      genders: (state) => state.resources.genders,
      bloodTypes: (state) => state.resources.bloodTypes,
    }),

    maxDate() {
      return subYears(Date.now(), 18)
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),
  },
}
</script>
