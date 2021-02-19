<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <cv-select
        v-model="form.marital_status"
        label="Marital status"
        class="inherit-full-input"
      >
        <cv-select-option
          disabled
          selected
          hidden
        >
          Country
        </cv-select-option>
        <cv-select-option
          value="married"
        >
          Married
        </cv-select-option>
        <cv-select-option
          value="single"
        >
          Single
        </cv-select-option>
        <cv-select-option
          value="relationship"
        >
          In a relationship
        </cv-select-option>
      </cv-select>
      <cv-select
        v-model="form.religion"
        label="Religion"
        class="inherit-full-input"
      >
        <cv-select-option
          disabled
          selected
          hidden
        >
          Region
        </cv-select-option>
        <cv-select-option
          v-for="(religion, index) in religions"
          :key="index"
          :value="religion"
        >
          {{ religion }}
        </cv-select-option>
      </cv-select>
      <cv-text-input
        v-model="form.home_language"
        label="Home Language"
        placeholder="Primary language you speak"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.email"
        label="Occupation"
        placeholder="Occupation"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.company"
        label="Company/Employer"
        placeholder="Where do you work?"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.office_phone_number"
        label="Office Phone number"
        placeholder="Workplace phone or telephone"
        class="inherit-full-input"
      />
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary mr-6 px-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
        >
          Cancel
        </cv-button>
        <cv-button
          class="bg-black px-6"
          kind="primary"
          @click="$router.push({ name: 'EmergencyContact' })"
        >
          Go back
        </cv-button>
      </div>
      <div class="flex items-center">
        <p class="text-primary underline">Save and close</p>
        <cv-button
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary ml-6"
          @click="$router.push({ name: 'Payment' })"
        >
          Next: Payment
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'SocialInfo',

  data() {
    return {
      form: {},
      icon: ChevronRight,
      religions: ['christianity', 'islam'],
    }
  },
}
</script>
