<template>
  <div class="bg-white py-3 px-5">
    <div class="flex items-center justify-between h-9">
      <p class="text-gray-500">{{ title }}</p>
      <div
        v-if="showEdit"
        class="bg-serenity-light-gray w-9 h-9 rounded-full ml-6 flex items-center justify-center"
      >
        <component
          :is="currentIconComponent"
          class="w-4 h-4 text-serenity-primary"
        />
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
// import Bee32 from '@carbon/icons-vue/es/bee/32'
import Edit32 from '@carbon/icons-vue/es/edit/32'
import AddComment32 from '@carbon/icons-vue/es/add-comment/32'
import PillsAdd32 from '@carbon/icons-vue/es/pills--add/32'
import DocumentAdd32 from '@carbon/icons-vue/es/document--add/32'

export default {
  name: 'EditableCard',

  components: { Edit32, AddComment32, PillsAdd32, DocumentAdd32 },

  props: {
    title: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'edit',
    },

    showEdit: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    currentIconComponent() {
      if (this.type === 'edit') {
        return 'Edit32'
      }

      if (this.type === 'comment') {
        return 'AddComment32'
      }

      if (this.type === 'pills') {
        return 'PillsAdd32'
      }
      if (this.type === 'add') {
        return 'DocumentAdd32'
      }

      return 'Edit'
    },
  },
}
</script>
