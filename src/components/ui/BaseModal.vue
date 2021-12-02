<template>
  <modal
    v-bind="$attrs"
    :name="name"
    height="auto"
    scrollable
    class="top-8 h-main min-h-main"
    v-on="$listeners"
  >
    <div>
      <Close
        class="absolute right-6 top-6 w-6 h-6"
        @click="$modal.hide(name)"
      />
      <div
        v-if="hasTitle"
        class="pl-6 pt-6 pr-20"
      >
        <slot name="title">
          <p class="text-primary text-xl font-semibold">{{ title }}</p>
        </slot>
      </div>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    title: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    hasTitle() {
      return this.$scopedSlots.title || this.title
    },
  },

  watch: {
    $route: {
      handler() {
        this.$modal.hide(this.name)
      },
    },
  },
}
</script>

<style>
.vm--overlay{
  @apply top-12 h-main;
}

.vm--container.scrollable{
  @apply h-main;
}
</style>


