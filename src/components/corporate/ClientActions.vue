<template>
  <div>
    <Dropdown
      :visible.sync="visible"
      with-shadow
    >
      <SeButton
        slot="label"
        @click="handleDrop()"
      >
        <span>Actions</span>
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
  </div>
</template>

<script>
export default {

  name: 'ClientActions',

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    options() {
      return [
        {
          label: 'Verify',
          event: 'verify',
        },
        {
          label: 'Suspend',
          event: 'suspend',
        },
      ]
    },
  },

  methods: {

    handleDrop(){
      this.visible = !this.visible
    },

    onSelect() {
      this.visible = false
    },
  },


}
</script>
