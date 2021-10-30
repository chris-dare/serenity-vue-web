<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <SeForm
        v-if="confirmed"
        class="space-y-8"
      >
        <p class="text-lg font-semibold">Here is the link to your meeting</p>
        <FormMixedInput
          v-model="form.title"
          type="text"
          label="share this link with patient to start a meeting"
          placeholder="meetingID.link/virtual-care"
          :suffix-icon="icon"
        />
        <div class="flex justify-center items-center">
          <SeButton
            variant="secondary"
            @click="confirmed = false"
          >
            Go back
          </SeButton>
        </div>
      </SeForm>
      <SeForm
        v-else
        class="space-y-8"
      >
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Create a' }} meeting</p>
        <cv-text-input
          v-model="form.title"
          type="text"
          label="Title"
          placeholder="Name of the meeting"
        />
        <div class="grid grid-cols-2 gap-8">
          <DatePicker
            v-model="form.date"
            label="Date"
            placeholder="dd/mm/yyyy"
          />
          <Timepicker
            v-model="form.time"
            label="Time"
            placeholder="12:00am"
          />
          <cv-text-input
            v-model="form.duration"
            type="number"
            label="Duration in minutes"
            placeholder="30 minutes"
          />
        </div>
        <div class="flex justify-between items-center">
          <SeButton variant="secondary">Go back</SeButton>
          <SeButton 
            :loading="loading"
            @click="submit"
          >
            {{ form.id ? 'Update meeting' : 'Create meeting' }}
          </SeButton>
        </div>
      </SeForm>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Copy from '@carbon/icons-vue/es/copy--link/32'

export default {
  name: 'CreateMeetingModal',

  data() {
    return {
      form: {
        sub_group: 'Medication',
        category: 'medical-stock',
      },
      loading: false,
      visible: false,
      icon: Copy,
      confirmed: false,
    }
  },

  validations: {
    form: {
      category: { required },
    },
  },

  events: {
    'create:meeting:open': function(){
      this.visible = true
    },
  },

  methods: {
    ...mapActions({
      createMeeting: 'inventory/createMeeting',
      updateMeeting: 'inventory/updateMeeting',
    }),

    submit(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Please these fields are required!',
          type: 'error',
        })
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true

      try {
        await this.createMeeting(this.form)
        this.$toast.open({
          message: 'Meeting successfully added',
        })
        this.visible = false

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      this.loading = true
      try {
        await this.updateMeeting(this.form)
        this.$toast.open({
          message: 'Meeting successfully updated',
        })
        this.visible = false

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    close() {
      this.form = {
        sub_group: 'Medication',
        category: 'medical-stock',
      }
      this.$v.$reset()
      this.visible = false
    },
  },
}
</script>
