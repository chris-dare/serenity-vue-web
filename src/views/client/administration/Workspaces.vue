<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Workspaces/Departments ({{ dataCount }})</p>
        <cv-button
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
          @click="$trigger('workspace:add:open')"
        >
          Add new workspace
          <Add class="ml-4 w-5 h-5" />
        </cv-button>
      </div>
      <Search
        v-model="search"
        placeholder="Search for workspace"
      />

      <cv-data-table
        ref="table"
        :data="filteredData"
        :columns="columns"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredData"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center space-x-2 py-2">
                <p>{{ row.workspace_name }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.workspace_type }}</p>
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
                  v-if="!row.is_core"
                  class="text-red-500 cursor-pointer"
                  @click="remove(row)"
                >
                  Delete
                </p>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
      <p
        v-if="!dataCount"
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
import DataMixin from '@/mixins/data'

export default {
  name: 'Workspaces',

  components: {AddEditWorkspace},

  mixins: [DataMixin],

  data() {
    return {
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
      data: (state) => state.workspaces.workspaces,
    }),
  },

  created() {
    this.refresh()
    this.searchTerms = ['workspace_name']
  },

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

    remove(data) {
      const id = data.id
      this.$trigger('confirm-action-modal:open', {
        label: data.workspace_name,
        type: 'delete',
        callback: async ()=>{
          this.loading = true
          try {
            const data = await this.deleteWorkspace(id)
            this.$toast.open({
              message: data.message,
            })
          } catch (error) {
            this.$toast.open({
              message: error.message || 'Something went wrong!',
              type: 'error',
            })
          }finally{
            this.loading = false
          }
        },
      })
    },
  },
}
</script>
