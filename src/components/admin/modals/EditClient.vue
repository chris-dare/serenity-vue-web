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
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Update' }} client account</p>
        <div class="grid grid-cols-2 gap-8">
          <cv-text-input
            v-model="form.maximum_employees_allowed"
            type="number"
            label="Maximum employees allowed"
            placeholder=""
          />
          <cv-text-input
            v-model="form.credit_duration"
            type="number"
            label="Credit duration in days"
            placeholder=""
          />
        </div>
        <div class="grid justify-center">
          <cv-radio-group 
            :vertical="vertical"
          >
            <cv-radio-button
              name="Verified"
              label="Verified"
              value="verified"
            />
            <cv-radio-button
              name="Unverified"
              label="Unverfied"
              value="unverified"
            />
            <cv-radio-button
              name="Suspended"
              label="Suspended"
              value="suspended"
            />
          </cv-radio-group>
        </div>
        <cv-text-input
          v-model="form.amount"
          type="number"
          label="Amount"
          placeholder=""
        />
        <div class="flex justify-between items-center">
          <p class="text-center">Cancel</p>
          <SeButton 
            :loading="loading"
            @click="submit"
          >
            {{ form.id ? 'Update client account' : 'Update client account' }}
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
  name: 'AddEditClient',

  data() {
    return {
      form: {
        sub_group: 'Medication',
        category: 'medical-stock',
      },
      loading: false,
      visible: false,
      type: 'add',
      vertical: true,
    }
  },

  validations: {
    form: {
      category: { required },
    },
  },

  events: {
    'client:add:open': function(){
      this.visible = true
      this.type = 'add'
    },
    'client:edit:open': function(data){
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
