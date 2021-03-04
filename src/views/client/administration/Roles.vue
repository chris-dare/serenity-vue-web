<template>
  <div class="mx-auto w-4/5 space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Roles ({{ roles.length }})</p>

      <cv-button
        class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
        kind="primary"
        @click="$trigger('role:add:open')"
      >
        Add new role 
        <Add class="ml-4 w-5 h-5 text-white" />
      </cv-button>
    </div>

    <cv-search
      v-model="search"
      placeholder="Search for role"
    />

    <cv-data-table
      ref="table"
      :data="filteredRoloes"
      :columns="columns"
    >
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in filteredRoloes"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 py-2">
              <p>{{ row.name }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.type }}</p>
          </cv-data-table-cell>
            
          <cv-data-table-cell>
            <div class="flex items-center space-x-6">
              <p
                class="cursor-pointer"
                @click="$trigger('location:edit:open', {...row})"
              >
                Duplicate
              </p>
              <!-- <p class="text-red-500">Delete</p> -->
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
    <SuccessModal />
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
        'Type',
        'Action',
      ],
      loading: false,
    }
  },

  computed: {
    ...mapState({
      roles: (state) => state.roles.roles,
    }),
    filteredRoloes() {
      return this.roles.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },

  // created() {
  //   this.refresh()
  // },

  methods: {
    ...mapActions({
      getRoles: 'roles/getRoles',
    }),

    async refresh() {
      this.loading = true
      await this.getRoles()
      this.loading = false
    },
  },
}
</script>
