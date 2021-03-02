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
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} service</p>
        <cv-text-input
          v-model="form.name"
          label="Name of service"
          placeholder="eg Valley Heights"
        />
        <cv-text-input
          v-model="form.price"
          label="Price of service (GHC)"
          placeholder="eg 50.00"
        />
        <cv-text-input
          v-model="form.service_id"
          label="Service ID"
          placeholder="CV2399"
        />
        <SeButton full>{{ form.id ? 'Update service' : 'Create new service' }}</SeButton>
        <p class="text-center">Cancel</p>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AddEditService',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'service:add:open': function(){
      this.visible = true
    },
    'service:edit:open': function(data){
      this.visible = true
      console.log('data', data)
      this.form = {name: data.params[0].name, id: 1}
    },
  },
}
</script>
