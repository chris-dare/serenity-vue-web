<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Workspaces/Departments ({{ workspaces.length }})</p>
        <cv-button
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
          @click="$trigger('workspace:add:open')"
        >
          Add new workspace
          <Add class="ml-4 w-5 h-5" />
        </cv-button>
      </div>

      <cv-search
        v-model="search"
        placeholder="Search for workspace"
      />

      <cv-data-table
        ref="table"
        :data="filteredWorkspaces"
        :columns="columns"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredWorkspaces"
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
                  @click="$trigger('workspace:edit:open', { ...row })"
                >
                  Edit
                </p>
                <p
                  class="text-red-500"
                  @click="remove"
                >
                  Delete
                </p>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
      <p
        v-if="!workspaces.length"
        class="text-center w-full py-6"
      >
        No workspaces to show
      </p>
    </div>
    <AddEditWorkspace />
  </div>
</template>

<script>
import AddEditWorkspace from '@/components/admin/modals/AddEditWorkspace'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Workspaces',

  components: {AddEditWorkspace},

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
      workspaces: (state) => state.workspaces.workspaces,
    }),
    filteredWorkspaces() {
      return this.workspaces.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },

  // created() {
  //   this.refresh()
  // },

  methods: {
    ...mapActions({
      getWorkspaces: 'workspaces/getWorkspaces',
      deleteWorkspace: 'workspaces/deleteWorkspace',
    }),

    async refresh() {
      this.loading = true
      await this.getWorkspaces()
      this.loading = false
    },

    async remove() {
      this.loading = true
      await this.deleteWorkspace()
      this.loading = false
    },
  },
}
</script>
