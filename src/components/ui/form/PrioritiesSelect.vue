<template>
  <MultiSelect
    v-model="localValue"
    title="Priority"
    :multiple="false"
    :options="options"
    :track-by="null"
    placeholder="Routine, ASAP, Urgent"
    custom-field="code"
    v-bind="$attrs"
  >
    <template
      slot="singleLabel"
      slot-scope="props"
    >
      <span :class="{ 'text-red-500': props.option.code.toLowerCase() === 'urgent' }">
        {{ props.option.display }}
      </span>
    </template>
    <template
      slot="option"
      slot-scope="props"
    >
      <span :class="{ 'text-red-500': props.option.code.toLowerCase() === 'urgent' }">
        {{ props.option.display }}
      </span>
    </template>
  </MultiSelect>
</template>

<script>
import modelMixin from '@/mixins/model'

export default {
  name: 'PrioritiesSelect',

  mixins: [modelMixin],

  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },

}
</script>
