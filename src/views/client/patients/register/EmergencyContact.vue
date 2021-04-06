<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <cv-text-input
        v-model="form.first_name"
        label="First Name"
        placeholder="First Name"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.last_name"
        label="Last Name"
        type="text"
        placeholder="Last Name"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.phone_number"
        label="Phone number"
        placeholder="Other phone number"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.emergency_contact"
        label="Place of work"
        placeholder="Emergency contact"
        type="text"
        class="inherit-full-input"
      />
    </div>
    <cv-text-input
      v-model="form.address"
      label="Home/Residential address"
      placeholder="Emergency contact’s home or residential address"
      type="text"
      class="inherit-full-input my-8"
    />
    <cv-text-input
      v-model="form.address"
      label="Relationship type"
      placeholder="Who is this person to you?"
      type="text"
      class="my-8"
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
          @click="$router.push({ name: 'ContactInfo' })"
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
          @click="$router.push({ name: 'SocialInfo' })"
        >
          Next: Social Info
        </cv-button>
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
