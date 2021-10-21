<template>
  <div class="flex flex-wrap gap-2 items-center">
    <SeButton
      v-for="(filter, index) in filters"
      :key="index"
      :variant="localValue === filter.code ? 'default' : defaultColor"
      @click="localValue = filter.code"
    >
      {{ filter.display }}
      <component
        :is="filter.icon"
        v-if="filter.icon"
        class="ml-2"
      />
    </SeButton>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
export default {
  name: 'FilterGroup',

  mixins: [modelMixin],

  props: {
    filters: {
      type: Array,
      default: () => [],
    },

    defaultColor: {
      type: String,
      default: 'white',
    },
  },
}
</script>
