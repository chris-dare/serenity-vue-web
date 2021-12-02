<template>
  <BaseModal
    class="se-no-title-modal"
    :name="name"
    height="auto"
    :title="type === 'update' ? 'Edit Role' : 'Duplicate Role'"
    scrollable
    @closed="close"
  >
    <template>
      <div class="space-y-8">
        <FormInput
          v-model="form.name"
          type="text"
          label="Name of role"
          placeholder="eg Account"
          :invalid-message="$utils.validateRequiredField($v, 'name')"
          required
        />
        <div class="space-y-2">
          <p class="bx--label">Workspace access</p>

          <div class="grid grid-cols-3">
            <cv-checkbox
              v-for="(workspace, index) in workspaces"
              :key="index"
              v-model="form.permissions.workspaces"
              :value="workspace.workspace_type"
              :label="workspace.workspace_name"
            />
          </div>
        </div>
        <div class="space-y-2">
          <p class="bx--label">Set permissions</p>
          <Search
            v-model="search"
            placeholder="Search for feature"
          />

          <div class="h-96 overflow-auto">
            <div class="grid grid-cols-4 items-center h-8 bg-gray-100">
              <p
                v-for="(item, index) in columns"
                :key="index"
                class="text-center"
              >
                {{ item }}
              </p>
            </div>
            <div>
              <div
                v-for="(resource, index) in filteredResourceInd"
                :key="index"
                class="grid grid-cols-4 items-center h-12"
              >
                <div class="flex items-center pl-6 capitalize">
                  {{ resource.value }}
                </div>
                <div
                  v-for="(group, rIndex) in resource.groups"
                  :key="rIndex"
                  class="flex items-center justify-center"
                >
                  <cv-checkbox
                    v-model="form.permissions.resources"
                    :value="getValue(resource.value, group)"
                    class="flex-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <SeButton
            variant="secondary"
            @click="visible = false"
          >
            Cancel
          </SeButton>
          <cv-button-skeleton
            v-if="loading"
          />
          <SeButton
            v-else
            @click="submit"
          >
            {{ type === 'update' ? 'Save changes' : 'Duplicate role' }}
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import modalMixin from '@/mixins/modal'

export default {
  name: 'AddEditRole',

  mixins: [modalMixin],

  data() {
    return {
      form: {
        name: '',
        permissions: {
          workspaces: [],
          resources: [],
        },
      },
      visible: false,
      search: '',
      columns: [
        'Resources',
        'Read',
        'Write',
        'Delete',
      ],
      loading: false,
      type: 'update',
      name: 'add-edit-roles',
    }
  },
  validations: {
    form: {
      name: { required },
    },
  },


  computed: {
    ...mapState({
      resources: (state) => state.resources.resources,
      workspaces: (state) => state.workspaces.workspaces,

    }),
    ...mapGetters({
      resourceInd: 'resources/resources',
    }),
    filteredResourceInd(){
      return this.resourceInd.filter(el => {
        return el.rootLabel.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  events: {
    'role:add:open': function(){
      this.open()
    },
    'role:edit:open': function(data){
      this.open()
      this.form = this.$utils.formatIncomingRoles(data.params[0])
      this.type = 'update'
    },
    'role:duplicate:open': function(data){
      this.open()
      this.form = this.$utils.formatIncomingRoles(data.params[0])
      this.form.name += ' Duplicate'
      this.type = 'duplicate'
    },
  },

  methods: {
    ...mapActions({
      createRole: 'roles/createRole',
      updateRole: 'roles/updateRole',
      duplicateRole: 'roles/duplicateRole',
    }),

    getValue(resource,permission){
      return `${resource}.${permission}`
    },

    submit(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Please name is required!',
          type: 'error',
        })
        return
      }

      if (this.type === 'update') {
        this.update()
      } else {
        this.duplicate()
      }
    },

    async save() {
      this.loading = true
      const data = await this.createRole(this.form).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Role successfully added',
        })
        this.close()
      }

      this.loading = false
    },

    async update() {
      this.loading = true
      const params = this.$utils.formatOutgoingRoles(this.form)
      await this.updateRole(params).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      })

      this.$toast.open({
        message: 'Role successfully updated',
      })
      this.close()

      this.loading = false
    },

    async duplicate() {
      this.loading = true
      const params = this.$utils.formatOutgoingRoles(this.form)
      await this.duplicateRole(params).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      })


      this.$toast.open({
        message: 'Role successfully duplicated',
      })
      this.close()

      this.loading = false
    },
  },
}
</script>
