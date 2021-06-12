<template>
  <div>
    <div>
      <MultiSelect
        v-model="localValue"
        placeholder="Type to search"
        title="Inventory"
        label="name"
        :options="options"
        :multiple="false"
        :searchable="true"
        :internal-search="true"
        :clear-on-select="false"
        :close-on-select="false"
        :limit="3"
        :max-height="600"
        :hide-selected="true"
        v-bind="$attrs"
        @remove="$emit('remove', $event)"
      />
    </div>
  </div>
</template>

<script>
import ModelMixin from '@/mixins/model'
import PharmacyInventoryApi from '@/api/pharmacy_inventory'

export default {
  name: 'AutoCompletePharmacyInventory',

  mixins: [ModelMixin],

  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Drug',
    },
    medicationRequest: {
      type: Object,
      default: () => null,
    },
  },

  data() {
    return {
      options: [],
    }
  },

  watch: {
    medicationRequest: {
      immediate: true,
      handler(val) {
        console.info(val)
        this.fetchInventory(val)
      },
    },
  },

  mounted() {
    this.getPharmacyInventoryOptions()
  },

  methods: {
    async fetchInventory(medicationRequest) {
      if(medicationRequest == null){
        this.options = []
        return
      }
      //eslint-disable-next-line
      const drugName = medicationRequest.medication_detail[0].display
      const { data } = await PharmacyInventoryApi.list()
      // const { data } = await PharmacyInventoryApi.list({search: drugName})
      this.options = data
    },
  },
}
</script>

