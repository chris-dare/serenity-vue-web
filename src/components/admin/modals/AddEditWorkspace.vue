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
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} workspace</p>
        <cv-text-input
          v-model="form.name"
          label="Name"
          placeholder="eg Out patient"
        />
        <p>Workspace features access</p>
        <cv-checkbox
          v-model="checks"
          value="check-1"
          label="Patients"
        />
        <cv-checkbox
          v-model="checks"
          value="check-2"
          label="Billing"
        />
        <cv-checkbox
          v-model="checks"
          value="check-3"
          label="Appointments"
        />
        <cv-checkbox
          v-model="checks"
          value="check-4"
          label="Visits"
        />
        <cv-checkbox
          v-model="checks"
          value="check-5"
          label="Schedules"
        />
        <SeButton full>{{ form.id ? 'Save changes' : 'Create new workspace' }}</SeButton>
        <p class="text-center">Cancel</p>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AddEditWorkspace',

  data() {
    return {
      form: {},
      visible: false,
      checks: [],
    }
  },

  events: {
    'workspace:add:open': function(){
      this.visible = true
    },
    'workspace:edit:open': function(data){
      this.visible = true
      this.form = { name: data.params[0].name, id: 1}
    },
  },
}
</script>
