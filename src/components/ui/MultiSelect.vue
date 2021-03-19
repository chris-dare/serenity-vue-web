<template>
  <div>
    <p class="text-primary text-left text-xs mb-2">{{ description }}</p>
    <Multiselect
      v-model="selected"
      :options="options"
      :multiple="multiple"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Select one or more locations"
      label="location_name"
      track-by="id"
      :preselect-first="true"
    />
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'Multiselect',

  components: { Multiselect },

  props: {
    options: {
      type: Array,
      default: () => [],
    },

    value: {
      type: [Array, Object, String],
      default: () => [],
    },

    label: {
      type: String,
      default: '',
    },

    error: {
      type: Boolean,
      default: false,
    },

    errorMessage: {
      type: String,
      default: 'This field is required',
    },

    multiple: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>
