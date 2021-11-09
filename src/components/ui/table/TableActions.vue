<template>
  <Dropdown
    :visible.sync="visible"
    with-shadow
  >
    <Overflow
      slot="label"
      class="w-6 h-6"
      @click="visible = !visible"
    />
    <div class="w-52 bg-white mt-2">
      <cv-skeleton-text
        v-if="loading"
        class="m-0 p-0"
        width="100%"
        :line-count="1"
      />
      <div
        v-for="(action, index) in actions"
        :key="index"

        @click="$emit(action.event)"
      >
        <div
          v-if="action.show"
          class="h-12 flex items-center px-6 hover:bg-gray-50 capitalize"
        >
          {{ action.label }}
        </div>
      </div>
    </div>
  </Dropdown>
</template>

<script>
import Overflow from '@carbon/icons-vue/es/overflow-menu--vertical/32'
export default {
  name: 'TableActions',

  components: { Overflow },

  props: {
    actions: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      visible: false,
    }
  },
}
</script>
