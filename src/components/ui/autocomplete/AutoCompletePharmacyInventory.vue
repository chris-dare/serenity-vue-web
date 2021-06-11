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
import { mapState, mapActions } from 'vuex'
import ModelMixin from '@/mixins/model'

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
  },

  data() {
    return {
      options: [],
    }
  },

  mounted() {
    this.getPharmacyInventoryOptions()
  },

  computed: {
    ...mapState({
      inventory: state => state.resources.pharmacyInventory,
    }),
  },

  watch: {
    inventory: {
      immediate: true,
      handler(val) {
        this.options = val
      },
    },
  },

  methods: {
    ...mapActions({
      getPharmacyInventoryOptions: 'resources/getPharmacyInventoryOptions',
    }),
  },
}
</script>

