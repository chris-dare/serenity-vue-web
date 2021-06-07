<template>
  <cv-modal
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="title">
      <p class="text-lg font-semibold">Create Referral</p>
    </template>
    <template slot="content">
      <EncounterReferralForm />
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'EncounterReferralModal',

  components: {
    EncounterReferralForm: () => import('@/components/patients/encounters/forms/EncounterReferralForm'),
  },

  data() {
    return {
      visible: false,
    }
  },

  events: {
    'profile:referral:open': function(){
      this.visible = true
    },
    'profile:referral:close': function(){
      this.visible = false
    },
  },
}
</script>
