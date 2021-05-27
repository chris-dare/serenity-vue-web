<template>
  <cv-modal
    close-aria-label="Close"
    class="se-no-title-modal"
    :visible="visible"
    size="xs"
  >
    <template
      slot="content"
      class="p-0 mb-4"
    >
      <div class="text-xs">
        <p>Medication details</p>
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
        
        <div class="my-6">
          <p class="text-gray-500  mb-2">Prescribed by</p>
          <div class="flex items-center">
            <img
              class="w-12 h-12 rounded-full mr-3"
              :src="$faker().image.image()"
              alt=""
            >
            <div>
              <div>
                <p class="mt-1 ">
                  {{ $faker().name.findName() }}
                </p>
                <p class="mt-1  text-secondary">
                  {{ $faker().lorem.word() }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="my-4">
          <p class="text-gray-500 ">Encounter</p>
          <p class="mt-1  text-primary">
            {{ $faker().lorem.word() }}
            <router-link
              to="/"
              class="text-serenity-primary font-bold underline ml-2"
            >
              View encounter
            </router-link>
          </p>
        </div>
      </div>
      <div class="w-full mt-8">
        <cv-button
          class="flex items-center justify-center bg-black text-white w-full m-0 p-0"
        >
          Close
        </cv-button>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'PrescriptionModal',

  data() {
    return {
      visible: false,
    }
  },

  events: {
    'prescription:detail:open': function(data){
      this.form = data.params[0]
      this.visible = true
    },
    'prescription:detail:close': function(){
      this.visible = false
    },
  },
}
</script>

<style></style>
