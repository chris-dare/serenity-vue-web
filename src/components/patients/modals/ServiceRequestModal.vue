<template>
  <BaseModal
    :name="name"
    width="450px"
    :title="form.id ? 'Edit Service Request' : 'New Service Request'"
    @closed="close"
  >
    <template>
      <cv-form
        autocomplete="off"
        class="space-y-8"
        @submit.prevent
      >
        <ServiceRequestForm
          v-model="form"
          :v="$v"
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
            @click="submit"
          >
            {{ form.id ? 'Update' : 'Create' }} Service Request
          </SeButton>
        </div>
      </cv-form>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import ServiceRequestForm from '@/components/forms/ServiceRequestForm'
import modalMixin from '@/mixins/modal'

export default {
  name: 'ServiceRequestModal',

  components: {ServiceRequestForm},

  mixins: [modalMixin],

  data() {
    return {
      form: {
        priority: 'routine',
        intent: 'plan',
      },
      loading: false,
      categories: [ 'laboratory-procedure', 'imaging', 'counselling', 'education', 'surgical-procedure' ],
      name: 'service-request-modal',
    }
  },

  events: {
    'service:request:open': function(){
      this.open()
    },
    'service:request:edit': function(data){
      this.open()
      this.form = { ...data.params[0] }
    },
    'service:request:close': function(){
      this.close()
    },
  },

  validations: {
    form: {
      code: { required },
    },
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      priorities: (state) => state.resources.priorities,
      encounter: (state) => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      visitId : 'visits/visitId',
    }),
  },

  methods: {
    ...mapActions({
      createServiceRequest: 'patients/createServiceRequest',
      updateServiceRequest: 'patients/updateServiceRequest',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.form.requesting_practitioner_role = this.provider.practitionerRoleId
        this.form.patient = this.$route.params.id
        this.form.requested_location = this.location.id
        this.form.visit_id = this.visitId
        this.form.encounter = this.encounter.id
        this.form.location = this.$locationId
        this.form.status = this.$isCurrentWorkspace('IPD') ? 'active' : 'draft'

        this.save()
      }
    },

    async save() {
      this.loading = true

      try {
        await this.createServiceRequest([this.form])
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully added',
        })
        this.close()
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        await this.updateServiceRequest(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully updated',
        })
        this.close()
      } catch (error) {
        this.loading = false
      }
    },

    customLabel (value) {
      return value.split('-').join(' ')
    },
  },
}
</script>
