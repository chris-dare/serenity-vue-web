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
        <p class="text-primary mb-4 text-left">Set permissions</p>
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
              v-for="(resource, index) in resourceInd"
              :key="index"
              class="grid grid-cols-4 items-center h-12"
            >
              <div class="flex items-center pl-6 capitalize">
                {{ resource }}
              </div>
              <div class="flex items-center justify-center">
                <cv-checkbox
                  v-model="form.permissions"
                  :value="getValue(resource, 'read')"
                  class="flex-none"
                />
              </div>
              <div class="flex items-center justify-center">
                <cv-checkbox
                  v-model="form.permissions"
                  :value="getValue(resource, 'write')"
                  class="flex-none"
                />
              </div>
              <div class="flex items-center justify-center">
                <cv-checkbox
                  v-model="form.permissions"
                  :value="getValue(resource, 'delete')"
                  class="flex-none"
                />
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
        permissions: []
      },
      visible: false,
      search: '',
      columns: [
        'Resources',
        'Read',
        'Write',
        'Delete'
      ],
      loading: false,
    }
  },

  computed: {
    ...mapState({
      resources: (state) => state.resources.resources,
    }),
    ...mapGetters({
      resourceInd: 'resources/resources'
    })
  },

  events: {
    'role:add:open': function(){
      this.visible = true
    },
    'role:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
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
      const data = await this.updateRole(this.form).catch(() => {
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
