<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <SeForm class="space-y-8">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Add new' }} inventory</p>
        <div class="grid grid-cols-2 gap-8 items-end">
          <cv-text-input
            v-model="form.name"
            type="text"
            label="Item name"
            placeholder="eg Plasters"
          />
          <cv-checkbox
            v-model="medication"
            :value="!medication"
            label="This is a prescription item"
          />
        </div>
        <AutoCompleteMedication
          v-model="form.medication"
          :disabled="!medication"
          class="col-span-3"
        />
        <div
          v-if="medication"
          class="grid grid-cols-2 gap-8"
        >
          <cv-text-input
            v-model="form.dosage_amount"
            type="number"
            label="Dosage Amount"
            placeholder="eg 500"
            :invalid-message="$utils.validateRequiredField($v, 'dosage_amount')"
          />
          <MultiSelect
            v-model="form.dosage_unit"
            title="Dosage Unit"
            :multiple="false"
            :options="['g', 'mg']"
            class="multiselect-white flex-1"
            @input="$emit('change', localValue)"
          />
        </div>
        <div class="grid grid-cols-2 gap-8">
          <cv-text-input
            v-model="form.unit_price"
            type="number"
            label="Unit Price"
            placeholder="eg 50.00"
            :invalid-message="$utils.validateRequiredField($v, 'unit_price')"
          />
          <cv-text-input
            v-model="form.selling_price"
            type="number"
            label="Selling Rate"
            placeholder="eg 50.00"
            :invalid-message="$utils.validateRequiredField($v, 'selling_price')"
          />
        </div>
        <div class="grid grid-cols-2 gap-8">
          <cv-text-input
            v-model="form.initial_quantity"
            type="number"
            label="Initial item quantity"
            placeholder=""
            :invalid-message="$utils.validateRequiredField($v, 'initial_quantity')"
          />
          <cv-text-input
            v-model="form.in_hand_quantity"
            type="number"
            label="In-hand quantity"
            placeholder=""
            :invalid-message="$utils.validateRequiredField($v, 'in_hand_quantity')"
          />
        </div>
        <div class="grid grid-cols-2 gap-8">
          <cv-text-input
            v-model="form.net_release_quantity"
            type="number"
            label="Net release quantity"
            placeholder=""
            :invalid-message="$utils.validateRequiredField($v, 'net_release_quantity')"
          />
          <DatePicker
            v-model="form.expiry_date"
            kind="single"
            class="se-input-gray"
            placeholder="dd/mm/yyyy"
            label="Item Expiry date"
          />
        </div>
        <cv-text-input
          v-model="form.batch_number"
          type="text"
          label="Batch Number"
          placeholder="CV2399"
        />
        <div class="flex justify-between items-center">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Cancel
          </SeButton>
          <SeButton
            :loading="loading"
            @click="submit"
          >
            {{ form.id ? 'Update inventory' : 'Add new inventory' }}
          </SeButton>
        </div>
      </SeForm>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'AddEditInventory',

  data() {
    return {
      form: {
        sub_group: 'Medication',
        category: 'medical-stock',
      },
      medication: false,
      loading: false,
      visible: false,
      type: 'add',
    }
  },

  validations: {
    form: {
      selling_price: { required },
      unit_price: { required },
      dosage_amount: {
        minValue: minValue(1),
      },
      initial_quantity: {
        minValue: minValue(0),
      },
      in_hand_quantity: {
        minValue: minValue(0),
      },
      net_release_quantity: {
        minValue: minValue(0),
      },
    },
  },

  events: {
    'inventory:add:open': function(){
      this.visible = true
      this.medication = false
      this.form.category = 'medical-stock'
      this.type = 'add'
    },
    'inventory:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
      this.form.category = 'medical-stock'
      this.medication = this.form.category == 'medical-stock'
      this.type = 'update'
    },
  },

  watch: {
    medication: function (val) {
      if(val !== true){
        this.form.medication = null
      }
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
        this.close()

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
        this.close()

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    close() {
      this.form = {
        sub_group: 'Medication',
        category: 'medical-stock',
      }
      this.$v.$reset()
      this.visible = false
    },
  },
}
</script>
