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
        @remove="$emit('remove', $event)"
        @tag="addTag"
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

  data() {
    return {
      options: [],
    }
  },

  computed: {
    ...mapGetters({
      medications: 'resources/medications',
    }),
  },

  watch: {
    medications: {
      immediate: true,
      handler(val) {
        this.options = val
      },
    },
  },

  methods: {
    addTag(tag) {
      this.options.push(tag)
      if (this.multiple) {
        this.localValue.push(tag)
      } else {
        this.localValue = tag
      }
      
    },
  },
}
</script>

