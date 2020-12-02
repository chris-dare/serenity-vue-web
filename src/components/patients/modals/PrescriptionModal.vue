<template>
  <cv-modal close-aria-label="Close" :visible="modalVisible" size="sm">
    <template slot="title">
      <p class="text-sm">Medication details</p>
    </template>
    <template slot="content" class="p-0">
      <div class="text-xs">
        <div class="my-4">
          <p class="text-gray-500 text-sm">Drug</p>
          <p class="text-serenity-primary mt-1 text-sm">
            {{ $faker().lorem.word() }}
          </p>
        </div>
        <div class="my-4">
          <p class="text-gray-500 text-sm">Dosage</p>
          <p class="text-sm mt-1">{{ $faker().lorem.word() }}</p>
        </div>
        <div class="grid grid-cols-2 gap-6 my-4">
          <div>
            <p class="text-gray-500 text-sm">Duration</p>
            <p class="text-sm mt-1">{{ $faker().lorem.word() }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Start Date</p>
            <p class="text-sm mt-1">{{ $faker().lorem.word() }}</p>
          </div>
        </div>
        <div class="my-4">
          <p class="text-gray-500 text-sm">Instructions</p>
          <p class="mt-1 text-sm">
            {{ $faker().lorem.word() }}
          </p>
        </div>
        <div class="my-4 flex items-center">
            <div class="flex">
                <img
                  class="w-12 h-12 rounded-full mr-3"
                  :src="$faker().image.image()"
                  alt=""
                />
            <div>
          <p class="text-gray-500 text-sm">Prescribed by</p>
          <p class="mt-1 text-sm">
            {{ $faker().name.findName() }}
          </p>
          </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <cv-button
          class="flex items-center justify-center bg-black text-white w-full"
        >
          Close</cv-button
        >
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'PrescriptionModal',

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
