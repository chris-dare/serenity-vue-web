<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} workspace</p>
        <cv-text-input
          v-model="form.workspace_name"
          label="Name"
          placeholder="eg Out patient"
        />
        <p>Workspace features access</p>
        <cv-checkbox
          v-model="form.workspace_type"
          value="check-1"
          label="Patients"
        />
        <cv-checkbox
          v-model="form.workspace_type"
          value="check-2"
          label="Billing"
        />
        <cv-checkbox
          v-model="form.workspace_type"
          value="check-3"
          label="Appointments"
        />
        <cv-checkbox
          v-model="form.workspace_type"
          value="check-4"
          label="Visits"
        />
        <cv-checkbox
          v-model="form.workspace_type"
          value="check-5"
          label="Schedules"
        />
        <cv-button-skeleton
          v-if="loading"
          class="w-full"
        />
        <SeButton
          v-else
          full
          @click="save"
        >
          {{ form.id ? 'Save changes' : 'Create new workspace' }}
        </SeButton>
        <p
          class="text-center"
          @click="visible = false"
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
        workspace_type: [],
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
      this.form = data.params[0]
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
      const data = await this.createWorkspace(this.form).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Workspace successfully added',
        })
        this.visible = false
      }

      this.loading = false
    },
    async update() {
      this.loading = true
      const data = await this.updateWorkspace(this.form).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Workspace successfully updated',
        })
        this.visible = false
      }

      this.loading = false
      
    },
  },
}
</script>
