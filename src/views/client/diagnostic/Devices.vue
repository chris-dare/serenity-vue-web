<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Device Managment</p>
        <SeButton
          variant="primary"
          @click="$trigger('device:add:open')"
        >
          Add new device
          <Add class="ml-4 w-5 h-5 text-white" />
        </SeButton>
      </div>
      <DevicesTable />
      <AddNewDevice />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DevicesTable from '@/components/diagnostic/DevicesTable'
import AddNewDevice from '@/components/diagnostic/modals/AddNewDevice'

export default {
  name: 'DiagnosticDevices',

  components: { DevicesTable , AddNewDevice},

  data() {
    return {
      selected: 'active',
    }
  },

  mounted(){
    this.getDeviceTypes()
  },

  methods: {
    ...mapActions({
      getDeviceTypes: 'resources/getDeviceTypes',
    }),
  },
}
</script>]
