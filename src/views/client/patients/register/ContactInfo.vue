<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <cv-text-input
        v-model="form.phone_number"
        label="Phone number (required)"
        placeholder="Patient First Name"
        :invalid-message="$utils.validateRequiredField($v, 'phone_number')"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.email"
        label="Email address"
        placeholder="Email address"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.other_phone"
        label="Other phone number"
        placeholder="Other phone number"
        class="inherit-full-input"
      />
      <cv-select
        v-model="form.country"
        label="Country"
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
          v-for="(country, index) in countries"
          :key="index"
          :value="country.name"
        >
          {{ country.name }}
        </cv-select-option>
      </cv-select>
      <cv-select
        v-model="form.region"
        label="Region"
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
          v-for="(country, index) in countries"
          :key="index"
          :value="country.name"
        >
          {{ country.name }}
        </cv-select-option>
      </cv-select>
      <cv-text-input
        v-model="form.post_code"
        label="GhanaPost GPS"
        placeholder="Ghana post code"
        class="inherit-full-input"
      />
    </div>
    <cv-text-input
      v-model="form.address"
      label="Home/Residential address"
      placeholder="Home/Residential address"
      class="inherit-full-input my-8"
    />
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary px-6 mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
        >
          Cancel
        </cv-button>
        <cv-button
          class="bg-black px-6"
          kind="primary"
          @click="$router.push({ name: 'Biodata' })"
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
          @click="$router.push({ name: 'EmergencyContact' })"
        >
          Next: Emergency
        </cv-button>
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

  computed: {
    ...mapState({
      countries: (state) => state.global.countries,
    }),
  },

  mounted() {
    this.getCountries()
  },

  

  methods: {
    ...mapActions({
      getCountries: 'global/getCountries',
    }),
  },
}
</script>
