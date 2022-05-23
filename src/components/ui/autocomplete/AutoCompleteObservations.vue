<template>
  <div>
    <div>
      <MultiSelect
        v-model="localValue"
        placeholder="Type to search"
        :title="title"
        :options="options"
        :multiple="multiple"
        :searchable="true"
        :internal-search="true"
        :clear-on-select="false"
        :close-on-select="false"
        :limit="3"
        :max-height="600"
        :hide-selected="true"
        v-bind="$attrs"
        taggable
        custom-field="code"
        label="display"
        @remove="$emit('remove', $event)"
        @tag="addTag"
      />
    </div>
  </div>
</template>

<script>
import ModelMixin from '@/mixins/model'

export default {
  name: 'AutoCompleteObservations',

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
    options: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    addTag(tag) {
      let newTag = {
        code: tag,
        display: tag,
      }
      this.options.push(newTag)
      if (this.multiple) {
        this.localValue.push(newTag)
      } else {
        this.localValue = tag
      }
      
    },
  },
}
</script>

