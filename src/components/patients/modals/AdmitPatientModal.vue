<template>
  <BaseModal
    :name="name"
    title="Admit patient"
    @closed="close"
  >
    <template>
      <div class="space-y-4">
        <p>Please choose which ward or service you would want to admit patient to.</p>
        
        <MultiSelect
          v-model="form.location"
          :options="[]"
          title="Ward or service location"
        />
        <SeButton full>Admit this patient</SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'AdmitPatientModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      name: 'admit-patient-modal',
    }
  },

  events: {
    'profile:admit:open': function(){
      this.open()
    },
    'profile:admit:close': function(){
      this.close()
    },
  },
}
</script>
