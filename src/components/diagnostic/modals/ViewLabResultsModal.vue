<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">Lab results</template>
    <template slot="content">
      <LabsTable />
    </template>
  </cv-modal>
</template>

<script>
import LabsTable from '@/components/diagnostic/LabsTable'
export default {
  name: 'ViewLabResultsModal',

  components: { LabsTable },

  data() {
    return {
      visible: false,
    }
  },

  events: {
    'lab:view:open': function() {
      this.visible = true
    },
  },

  methods: {
    close() {
      this.visible = false
    },
  },
}
</script>
