<template>
  <div class="flex items-center space-x-2">
    <SeButton
      v-for="(filter, index) in filters"
      :key="index"
      :variant="localValue === filter.code ? 'default' : 'white'"
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
  },
}
</script>
