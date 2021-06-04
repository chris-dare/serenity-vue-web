<template>
  <div>
    <div>
      <MultiSelect
        v-model="localValue"
        placeholder="Type to search"
        :title="title"
        :options="medications"
        :multiple="multiple"
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
    title: {
      type: String,
      default: 'Drug',
    },
  },

  computed: {
    ...mapGetters({
      medications: 'resources/medications',
    }),
  },
}
</script>

