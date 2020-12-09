<template>
  <cv-modal close-aria-label="Close" :visible="modalVisible" size="xs">
    <template slot="title">
      <p>Treatment plan</p>
    </template>
    <template slot="content" class="p-0 mb-4">
      <div class="text-xs">
        <div class="mb-4">
          <p class="text-gray-500 text-sm">Proceedure</p>
          <p class="text-serenity-primary mt-1 text-sm">
            {{ $faker().lorem.word() }}
          </p>
        </div>
        <div class="my-4">
          <p class="text-gray-500 text-sm">Dosage</p>
          <p class="text-sm mt-1 text-primary">{{ $faker().lorem.word() }}</p>
        </div>
        <div class="grid grid-cols-2 gap-6 my-4">
          <div>
            <p class="text-gray-500 text-sm">Duration</p>
            <p class="text-sm mt-1 text-primary">{{ $faker().lorem.word() }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Start Date</p>
            <p class="text-sm mt-1 text-primary">{{ $faker().lorem.word() }}</p>
          </div>
        </div>
        <div class="my-4">
          <p class="text-gray-500 text-sm">Instructions</p>
          <p class="mt-1 text-sm text-primary">
            {{ $faker().lorem.word() }}
          </p>
        </div>
        <div class="my-4">
          <p class="text-gray-500 text-sm mb-2">Prescribed by</p>
          <div class="flex items-center">
              <img
                class="w-12 h-12 rounded-full mr-3"
                :src="$faker().image.image()"
                alt=""
              />
              <div>
                <div>
                  <p class="mt-1 text-sm">
                    {{ $faker().name.findName() }}
                  </p>
                  <p class="mt-1 text-sm text-secondary">
                    {{ $faker().lorem.word() }}
                  </p>
                </div>
              </div>
          </div>
        </div>
        <div class="my-4">
          <p class="text-gray-500 text-sm">Encounter</p>
          <p class="mt-1 text-sm text-primary">
            {{ $faker().lorem.word() }}
            <router-link to="/" class="text-serenity-primary font-bold underline ml-2">View encounter</router-link>
          </p>
        </div>
      </div>
      <div class="w-full mt-8">
        <cv-button
          class="flex items-center justify-center bg-black text-white w-full m-0 p-0"
        >
          Close</cv-button
        >
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'TreatmentPlanModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>

<style></style>
