<template>
  <BaseModal
    :name="name"
    width="450px"
    title="Medication details"
    @closed="close"
  >
    <template
      class="p-0 mb-4"
    >
      <div class="text-xs">
        <div class="my-4">
          <p class="text-gray-500 ">Drug</p>
          <p class="text-serenity-primary mt-1 ">
            {{ $utils.getFirstData(form.medication_detail) }}
          </p>
        </div>
        <div class="my-4">
          <p class="text-gray-500 ">Dosage</p>
          <p class=" mt-1 text-primary">{{ $utils.getFirstData(form.medication_request_dosage_instruction, 'period') }} {{ $utils.getFirstData(form.medication_request_dosage_instruction, 'period_unit') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-6 my-4">
          <div>
            <p class="text-gray-500 ">Duration</p>
            <p class=" mt-1 text-primary">{{ $utils.getFirstData(form.medication_request_dosage_instruction, 'frequency') }} {{ $utils.getFirstData(form.medication_request_dosage_instruction, 'frequency_unit') }}</p>
          </div>
          <div>
            <p class="text-gray-500 ">Start Date</p>
            <p class=" mt-1 text-primary">{{ $date.formatDate(form.created_at) }}</p>
          </div>
          <div>
            <p class="text-gray-500 ">Course of therapy time</p>
            <p class="mt-1  text-primary">
              {{ form.course_of_therapy_type }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 ">Instructions</p>
            <p class="mt-1  text-primary">
              {{ $utils.getFirstData(form.medication_request_notes) || '-' }}
            </p>
          </div>
        </div>
        
        <div
          v-if="form.practitioner_detail"
          class="my-6"
        >
          <p class="text-gray-500  mb-2">Prescribed by</p>
          <div class="flex items-center">
            <InfoImageBlock :label="form.practitioner_detail.name" />
          </div>
        </div>
        <div
          v-if="form.encounter"
          class="my-4"
        >
          <p class="text-gray-500 ">Encounter</p>
          <p class="mt-1  text-primary">
            <span
              
              class="text-serenity-primary font-bold underline ml-2"
              @click="goToEncounter"
            >
              View encounter
            </span>
          </p>
        </div>
      </div>
      <div class="w-full mt-8">
        <SeButton
          variant="secondary"
          full
          @click="close"
        >
          Close
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import { mapActions } from 'vuex'

export default {
  name: 'PrescriptionModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      name: 'prescription',
    }
  },

  events: {
    'prescription:detail:open': function(data){
      this.form = data.params[0]
      this.open()
    },
    'prescription:detail:close': function(){
      this.close()
    },
  },

  methods: {
    ...mapActions({
      setCurrentEncounter: 'encounters/setCurrentEncounter',
    }),

    goToEncounter() {
      this.setCurrentEncounter(this.form.encounter)
      this.$router.push({ name: 'PatientEncounters', params: { id: this.$route.params.id }})
    },
  },
}
</script>

