<template>
  <cv-modal
    :visible="visible"
    size="large"
    @modal-hidden="close"
  >
    <template slot="title">Find Patient</template>
    <template slot="content">
      <PatientsTable modal />
    </template>
  </cv-modal>
</template>

<script>
import PatientsTable from '@/components/patients/PatientsTable'
export default {
  name: 'SearchPatientsModal',

  components: { PatientsTable },

  data() {
    return {
      visible: false,
    }
  },

  events: {
    'search:patients:open': function() {
      this.visible = true
    },
    'search:patients:close': function() {
      this.close()
    },
  },

  methods: {
    close() {
      this.visible = false
    },
  },
}
</script>
