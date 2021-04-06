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
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Add new' }} item</p>
        <cv-text-input
          v-model="form.name"
          type="text"
          label="Item name"
          placeholder="eg Plasters"
        />
        <cv-text-input
          v-model="form.price"
          type="text"
          label="Quantity"
          placeholder="eg 50.00"
        />
        <cv-text-input
          v-model="form.inventory_id"
          type="text"
          label="Item ID"
          placeholder="CV2399"
        />
        <SeButton full>{{ form.id ? 'Update inventory' : 'Add new item' }}</SeButton>
        <p class="text-center">Cancel</p>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AddEditInventory',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'inventory:add:open': function(){
      this.visible = true
    },
    'inventory:edit:open': function(data){
      this.visible = true
      this.form = {name: data.params[0].name, id: 1}
    },
  },
}
</script>
