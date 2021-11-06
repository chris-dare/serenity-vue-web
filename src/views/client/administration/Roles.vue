<template>
  <div class="mx-auto max-w-7xl space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Roles ({{ roles.length }})</p>
    </div>

    <Search
      v-model="search"
      placeholder="Search for role"
    />

    <cv-data-table
      ref="table"
      :data="filteredRoles"
      :columns="columns"
    >
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in filteredRoles"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.name }}</p>
            </div>
          </cv-data-table-cell>

          <cv-data-table-cell>
            <div class="flex items-center space-x-6">
              <p
                class="cursor-pointer"
                @click="$trigger('role:duplicate:open', { ...row })"
              >
                Duplicate
              </p>
              <p
                class="cursor-pointer"
                @click="$trigger('role:edit:open', {...row})"
              >
                Edit
              </p>
              <p
                class="text-red-500 cursor-pointer"
                @click="$trigger('confirm:delete:open', { data:row.id, label: 'Are you sure you want to delete this role?' })"
              >
                Delete
              </p>
            </div>
          </cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <p
      v-if="!roles.length"
      class="text-center w-full py-6"
    >
      No roles to show
    </p>
    <AddEditRole />
    <ConfirmDeleteModal @delete="remove" />
  </div>
</template>

<script>
import AddEditRole from '@/components/admin/modals/AddEditRoles'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Roles',

  components: { AddEditRole },

  data() {
    return {
      search: '',
      columns: [
        'Name',
        'Action',
      ],
      loading: false,
    }
  },

  computed: {
    ...mapState({
      roles: (state) => state.roles.roles,
    }),
    filteredRoles() {
      return this.roles.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },

  created() {
    this.refresh()
  },

  methods: {
    ...mapActions({
      getRoles: 'roles/getRoles',
      deleteRole: 'roles/deleteRole',
    }),

    async refresh() {
      this.loading = true
      await this.getRoles()
      this.loading = false
    },

    async remove(rowId) {
      this.loading = true
      await this.deleteRole(rowId).then(()=>{
        this.$toast.open({
          message: 'Role successfully deleted',
        })
      })
        .catch((error) => {
          this.$toast.open({
            message: error.message || 'Something went wrong!',
            type: 'error',
          })
          this.loading = false
          throw error
        })

      this.loading = false
      this.$trigger('confirm:delete:close')
    },
  },
}
</script>
