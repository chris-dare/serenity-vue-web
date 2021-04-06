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

        <div class="grid grid-cols-2 gap-8 my-8">
          <cv-text-input
            v-model="form.first_name"
            label="First name (required)"
            placeholder="Patient First Name"
            :invalid-message="$utils.validateRequiredField($v, 'first_name')"
            type="text"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.last_name"
            label="Last name (required)"
            placeholder="Patient last or family name"
            :invalid-message="$utils.validateRequiredField($v, 'last_name')"
            type="text"
            class="inherit-full-input"
          />
          <div>
            <cv-text-input
              v-model="form.other_names"
              label="Other names"
              placeholder="Any other name"
              type="text"
              class="inherit-full-input"
            />
            <cv-date-picker
              v-model="form.date"
              kind="single"
              class="my-8 w-full max-w-full inherit-full-input"
              placeholder="dd/mm/yyyy"
              date-label="Date of Birth"
            />
            <cv-select
              v-model="form.gender"
              label="Gender (required)"
              class="inherit-full-input my-8"
              placeholder="Male or female"
            >
              <cv-select-option
                disabled
                selected
                hidden
              >
                Male or female
              </cv-select-option>
              <cv-select-option value="male">Male</cv-select-option>
              <cv-select-option value="female">FeMale</cv-select-option>
            </cv-select>
          </div>
          <div>
            <p class="text-primary mb-2 text-left">Capture or Upload Patient Photo</p>
            <Webcam />
            <FileUploadButton title="Or upload patient photo" />
          </div>
        </div>

        <div class="flex items-center justify-between mt-12 mb-6">
          <cv-button
            class="border-serenity-primary text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary px-6"
            kind="tertiary"
          >
            Cancel
          </cv-button>
          <div class="flex items-center">
            <p class="text-primary underline">Save and close</p>
            <cv-button
              :icon="icon"
              kind="primary"
              class="bg-serenity-primary ml-6"
              @click="$router.push({name: 'ContactInfo'})"
            >
              Next: Contact Info
            </cv-button>
          </div>
        </div>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  data() {
    return {
      form: {
        title: 'Mr.',
      },
      titles: ['Mr.', 'Mrs', 'Miss', 'Hon.', 'Dr.', 'Prof.', 'Master'],
      icon: ChevronRight,
    }
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      gender: { required },
    },
  },

  methods: {
    actionChange() {},
  },
}
</script>

<style></style>
