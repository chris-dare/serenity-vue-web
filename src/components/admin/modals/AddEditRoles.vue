<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Add' }} Role</p>
        <cv-text-input
          v-model="form.name"
          label="Name of role"
          placeholder="eg Valley Heights"
        />
        <div class="space-y-2">
          <p class="text-primary text-left text-xs">Workspace access</p>
          <div class="grid grid-cols-3">
            <cv-checkbox
              v-for="(workspace, index) in workspaces"
              :key="index"
              v-model="form.permissions.workspaces"
              :value="workspace.id"
              :label="workspace.name"
            />
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-primary text-left text-xs">Set permissions</p>
          <cv-search
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
                <!-- <div class="flex items-center justify-center">
                  <cv-checkbox
                    v-model="form.permissions.resources"
                    :value="getValue(resource.value, 'write')"
                    class="flex-none"
                  />
                </div>
                <div class="flex items-center justify-center">
                  <cv-checkbox
                    v-model="form.permissions.resources"
                    :value="getValue(resource.value, 'delete')"
                    class="flex-none"
                  />
                </div> -->
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
            {{ form.id ? 'Save changes' : 'Create new role' }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'AddEditRole',

  data() {
    return {
      form: {
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
    }
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
      this.visible = true
    },
    'role:edit:open': function(data){
      this.visible = true
      this.form = this.formatIncomingResources(data.params[0])
    },
  },

  methods: {
    ...mapActions({
      createRole: 'roles/createRole',
      updateRole: 'roles/updateRole',
    }),

    getValue(resource,permission){
      return `${resource}.${permission}`
    },

    submit(){
      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    formatIncomingResources(data) {
      let role = { ...data }
      let resources = data.permissions.resources
      let newResources = []

      resources.forEach(resource => {
        if (resource.includes('*')) {
          let split = resource.split('.')
          let root = split.length === 2 ? split[0] : `${split[0]}.${split[1]}`
          newResources.push(`${root}.read`,`${root}.write`,`${root}.delete`)
        } else {
          newResources.push(resource)
        }
      })

      role.permissions.resources = newResources
      return role
    },

    formatOutgoingResources(data) {
      let role = { ...data }
      let resources = data.permissions.resources
      let newResources = []

      let splits = {}
      resources.forEach(resource => {
        let split = resource.split('.')
        split = [ split.slice(0, split.length - 1).join('.'), split[split.length - 1] ]
        splits[split[0]] = splits[split[0]] || []
        if(!splits[split[0]].includes(split[1])){
          splits[split[0]].push(split[1])
        }
      })
      Object.keys(splits).forEach(key => {
        let split = splits[key]
        if(split.length === 3){
          newResources.push(`${key}.*`)
        }else{
          split.forEach(el =>{
            newResources.push(`${key}.${el}`)
          })
        }
      })
      role.permissions.resources = newResources
      return role
    },

    async save() {
      this.loading = true
      const data = await this.createRole(this.form).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Role successfully added',
        })
        this.visible = false
      }

      this.loading = false
    },

    async update() {
      this.loading = true
      const params = this.formatOutgoingResources(this.form)
      const data = await this.updateRole(params).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Role successfully updated',
        })
        this.visible = false
      }

      this.loading = false
    },
  },
}
</script>
