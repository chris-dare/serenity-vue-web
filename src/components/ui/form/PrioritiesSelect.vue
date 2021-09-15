<template>
  <MultiSelect
    v-model="localValue"
    title="Priority"
    :multiple="false"
    :options="internalOptions"
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
import { mapState } from 'vuex'

export default {
  name: 'PrioritiesSelect',

  mixins: [modelMixin],

  props: {
    options: {
      type: Array,
      default: null,
    },
  },

  computed: {
    ...mapState({
      priorities: (state) => state.global.priorities,
    }),

    internalOptions() {
      return this.options || this.priorities
    },
  },

}
</script>
