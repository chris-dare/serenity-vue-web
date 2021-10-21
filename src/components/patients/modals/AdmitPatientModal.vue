<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-4">
        <p class="text-lg font-semibold">Admit patient</p>
        <p>Please choose which ward or service you would want to admit patient to.</p>
        
        <MultiSelect
          v-model="form.location"
          :options="[]"
          title="Ward or service location"
        />
        <SeButton full>Admit this patient</SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AdmitPatientModal',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'profile:admit:open': function(){
      this.visible = true
    },
    'profile:admit:close': function(){
      this.visible = false
    },
  },
}
</script>
