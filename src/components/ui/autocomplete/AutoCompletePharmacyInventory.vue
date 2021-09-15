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
        @search-change="(val) => fetchInventory(val, true)"
        @remove="$emit('remove', $event)"
      />
    </div>
  </div>
</template>

<script>
import ModelMixin from '@/mixins/model'
import PharmacyInventoryApi from '@/api/pharmacy-inventory'

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
      defaultOptionsFound: false,
    }
  },

  watch: {
    medicationRequest: {
      immediate: true,
      handler(val) {
        this.fetchInventory(val, false)
      },
    },
    localValue(val) {
      if(!this.defaultOptionsFound){
        this.fetchInventory(val, true)
      }
    },
  },
  
  methods: {
    async fetchInventory(drugName, userInitiated) {
      if(!drugName || drugName == ''){
        this.options = []
        return
      }
      const { data } = await PharmacyInventoryApi.list({search: drugName})
      this.options = data
      if(userInitiated == false){
        this.defaultOptionsFound = false
      }
    },
  },
}
</script>

