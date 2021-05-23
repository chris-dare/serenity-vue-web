<template>
  <div>
    <div>
      <MultiSelect
        v-model="localValue"
        placeholder="Type to search"
        title="Drug"
        :options="medications"
        :multiple="multiple"
        :searchable="true"
        :internal-search="true"
        :clear-on-select="false"
        :close-on-select="false"
        :limit="3"
        :max-height="600"
        :hide-selected="true"
        :options-limit="4"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModelMixin from '@/mixins/model'

export default {
  name: 'AutoCompleteMedication',

  mixins: [ModelMixin],

  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      medications: 'resources/medications',
    }),
  },
}
</script>

