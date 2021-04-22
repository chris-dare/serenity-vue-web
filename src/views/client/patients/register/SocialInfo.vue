<template>
  <cv-form
    autocomplete="off"
    @submit.prevent=""
  >
    <div class="grid grid-cols-2 gap-8">
      <MultiSelect
        v-model="form.marital_status"
        title="Marital Status"
        :multiple="false"
        :options="statuses"
        label="label"
        track_by="value"
        placeholder="Marital Status"
      />
  
      <cv-select
        v-model="form.religious_affiliation"
        label="Religion"
        class="inherit-full-input"
      >
        <cv-select-option
          disabled
          selected
          hidden
        >
          Religion
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
        v-model="form.preferred_communication"
        label="Home Language"
        placeholder="Primary language you speak"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.meta.email"
        label="Occupation"
        type="text"
        placeholder="Occupation"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.meta.company"
        label="Company/Employer"
        placeholder="Where do you work?"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.meta.office_phone_number"
        label="Office Phone number"
        placeholder="Workplace phone or telephone"
        class="inherit-full-input"
      />
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          variant="outline"
        >
          Cancel
        </SeButton>
        <SeButton
          :to="{ name: previous }"
          variant="secondary"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          @click="save"
        >
          Next: Payment
        </SeButton>
      </div>
    </div>
  </cv-form>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
export default {
  name: 'SocialInfo',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        meta: {},
      },
      religions: ['christianity', 'islam'],
      previous: 'EmergencyContact',
      next: 'Payment',
      parent: 'Patients',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
    }),
    ...mapGetters({
      statuses: 'global/maritalStatuses',
    }),
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),

    save() {
      // this.$v.$touch()

      // if (this.$v.$invalid) {
      //   this.$toast.open({
      //     message: 'Fill all required fields!',
      //     type: 'error',
      //   })
      //   return
      // }

      this.addToStoreData(this.form)
      this.$router.push({ name: this.next })
    },
  },
}
</script>
