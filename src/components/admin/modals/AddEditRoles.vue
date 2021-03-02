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
          <SeButton variant="secondary">Cancel</SeButton>
          <SeButton @click="submit">{{ form.id ? 'Save changes' : 'Create new role' }}</SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
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
    }
  },

  events: {
    'role:add:open': function(){
      this.visible = true
    },
    'role:edit:open': function(data){
      this.visible = true
      this.form = {name: data.params[0].name, id: 1}
    },
  },

  methods: {
    submit() {
      this.visible = false
      this.$trigger('success:open', 'Role added successfully!!')
    },
  },
}
</script>
