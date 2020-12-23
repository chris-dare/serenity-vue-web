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
            name="group-1"
            :label="item"
            :value="item"
            v-model="form.title"
          />
        </div>

        <div class="grid grid-cols-2 gap-8 my-8">
          <cv-text-input
            label="First name (required)"
            v-model="form.first_name"
            placeholder="Patient First Name"
            :invalid-message="$utils.validateRequiredField($v, 'first_name')"
            class="inherit-full-input"
          >
          </cv-text-input>
          <cv-text-input
            label="Last name (required)"
            v-model="form.last_name"
            placeholder="Patient last or family name"
            :invalid-message="$utils.validateRequiredField($v, 'last_name')"
            class="inherit-full-input"
          >
          </cv-text-input>
          <div>
            <cv-text-input
              label="Other names"
              v-model="form.other_names"
              placeholder="Any other name"
              class="inherit-full-input"
            >
            </cv-text-input>
            <cv-date-picker
              kind="single"
              @change="actionChange"
              v-model="form.date"
              class="my-8 w-full max-w-full inherit-full-input"
              placeholder="dd/mm/yyyy"
              label="Date"
            >
            </cv-date-picker>
            <cv-select v-model="form.gender" label="Gender (required)" class="inherit-full-input my-8" placeholder="Male or female">
              <cv-select-option disabled selected hidden
                >Male or female</cv-select-option
              >
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
            <cv-button class="border-serenity-primary text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary px-6" kind="tertiary">Cancel</cv-button>
            <div class="flex items-center">
                <p class="text-primary underline">Save and close</p>
                <cv-button @click="$router.push({name: 'ContactInfo'})" :icon="icon" kind="primary" class="bg-serenity-primary ml-6">Next: Contact Info</cv-button>
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
