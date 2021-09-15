<template>
  <div>
    <cv-form @submit.prevent="">
      <!-- title -->
      <div>
        <p class="text-primary mb-4 text-left">Title</p>
        <div class="flex items-center justify-between w-full">
          <cv-radio-button
            v-for="(item, index) in titles"
            :key="index"
            v-model="form.title"
            name="group-1"
            :label="item"
            :value="item"
          />
        </div>

        <div class="grid grid-cols-2 gap-8 mt-8 mb-12">
          <FormInput
            v-model="form.first_name"
            label="First name"
            placeholder="First Name"
            type="text"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'first_name')"
            required
          />
          <FormInput
            v-model="form.last_name"
            label="Last name"
            placeholder="Last or family name"
            type="text"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'last_name')"
            required
          />
          <div>
            <DatePicker
              v-model="form.date_of_birth"
              kind="single"
              class="w-full max-w-full inherit-full-input se-input-gray"
              placeholder="dd/mm/yyyy"
              label="Date of Birth"
              :max-date="maxDate"
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
              class="my-8"
              preselect
              :multiple="false"
              :error-message="$utils.validateRequiredField($v, 'gender')"
              required
            />
          </div>
          <div>
            <p class="text-primary mb-2 text-left">Capture or Upload Photo</p>
            <Webcam @input="(photo) => form.image_url = photo" />
            <FileUploadButton title="Or upload photo" />
          </div>
        </div>

        <div class="flex items-center justify-between mt-12 mb-6">
          <SeButton
            :to="{name: 'Team'}"
            variant="outline"
          >
            Cancel
          </SeButton>
          <SeButton
            :icon="icon"
            @click="save"
          >
            Next
          </SeButton>
        </div>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import subYears from 'date-fns/subYears'

export default {
  name: 'TeamBiodata',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        title: 'Mr',
        gender: '',
      },
      titles: ['Mr', 'Mrs', 'Miss', 'Hon', 'Dr', 'Prof', 'Master'],
    }
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      gender: { required },
    },
  },

  computed: {
    ...mapState({
      storeData: (state) => state.practitioners.currentUser,
      genders: (state) => state.resources.genders,
    }),
    maxDate() {
      return subYears(Date.now(), 18)
    },

    calOptions() {
      return {
        'dateFormat': 'm/d/Y',
        maxDate: subYears(Date.now(), 18),
      }
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'practitioners/addToCurrentUser',
    }),

    save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.addToStoreData(this.form)
      this.$router.push({ name: 'TeamContactInformation' })
    },
  },
}
</script>
