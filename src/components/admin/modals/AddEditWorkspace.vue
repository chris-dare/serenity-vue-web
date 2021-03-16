<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="space-y-8 left-button">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} workspace</p>
        <cv-text-input
          v-model="form.workspace_name"
          label="Name"
          placeholder="eg Out patient"
        />
        <div class="flex flex-row justify-center">
          <div class="flex flex-col items-start space-y-8">
            <p>Workspace features access</p>
            <cv-radio-button
              v-model="form.workspace_type"
              value="PATIENTS"
              label="Patients"
            />
            <cv-radio-button
              v-model="form.workspace_type"
              value="BILL"
              label="Billing"
            />
            <cv-radio-button
              v-model="form.workspace_type"
              value="APPOINTMENTS"
              label="Appointments"
            />
            <cv-radio-button
              v-model="form.workspace_type"
              value="VISITS"
              label="Visits"
            />
            <cv-radio-button
              v-model="form.workspace_type"
              value="SCHEDULES"
              label="Schedules"
            />
            <cv-button-skeleton
              v-if="loading"
              class="w-full"
            />
            <SeButton
              v-else
              full
              @click="submit"
            >
              {{ form.id ? 'Save changes' : 'Create new workspace' }}
            </SeButton>
          </div>
        </div>
        <p
          class="text-center"
          @click="close"
        >
          Cancel
        </p>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddEditWorkspace',

  data() {
    return {
      form: {
        workspace_type: '',
      },
      visible: false,
      loading: false,
    }
  },

  events: {
    'workspace:add:open': function(){
      this.visible = true
    },
    'workspace:edit:open': function(data){
      this.visible = true
      this.form = { ...data.params[0] }
    },
  },

  methods: {
    ...mapActions({
      createWorkspace: 'workspaces/createWorkspace',
      updateWorkspace: 'workspaces/updateWorkspace',
    }),
    submit(){
      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },
    async save() {
      this.loading = true
      const data = await this.createWorkspace(this.form).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          duration: 0,
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: data.message,
        })
        this.close()
      }

      this.loading = false
    },
    async update() {
      this.loading = true
      const data = await this.updateWorkspace(this.form).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: data.message || 'Workspace successfully updated',
        })
        this.close()
      }

      this.loading = false
      
    },
    close() {
      this.visible = false
      this.form = {
        workspace_type: [],
      }
    },
  },
}
</script>
