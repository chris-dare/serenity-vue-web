<template>
  <BaseModal
    :name="name"
    title="Lab results"
  >
    <template>
      <LabsTable />
    </template>
  </BaseModal>
</template>

<script>
import LabsTable from '@/components/diagnostic/LabsTable'
import modalMixin from '@/mixins/modal'

export default {
  name: 'ViewLabResultsModal',

  components: { LabsTable },

  mixins: [modalMixin],

  data() {
    return {
      visible: false,
      name: 'view-lab-results-modal',
    }
  },

  events: {
    'lab:view:open': function() {
      this.open()
    },
  },
}
</script>
