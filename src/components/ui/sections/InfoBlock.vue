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
            :class="descriptionColor"
            class="capitalize"
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

    descriptionColor: {
      type: String,
      default: 'text-primary',
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
