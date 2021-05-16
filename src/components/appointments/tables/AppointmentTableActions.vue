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
      <div
        v-for="(item, index) in data"
        :key="index"
        class="h-12 flex items-center px-6 hover:bg-gray-50 capitalize"
        @click="$emit(item)"
      >
        {{ item }}
      </div>
    </div>
  </Dropdown>
</template>

<script>
import Overflow from '@carbon/icons-vue/es/overflow-menu--vertical/32'
export default {
  name: 'AppointmentTableActions',

  components: {Overflow},

  data() {
    return {
      visible: false,
      data: ['view', 'edit', 'reschedule', 'delete'],
    }
  },
}
</script>
