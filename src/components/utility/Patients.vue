<template>
  <div class="p-6">
    <cv-search placeholder="Search for patient" v-model="search"></cv-search>

    <div class="my-4 py-4">
      <div
        v-for="(patient, index) in patients"
        :key="index"
        class="flex items-center justify-between py-2"
      >
        <div class="flex items-center">
          <img class="w-8 h-8 rounded-full mr-3" :src="patient.image" alt="" />
          <div>
            <p class="text-xs">{{ patient.name }} <span class="text-gray-500">({{ patient.gender }} {{ patient.age }})</span></p>
            <p class="text-gray-400 text-xs">
              Encountered {{ difference(patient.recent) }} days ago
            </p>
          </div>
        </div>
        <div
          class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center"
        >
          <img src="@/assets/img/view 1.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPatients } from '@/services/helpers'
import { differenceInDays } from 'date-fns'
export default {
  name: 'Patients',

  data() {
    return {
      search: '',
    }
  },

  computed: {
    patients() {
      return createPatients(5)
    },
  },

  methods: {
    difference(date) {
        return differenceInDays(Date.now(), new Date(date))
    },
  },
}
</script>
