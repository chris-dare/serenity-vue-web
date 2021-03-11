<template>
  <div
    class="w-full bg-white p-4 flex flex-col items-center justify-center space-y-4"
    :class="{'opacity-60': inProgress}"
  >
    <Checkmark :class="[isCompleted ? 'text-serenity-primary' : 'text-gray-300']" />
    <div>
      <p class="text-serenity-primary font-semibold text-lg text-center">{{ details.label }}</p>
      <p class="text-center w-4/5 mx-auto text-sm">{{ details.description }}</p>
    </div>
    <router-link
      tag="p"
      :to="{name: details.link}"
      class="text-serenity-primary underline cursor-pointer"
    >
      {{ isCompleted ? 'Completed': 'Update' }}
    </router-link>
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--filled/32'
export default {
  name: 'WorkspaceCard',

  components: { Checkmark },

  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    inProgress() {
      return this.details.status === 'incomplete'
    },

    isCompleted() {
      return this.details.status === 'completed'
    },
  },
}
</script>
