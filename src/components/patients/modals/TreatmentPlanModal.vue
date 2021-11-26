<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    width="450px"
    title="Treatment plan"
  >
    <template
      class="p-0 mb-4"
    >
      <div class="text-xs">
        <div class="my-4">
          <p class="text-gray-500 ">Proceedure</p>
          <p class="text-serenity-primary mt-1 ">
            {{ 'aha' }}
          </p>
        </div>
        <div class="my-4">
          <p class="text-gray-500 ">Dosage</p>
          <p class=" mt-1 text-primary">{{ 'aha' }}</p>
        </div>
        <div class="grid grid-cols-2 gap-6 my-4">
          <div>
            <p class="text-gray-500 ">Duration</p>
            <p class=" mt-1 text-primary">{{ 'aha' }}</p>
          </div>
          <div>
            <p class="text-gray-500 ">Start Date</p>
            <p class=" mt-1 text-primary">{{ 'aha' }}</p>
          </div>
        </div>
        <div class="my-4">
          <p class="text-gray-500 ">Instructions</p>
          <p class="mt-1  text-primary">
            {{ 'aha' }}
          </p>
        </div>
        <div class="my-4">
          <p class="text-gray-500  mb-2">Prescribed by</p>
          <div class="flex items-center">
            <img
              class="w-12 h-12 rounded-full mr-3"
              src="@/assets/img/user 1.svg"
              alt=""
            >
            <div>
              <div>
                <p class="mt-1 ">
                  {{ 'Chris Dare' }}
                </p>
                <p class="mt-1  text-secondary">
                  {{ 'aha' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="my-4">
          <p class="text-gray-500 ">Encounter</p>
          <p class="mt-1  text-primary">
            {{ 'aha' }}
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
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'TreatmentPlanModal',

  mixins: [modalMixin],

  data() {
    return {
      name: 'treatment-plan-modal',
    }
  },

  events: {
    'treatment:plan:open': function(){
      this.open()
    },
  },
}
</script>
