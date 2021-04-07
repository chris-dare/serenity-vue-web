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
          :invalid-message="$utils.validateRequiredField($v, 'workspace_name')"
        />

        <div>
          <div class="flex flex-col items-start space-y-6">
            <p class="bx--label">Workspace features access</p>
            <cv-radio-button
              v-for="workspaceType in workspaceTypes"
              :key="workspaceType.value"
              v-model="form.workspace_type"
              :value="workspaceType.type"
              :label="workspaceType.name"
            />
            <p
              v-if="$utils.validateRequiredField($v, 'workspace_type')"
              class="error"
            >
              Workspace type is required
            </p>
          </div>
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
            full
            @click="submit"
          >
            {{ form.id ? 'Save changes' : 'Create new workspace' }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddEditWorkspace',

  data() {
    return {
      form: {
        workspace_type: '',
      },
      visible: false,
      loading: false,
      workspaceTypes: [
        {'name': 'Billing', 'type': 'BILL'},
        {'name': 'Reception', 'type': 'RECEPT'},
        {'name': 'Out Patient', 'type': 'OPD'},
        {'name': 'In Patient', 'type': 'IPD'},
        {'name': 'Pharmacy', 'type': 'PHARM'},
        {'name': 'Virtual Care', 'type': 'VIRT'},
        {'name': 'Diagnostic', 'type': 'DIAG'},
        {'name': 'Home Care', 'type': 'HOME'},
        {'name': 'Emergency', 'type': 'EMERG'},
        {'name': 'Mother and Child', 'type': 'MOM'},
        {'name': 'Admin', 'type': 'ADMIN'},
      ],
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

  validations: {
    form: {
      workspace_name: { required },
      workspace_type: { required },
    },
  },

  methods: {
    ...mapActions({
      createWorkspace: 'workspaces/createWorkspace',
      updateWorkspace: 'workspaces/updateWorkspace',
    }),

    submit(){
      this.$v.$touch()

      if (this.$v.$invalid) {
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
      const data = await this.createWorkspace(this.form).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          // TODO remove this once the backend is returning the right message
          message: 'Workspace created successfully' || data.message,
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
