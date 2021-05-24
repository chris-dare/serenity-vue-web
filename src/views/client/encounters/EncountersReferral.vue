<template>
  <div class="relative h-full flex flex-col">
    <SeForm class="space-y-8 flex-1">
      <p class="font-semibold">Patient Referral</p>

      <MultiSelect
        v-model="form.requesting_organization"
        :options="practitioners"
        :multiple="false"
        title="Doctor"
        label="fullName"
        track-by="id"
        custom-field="id"
      />
      <MultiSelect
        v-model="form.priority"
        :options="priorities"
        :multiple="false"
        title="Priority"
        :error-message="$utils.validateRequiredField($v, 'priority')"
      />
      <MultiSelect
        v-model="form.referral_type"
        :options="referralTypes"
        :multiple="false"
        title="Referral Type"
        :custom-label="customLabel"
        :error-message="$utils.validateRequiredField($v, 'referral_type')"
      />

      <cv-text-area
        v-model="form.reason"
        :rows="5"
        label="Reason"
      />

      <div class="flex justify-end mt-12">
        <SeButton
          :icon="icon"
          :loading="loading"
          @click="submit"
        >
          Save
        </SeButton>
      </div>
    </SeForm>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapGetters, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'EncounterReferral',

  data() {
    return {
      icon: ChevronRight,
      form: {},
      referralTypes: [ 'CONSULTING_ONLY', 'CONSULTING_WITH_ORDERS', 'TRANSFER_OF_CARE' ],
      loading: false,
    }
  },

  computed: {
    ...mapState({
      priorities: (state) => state.global.priorities,
      encounter: (state) => state.encounters.currentEncounter,
    }),
    ...mapGetters({
      practitioners: 'practitioners/practitioners',
    }),
  },

  validations: {
    form: {
      priority: { required },
      referral_type: { required },
    },
  },

  methods: {
    ...mapActions({
      createReferral: 'encounters/createReferral',
      updateReferral: 'encounters/updateReferral',
    }),

    submit(reroute = false) {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.form.patient = this.$route.params.id
        this.form.encounter = this.encounter.id
        this.save(reroute)
      }
      
    },

    async save(reroute) {
      this.loading = true

      try {
        await this.createReferral(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Referral successfully added',
        })
        this.reset()
        if (reroute) {
          this.$router.push({ name: 'EncounterLabs'})
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        await this.updateReferral(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Referral successfully updated',
        })
        this.reset()
      } catch (error) {
        this.loading = false
      }
    },

    customLabel (value) {
      return value.split('_').join(' ').toLowerCase()
    },

    reset() {
      this.$v.$reset()
      this.form = {}
    },
  },
}
</script>
