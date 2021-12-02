<template>
  <BaseModal
    :name="name"
    width="60%"
    title="Find Patient"
    @closed="close"
  >
    <template>
      <PatientsTable modal />
    </template>
  </BaseModal>
</template>

<script>
import PatientsTable from '@/components/patients/PatientsTable'
import modalMixin from '@/mixins/modal'

export default {
  name: 'SearchPatientsModal',

  components: { PatientsTable },

  mixins: [modalMixin],

  data() {
    return {
      visible: false,
      name: 'search-patients-modal',
    }
  },

  events: {
    'search:patients:open': function() {
      this.open()
    },
    'search:patients:close': function() {
      this.close()
    },
  },
}
</script>
