<template>
  <BaseModal
    :name="name"
    width="450px"
    title="Start Encounter"
    @closed="close"
  >
    <template>
      <SeForm>
        <div class="space-y-8">
          <MultiSelect
            v-model="form.service_type"
            title="Service type"
            :multiple="false"
            :options="services"
            label="healthcare_service_name"
            placeholder="Select service type"
            custom-field="id"
            track-by="id"
            internal-search
            :error-message="$utils.validateRequiredField($v, 'service_type')"
            required
          />
          <MultiSelect
            v-model="form.encounter_class"
            title="Encounter class"
            :multiple="false"
            :options="encounterClasses"
            label="display"
            placeholder="Select code"
            custom-field="code"
            track-by="code"
            internal-search
            :error-message="$utils.validateRequiredField($v, 'encounter_class')"
            required
          />
          <MultiSelect
            v-model="form.priority"
            title="Priority"
            :multiple="false"
            :options="encounterPriorities"
            label="display"
            placeholder="Select priority"
            custom-field="code"
            track-by="code"
            internal-search
            :error-message="$utils.validateRequiredField($v, 'priority')"
            required
          />
          <div class="flex items-center justify-between">
            <SeButton
              variant="secondary"
              @click="close"
            >
              Cancel
            </SeButton>
            <SeButton
              :loading="loading"
              @click="start"
            >
              Start Encounter
            </SeButton>
          </div>
        </div>
      </SeForm>
    </template>
  </BaseModal>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import modalMixin from '@/mixins/modal'

export default {
  name: 'StartEncounterModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'start-encounter-modal',
    }
  },

  computed: {
    ...mapState({
      codes: state => state.resources.encounterClasses,
      encounterPriorities: state => state.resources.encounterPriorities,
      services: state => state.services.services,
      provider: state => state.auth.provider,
      user: state => state.auth.user,
    }),

    ...mapGetters({
      patientNextAppointment: 'appointments/patientNextAppointment',
      practitionerRoleId: 'auth/practitionerRoleId',
    }),

    encounterClasses() {
      return this.codes.filter(code => code.code !== 'diagnostic' && code.code !== 'pharmacy')
    },
  },

  events: {
    'start:encounter:open': function(){
      this.open()
    },
    'start:encounter:close': function(){
      this.close()
    },
  },

  validations() {
    return {
      form: {
        service_type: { required },
        encounter_class: { required },
        priority: { required },
      },
    }
  },

  created() {
    this.getEncounterClasses()
  },

  methods: {
    ...mapActions({
      startEncounter: 'encounters/createEncounter',
      getEncounterClasses: 'resources/getEncounterClasses',
    }),

    async start() {
      this.$v.$touch()

      if (this.$v.$invalid || this.disabled) {
        this.$toast.error('Fill all required fields!')
        return
      }

      let form = { patient: this.$route.params.id, ...this.form }
      // TODO
      form.encounter_participant = [{ practitioner_role: this.practitionerRoleId, type: 'PRIMARY_PERFORMER' }]

      try {
        this.loading = true
        await this.startEncounter(form)
        this.$toast.open({ message: 'Encounter has started' })
        this.loading = false
        this.close()
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
