<template>
  <BaseModal
    class="se-no-title-modal se-modal-no-padding"
    :name="name"
    width="450px"
    @closed="close"
  >
    <template>
      <div
        :style="`background:${form.color}`"
        class="h-20 py-4 px-8"
      >
        <p class="text-white font-bold">{{ form.label }}</p>
        <p class="text-white text-sm">{{ $date.formatDate(Date.now(), 'MMM dd, yyyy   HH:mma') }}</p>
      </div>

      <div class="py-4 px-8 space-y-8">
        <InfoBlock
          label="Complaint"
          description="Patient complained of profused sweating, Deep breathing and respiratory distress, jaundice, shaking chills."
          description-color="text-secondary"
        />
        <InfoBlock label="Assessment">
          <div>
            <p class="text-secondary">Malaria</p>
            <p class="text-secondary">HIV / AIDS</p>
          </div>
        </InfoBlock>
        <InfoBlock label="Treatments">
          <div>
            <p class="text-secondary">Plasma exchange (plasmapheresis)</p>
            <p class="text-secondary">Interferon beta medications.</p>
          </div>
        </InfoBlock>
        <InfoBlock
          label="Doctor"
        >
          <div class="flex items-center py-2">
            <img
              class="w-10 h-10 rounded-full mr-3"
              src="@/assets/img/user 1.svg"
              alt=""
            >
            <div>
              <p class="text-secondary">Dr. {{ 'Chris Dare' }}</p>
              <p class="text-secondary text-xs">
                Practitioner
              </p>
            </div>
          </div>
        </InfoBlock>
        <div class="flex items-center justify-between">
          <p class="text-black">Close</p>
          <SeButton
            variant="secondary"
          >
            View encounter
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'

export default {
  name: 'DiagnosisDetailModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      visible: false,
      name: 'diagnosis-detail-modal',
    }
  },

  events: {
    'patient:medication:open': function(event, param){
      this.form = param
      this.open()
    },
    'patient:medication:close': function(event, param){
      this.form = param
      this.close()
    },
  },
}
</script>
