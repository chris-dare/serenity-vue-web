<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <cv-search
      :value="value"
      :placeholder="placeholder"
      :data-qa="qaName"
      @input="$emit('input', $event)"
    />
  </cv-form>
</template>

<script>
export default {
  name: 'Search',

  props: {
    value: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: 'Search',
    },
  },

  computed: {
    qaName() {
      return this.label?.split(' ').join('_').toLowerCase()
    },
  },
}
</script>