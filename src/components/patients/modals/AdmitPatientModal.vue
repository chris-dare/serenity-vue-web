<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    title="Admit patient"
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
export default {
  name: 'AdmitPatientModal',

  data() {
    return {
      form: {},
      name: 'admit-patient-modal',
    }
  },

  events: {
    'profile:admit:open': function(){
      this.$modal.show(this.name)
    },
    'profile:admit:close': function(){
      this.$modal.hide(this.name)
    },
  },
}
</script>
