<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <cv-text-input
        label="First Name"
        v-model="form.first_name"
        placeholder="First Name"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-text-input
        label="Last Name"
        v-model="form.last_name"
        placeholder="Last Name"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-text-input
        label="Phone number"
        v-model="form.phone_number"
        placeholder="Other phone number"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-text-input
        label="Place of work"
        v-model="form.emergency_contact"
        placeholder="Emergency contact"
        class="inherit-full-input"
      >
      </cv-text-input>
    </div>
    <cv-text-input
      label="Home/Residential address"
      v-model="form.address"
      placeholder="Emergency contact’s home or residential address"
      class="inherit-full-input my-8"
    ></cv-text-input>
    <cv-text-input
      label="Relationship type"
      v-model="form.address"
      placeholder="Who is this person to you?"
      class="my-8"
    >
    </cv-text-input>
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
          >Cancel</cv-button
        >
        <cv-button @click="$router.push({ name: 'ContactInfo' })" class="bg-black" kind="primary">Go back</cv-button>
      </div>
      <div class="flex items-center">
        <p class="text-primary underline">Save and close</p>
        <cv-button
          @click="$router.push({ name: 'SocialInfo' })"
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary ml-6"
          >Next: Social Info</cv-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'EmergencyContact',

  data() {
    return {
      form: {},
      icon: ChevronRight,
    }
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
