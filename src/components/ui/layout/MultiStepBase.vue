<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <slot />
    <slot name="actions">
      <div class="flex items-center justify-between mt-12 mb-6">
        <div class="flex items-center space-x-2">
          <SeButton
            v-if="!modal"
            variant="outline"
            data-cy="multistep-cancel"
            @click="$emit('cancel')"
          >
            Cancel
          </SeButton>
          <SeButton
            v-if="previous && !modal"
            :to="{ name: previous, query: { ...query } }"
            variant="secondary"
            data-cy="multistep-back"
          >
            Go back
          </SeButton>
          <SeButton
            v-else
            variant="secondary"
            data-cy="multistep-back"
            @click="$emit('back')"
          >
            Go back
          </SeButton>
        </div>
        <div class="flex items-center">
          <SeButton
            v-if="skip && !modal"
            class="mr-2"
            variant="secondary"
            data-cy="multistep-skip"
            @click="$emit('skip')"
          >
            Skip
          </SeButton>
          <SeButton
            :icon="icon"
            :loading="loading"
            :disabled="disabled"
            data-cy="multistep-save"
            @click="$emit('save')"
          >
            {{ nextLabel }}
          </SeButton>
        </div>
      </div>
    </slot>
  </cv-form>
</template>

<script>
export default {
  name: 'MultiStepBase',

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    previous: {
      type: String,
      default: null,
    },
    skip: {
      type: Boolean,
      default: false,
    },
    query: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    nextLabel: {
      type: String,
      default: null,
    },
    icon: {
      type: [Object, String],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
