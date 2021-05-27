<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <cv-form
        autocomplete="off"
        class="space-y-8"
        @submit.prevent
      >
        <p class="my-2 font-semibold">{{ form.id ? 'Edit' : 'New' }} {{ form.service_request_category[0].display | removeDash }}</p>

        <div class="grid grid-cols-2 gap-4">
          <cv-text-input
            v-model="form.order_detail[0].display"
            type="text"
            label="Order detail"
          />
          <MultiSelect
            v-model="form.priority"
            title="Priority"
            :options="priorities"
            track-by="code"
            label="display"
            custom-field="code"
            :multiple="false"
          />
          <cv-text-input
            v-model="form.service_request_bodysite[0].display"
            type="text"
            label="Bodysite"
          />
          <cv-text-input
            v-model="form.code"
            type="text"
            label="Code"
          />
          <cv-text-area
            v-model="form.patient_instruction"
            label="Patient Instruction"
            :rows="5"
            class="col-span-2"
          />
        </div>

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
            {{ form.id ? 'Update' : 'Create' }} {{ form.service_request_category[0].display | removeDash }}
          </SeButton>
        </div>
      </cv-form>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'ServiceRequestModal',

  data() {
    return {
      form: {
        order_detail: [{display: ''}],
        service_request_bodysite: [{display: ''}],
        service_request_category: [{display: ''}],
      },
      visible: false,
      loading: false,
      categories: [ 'laboratory-procedure', 'imaging', 'counselling', 'education', 'surgical-procedure' ],
    }
  },

  events: {
    'service:request:open': function(data){
      this.visible = true
      this.form.service_request_category = [{display: data.params[0]}]
    },
    'service:request:edit': function(data){
      this.visible = true
      this.form = { ...data.params[0] }
    },
    'service:request:close': function(){
      this.visible = false
    },
  },

  validations: {
    form: {
      service_request_category: { required },
      order_detail: {
        required,
        minLength: minLength(1),
        $each: {
          display: { required },
        },
      },
      service_request_bodysite: {
        required,
        minLength: minLength(1),
        $each: {
          display: { required },
        },
      },
    },
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      priorities: (state) => state.resources.priorities,
      encounter: (state) => state.encounters.currentEncounter,
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
        this.form.location = this.location.id
        this.form.encounter = this.encounter.id
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

    close() {
      this.form = {
        order_detail: [{display: ''}],
        service_request_bodysite: [{display: ''}],
        service_request_category: [{display: ''}],
      }
      this.$v.$reset()
      this.visible = false
    },

    customLabel (value) {
      return value.split('-').join(' ')
    },
  },
}
</script>
