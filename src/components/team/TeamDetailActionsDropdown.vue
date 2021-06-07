<template>
  <Dropdown
    :visible.sync="visible"
    with-shadow
  >
    <SeButton
      slot="label"
      @click="visible = !visible"
    >
      <span>Actions</span>
      <CaretDown class="w-4 h-4 ml-2" />
    </SeButton>
    <div class="w-40 bg-white">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="flex p-4 hover:bg-gray-100"
        @click="onSelect(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </Dropdown>
</template>

<script>
import CaretDown from '@carbon/icons-vue/es/caret--down/32'
export default {
  name: 'TeamDetailActionsDropdown',

  components: { CaretDown },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    options() {
      let options = []

      if (this.$userCan('practioners.write')) {
        options.push({ label: 'Edit', event: 'edit'})
      }
      options.push({ label: 'Suspend account', event: 'suspend'})

      if (this.$userCan('practioners.delete')) {
        options.push({ label: 'Delete account', event: 'delete'})
      }
      return options
    },
  },

  methods: {
    onSelect(val) {
      this.$emit(val.event)
      this.visible = false
    },
  },
}
</script>
