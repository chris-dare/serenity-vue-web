<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Add new' }} inventory</p>
        <cv-text-input
          v-model="form.name"
          type="text"
          label="Item name"
          placeholder="eg Plasters"
        />
        <div class="grid grid-cols-2 gap-8">
          <cv-text-input
            v-model="form.unit_price"
            type="number"
            label="Unit Price"
            placeholder="eg 50.00"
          />
          <cv-text-input
            v-model="form.selling_price"
            type="number"
            label="Selling Rate"
            placeholder="eg 50.00"
          />
        </div>
        <div class="grid grid-cols-2 gap-8">
          <cv-text-input
            v-model="form.initial_quantity"
            type="number"
            label="Item quantity"
            placeholder=""
          />
          <cv-text-input
            v-model="form.expiry_date"
            type="date"
            label="Item Expiry date"
            placeholder="eg 23/12/2040"
          />
        </div>
        <cv-text-input
          v-model="form.batch_number"
          type="text"
          label="Batch Nummber"
          placeholder="CV2399"
        />
        <div class="flex justify-between items-center">
          <p class="text-center">Cancel</p>
          <SeButton 
            :loading="loading"
            @click="submit"
          >
            {{ form.id ? 'Update inventory' : 'Add new inventory' }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddEditInventory',

  data() {
    return {
      form: {
        sub_group: 'Medication',
        category: 'medical-stock',
      },
      loading: false,
      visible: false,
      type: 'add',
    }
  },

  validations: {
    form: {
      category: { required },
    },
  },

  events: {
    'inventory:add:open': function(){
      this.visible = true
      this.type = 'add'
    },
    'inventory:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.type = 'update'
    },
  },

  methods: {
    ...mapActions({
      createInventory: 'inventory/createInventory',
      updateInventory: 'inventory/updateInventory',
    }),

    getValue(resource,permission){
      return `${resource}.${permission}`
    },

    submit(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Please these fields are required!',
          type: 'error',
        })
        return
      }

      if (this.type === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true

      try {
        await this.createInventory(this.form)
        this.$toast.open({
          message: 'Inventory successfully added',
        })
        this.visible = false

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      this.loading = true
      try {
        await this.updateInventory(this.form)
        this.$toast.open({
          message: 'Inventory successfully updated',
        })
        this.visible = false

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
