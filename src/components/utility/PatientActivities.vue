<template>
  <div class="px-6">
    <div
      v-for="(item, index) in 4"
      :key="index"
      class="my-4"
    >
      <div class="flex">
        <img
          class="w-9 h-9 rounded-full mr-3"
          src="@/assets/img/user 1.svg"
        >
        <div class="">
          <span class="text-primary font-semibold">{{
            'Chris Dare'
          }}</span>
          <span class="text-secondary ml-1">added a new patient record</span>
          <p class="my-2 text-xs text-secondary">10 min ago</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPatients } from '@/services/helpers'
export default {
  name: 'PatientActivities',

  computed: {
    due() {
      return { title: 'Due', patients: createPatients(3) }
    },
    met() {
      return { title: 'Due', patients: createPatients(3) }
    },
  },
}
</script>
