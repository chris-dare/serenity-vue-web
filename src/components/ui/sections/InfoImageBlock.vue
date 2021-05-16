<template>
  <div>
    <div v-if="loading">
      <cv-skeleton-text
        heading
        width="15vh"
      />
      <cv-skeleton-text
        paragraph
        :line-count="1"
        width="20vh"
      />
    </div>
    <div
      v-else
      class="flex items-center py-2"
      :class="customClass.space"
    >
      <img
        v-if="url"
        class="rounded-full"
        :class="customClass.img"
        :src="url"
        alt=""
      >
      <Avatar
        v-else
        :name="name || label"
        :class="customClass.img"
      />
      <div>
        <p :class="labelClass">{{ label }}</p>
        <p
          :class="[customClass.description, descriptionClass]"
          class="text-secondary capitalize"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoImageBlock',

  props: {
    label: {
      type: String,
      default: '',
    },

    labelClass: {
      type: String,
      default: '',
    },

    url: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    descriptionClass: {
      type: String,
      default: 'text-primary',
    },

    size: {
      type: String,
      default: 'base',
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    customClass() {
      if (this.size === 'large') {
        return {
          img: 'w-16 h-16',
          description: 'text-base',
          space: 'space-x-4',
        }
      }

      if (this.size === 'base') {
        return {
          img: 'w-12 h-12',
          description: 'text-xs',
          space: 'space-x-2',
        }
      }

      return {
        img: 'w-10 h-10',
        description: 'text-xs',
        space: 'space-x-2',
      }
    },
  },
}
</script>
