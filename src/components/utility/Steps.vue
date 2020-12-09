<template>
  <div>
    <div class="flex h-20">
      <div class="w-12"></div>
      <div class="w-8 flex items-center justify-center relative">
        <div class="z-1 w-px h-10 absolute bottom-0 bg-serenity-step"></div>
        <div class="z-0 w-4 h-4 rounded-full bg-warning"></div>
      </div>
      <div class="flex items-center justify-center">
        <p class="text-sm">{{ step.title }} ({{ step.patients.length }})</p>
      </div>
    </div>
    <div v-for="(patient, index) in step.patients" :key="index" class="flex h-20">
      <div class="w-12 text-xs text-gray-500 flex items-center text-right">
        {{ patient.time }}
      </div>
      <div class="w-8 flex items-center justify-center relative">
        <div :class="[index === step.patients.length - 1 ? 'h-10' : 'h-full']" class="z-1 w-px absolute top-0 bg-serenity-step"></div>
        <div class="w-2 h-2 rounded-full bg-serenity-step"></div>
      </div>
      <div class="flex items-center py-2">
        <img class="w-8 h-8 rounded-full mr-3" :src="patient.image" alt="" />
        <div>
          <p class="text-xs">{{ patient.name }}</p>
          <p class="text-gray-400 text-xs">
            {{ patient.gender }}, {{ patient.age }} years
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Steps',

  props: {
    step: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style></style>
