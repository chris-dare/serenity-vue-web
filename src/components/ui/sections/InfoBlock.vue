<template>
  <div>
    <div v-if="loading">
      <cv-skeleton-text
        heading
      />
      <cv-skeleton-text
        paragraph
        :line-count="1"
      />
    </div>

    <div
      v-else
      class="space-y-1"
    >
      <p class="text-secondary">{{ label }}</p>
      <div>
        <slot>
          <p
            :class="descriptionClass"
          >
            {{ description }}
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBlock',

  props: {
    label: {
      type: String,
      default: '',
    },

    description: {
      type: [String,Object],
      default: '',
    },

    descriptionClass: {
      type: String,
      default: 'text-primary capitalize',
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
