<template>
  <BaseModal
    :name="name"
    title="Create Referral"
    @closed="close"
  >
    <template>
      <EncounterReferralForm />
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'EncounterReferralModal',

  components: {
    EncounterReferralForm: () => import('@/components/patients/encounters/forms/EncounterReferralForm'),
  },

  mixins: [modalMixin],

  data() {
    return {
      name: 'encounter-referral-modal',
    }
  },

  events: {
    'profile:referral:open': function(){
      this.open()
    },
    'profile:referral:close': function(){
      this.close()
    },
  },
}
</script>
