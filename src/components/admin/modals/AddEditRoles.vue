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
        <cv-data-table
          ref="table"
          :data="[]"
          :columns="columns"
        >
          <template slot="data">
            <cv-data-table-row
              v-for="(row, rowIndex) in 0"
              :key="`${rowIndex}`"
              :value="`${rowIndex}`"
            >
              <cv-data-table-cell>
                <div class="flex items-center space-x-2 py-2">
                  <p>{{ $faker().name.findName() }}</p>
                </div>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <p>Default</p>
              </cv-data-table-cell>
            
              <cv-data-table-cell>
                <div class="flex items-center space-x-6">
                  <p
                    class="cursor-pointer"
                    @click="$trigger('location:edit:open', {name:$faker().name.findName()})"
                  >
                    Duplicate
                  </p>
                  <!-- <p class="text-red-500">Delete</p> -->
                </div>
              </cv-data-table-cell>
            </cv-data-table-row>
          </template>
        </cv-data-table>
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
import { mapActions } from 'vuex'
export default {
  name: 'AddEditRole',

  data() {
    return {
      form: {},
      visible: false,
      search: '',
      columns: [
        'Resources',
        'Read',
        'Write',
      ],
      loading: false,
    }
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
