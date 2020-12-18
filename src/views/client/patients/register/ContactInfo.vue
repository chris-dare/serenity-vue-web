<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <cv-text-input
        label="Phone number (required)"
        v-model="form.phone_number"
        placeholder="Patient First Name"
        :invalid-message="$utils.validateRequiredField($v, 'phone_number')"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-text-input
        label="Email address"
        v-model="form.email"
        placeholder="Email address"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-text-input
        label="Other phone number"
        v-model="form.other_phone"
        placeholder="Other phone number"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-select
        v-model="form.country"
        label="Country"
        class="inherit-full-input"
      >
        <cv-select-option disabled selected hidden
          >Country</cv-select-option
        >
        <cv-select-option
          v-for="(country, index) in countries"
          :key="index"
          :value="country.name"
          >{{ country.name }}</cv-select-option
        >
      </cv-select>
      <cv-select
        v-model="form.region"
        label="Region"
        class="inherit-full-input"
      >
        <cv-select-option disabled selected hidden
          >Region</cv-select-option
        >
        <cv-select-option
          v-for="(country, index) in countries"
          :key="index"
          :value="country.name"
          >{{ country.name }}</cv-select-option
        >
      </cv-select>
      <cv-text-input
        label="GhanaPost GPS"
        v-model="form.post_code"
        placeholder="Ghana post code"
        class="inherit-full-input"
      >
      </cv-text-input>
    </div>
    <cv-text-input
      label="Home/Residential address"
      v-model="form.address"
      placeholder="Home/Residential address"
      class="inherit-full-input my-8"
    >
    </cv-text-input>
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
          >Cancel</cv-button
        >
        <cv-button @click="$router.push({ name: 'Biodata' })" class="bg-black" kind="primary">Go back</cv-button>
      </div>
      <div class="flex items-center">
        <p class="text-primary underline">Save and close</p>
        <cv-button
          @click="$router.push({ name: 'EmergencyContact' })"
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary ml-6"
          >Next: Emergency</cv-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'ContactInfo',

  data() {
    return {
      form: {},
      icon: ChevronRight,
    }
  },

  validations: {
    form: {
      phone_number: { required },
    },
  },

  mounted() {
    this.getCountries()
  },

  computed: {
    ...mapState({
      countries: (state) => state.global.countries,
    }),
  },

  methods: {
    ...mapActions({
      getCountries: 'global/getCountries',
    }),
  },
}
</script>
