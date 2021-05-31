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
          <cv-text-input
            v-model="form.first_name"
            label="First name (required)"
            placeholder="First Name"
            type="text"
            class="inherit-full-input"
          >
            <template
              v-if="$v.form.first_name.$error"
              slot="invalid-message"
            >
              First name is required
            </template>
          </cv-text-input>
          <cv-text-input
            v-model="form.last_name"
            label="Last name (required)"
            placeholder="Last or family name"
            type="text"
            class="inherit-full-input"
          >
            <template
              v-if="$v.form.last_name.$error"
              slot="invalid-message"
            >
              Last name is required
            </template>
          </cv-text-input>
          <div>
            <cv-date-picker
              v-model="form.date_of_birth"
              kind="single"
              class="my-8 w-full max-w-full inherit-full-input"
              placeholder="dd/mm/yyyy"
              date-label="Date of Birth"
              :cal-options="calOptions"
            />
            <cv-select
              v-model="form.gender"
              label="Gender (required)"
              class="inherit-full-input my-8"
              placeholder="Male or female"
              :invalid-message="$utils.validateRequiredField($v, 'gender')"
            >
              <cv-select-option value="male">Male</cv-select-option>
              <cv-select-option value="female">Female</cv-select-option>
            </cv-select>

            <!-- <MultiSelect
              v-model="form.gender"
              :options="genders"
              title="Gender (required)"
              placeholder="Male or female"
              track-by="code"
              label="display"
              custom-field="code"
              class="my-8"
              preselect
              :multiple="false"
              :error-message="$utils.validateRequiredField($v, 'gender')"
            /> -->
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
      calOptions: {
        'dateFormat': 'm/d/Y',
        maxDate: Date.now(),
      },
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
