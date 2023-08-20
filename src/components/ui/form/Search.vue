<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <cv-search
      :value="value"
      :placeholder="placeholder"
      :data-cy="cyName"
      :class="{'small-input': small}"
      @input="$emit('input', $event)"
    />
  </cv-form>
</template>

<script>
import { CvSearch } from '@carbon/vue/src/index'
export default {
  name: 'Search',

  components: {CvSearch},

  props: {
    value: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: 'Search',
    },

    cyName: {
      type: String,
      default: 'search',
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
}
</script>