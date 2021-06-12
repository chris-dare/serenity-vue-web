<template>
  <SeForm class="space-y-8">
    <MultiSelect
      v-model="type"
      :options="['internal_doctor', 'external_doctor']"
      :custom-label="customLabel"
      title="Type of referee"
      :multiple="false"
      :track-by="null"
      @select="change"
    />
    <MultiSelect
      v-if="type === 'internal_doctor'"
      v-model="form.recipient"
      :options="practitioners"
      :multiple="false"
      title="Doctor"
      label="fullName"
      track-by="id"
    />

    <cv-text-input
      v-else
      v-model="form.recipient_extra_detail"
      class="inherit-full-input pt-4"
      type="text"
      label="Doctor"
      placeholder="Type the name of the doctor to be referred to"
    />

    <PrioritiesSelect
      v-model="form.priority"
      :options="priorities"
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
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapGetters, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'EncounterReferralForm',

  props: {
    referral: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      icon: ChevronRight,
      form: {},
      referralTypes: [ 'CONSULTING_ONLY', 'CONSULTING_WITH_ORDERS', 'TRANSFER_OF_CARE' ],
      loading: false,
      type: 'internal_doctor',
    }
  },

  computed: {
    ...mapState({
      priorities: (state) => state.resources.priorities,
      encounter: (state) => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      practitioners: 'practitioners/practitioners',
      practitionerRoleId: 'auth/practitionerRoleId',
    }),
  },

  validations: {
    form: {
      priority: { required },
      referral_type: { required },
    },
  },

  watch: {
    referral(val) {
      this.type = val.recipient ? 'internal_doctor' : 'external_doctor'
      this.form = { ...val }
    },
  },

  methods: {
    ...mapActions({
      createReferral: 'patients/createReferral',
      updateReferral: 'patients/updateReferral',
    }),

    submit(reroute = false) {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill in the required fields')
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.form.patient = this.$route.params.id
        this.form.encounter = this.encounter.id
        this.form.requester = this.practitionerRoleId
        this.save(reroute)
      }
      
    },

    async save(reroute) {
      this.loading = true

      try {
        let form = { ...this.form, status: 'ACTIVE' }

        if (this.form.recipient) {
          form.recipient = this.form.recipient.practitioner_role.id
        }

        await this.createReferral(form)
        this.loading = false
        this.$toast.open({
          message: 'Referral successfully created',
        })
        this.reset()
        if (reroute) {
          this.$router.push({ name: 'EncounterCarePlan', params: { id: this.$route.params.id }})
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        let form = { ...this.form  }

        if (this.form.recipient) {
          form.recipient = this.form.recipient.practitioner_role.id
        }

        await this.updateReferral(form)
        this.loading = false
        this.$toast.open({
          message: 'Referral successfully updated',
        })
        this.reset()
        this.$router.push({ name: 'EncounterReferral', params: { ...this.$route.params }})
      } catch (error) {
        this.loading = false
      }
    },

    customLabel (value) {
      return value.split('_').join(' ').toLowerCase()
    },

    reset() {
      this.$v.$reset()
      this.$resetData()
    },

    addTag(tag) {
      this.form.recipient_extra_detail = tag
      this.form.recipient = tag
    },

    change() {
      this.form.recipient = null
      this.form.recipient_extra_detail = null
    },
  },
}
</script>