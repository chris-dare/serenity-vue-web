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
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} location</p>
        <cv-text-input
          v-model="form.name"
          label="Location name"
          placeholder="eg Valley Heights"
        />
        <SeButton full>{{ form.id ? 'Save changes' : 'Create new location' }}</SeButton>
        <p class="text-center">Cancel</p>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AddEditLocation',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'location:add:open': function(){
      this.visible = true
    },
    'location:edit:open': function(data){
      this.visible = true
      console.log('data', data)
      this.form = {name: data.params[0].name, id: 1}
    },
  },
}
</script>
