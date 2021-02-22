<template>
  <div class="bg-white mt-4 p-4">
    <div class="flex items-center">
      <p class="font-semibold mr-12">Patient History</p>
      <div
        v-for="(item, index) in filters"
        :key="index"
        class="flex items-center space-x-2 mr-8 cursor-pointer"
        @click="selected = item.slug"
      >
        <div
          :style="`background:${item.color}`"
          class="w-3 h-3"
        />
        <p> {{ item.label }} </p>
      </div>
    </div>
    <TimeSeries
      :filter="selected"
      :series="dates"
    />
    <DiagnosisDetailModal />
  </div>
</template>

<script>
import TimeSeries from '@/components/patients/timeline/TimeSeries'
import DiagnosisDetailModal from '@/components/patients/timeline/DiagnosisDetailModal'
import { format } from 'date-fns'
export default {
  name: 'PatientTimeline',

  components: { TimeSeries, DiagnosisDetailModal },

  data() {
    return {
      filters: [
        {
          label: 'Visit',
          color: 'blue',
          slug: 'visit',
        },
        {
          label: 'Hospitalization',
          color: 'yellow',
          slug: 'hospitalization',
        },
        {
          label: 'Proceedures',
          color: '#24A148',
          slug: 'proceedures',
        },
        {
          label: 'Labs',
          color: 'black',
          slug: 'labs',
        },
        {
          label: 'Imaging',
          color: '#2CA9B4',
          slug: 'imaging',
        },
      ],
      selected: null,
    }
  },

  computed: {
    dates() {
      let dates = []

      for (let index = 0; index < 20; index++) {
        const element = {date: this.$faker().date.past()}
        const num = Math.floor(Math.random() * (this.filters.length + 1))
        const types = []

        for (let index = 0; index < num; index++) {
          types.push({...this.filters[index],time:format(this.$faker().date.past(), 'HH:mm')})
        }

        element.types = types
        dates.push(element)
      }

      return this.$date.sortDate(dates)
    },
  },
}
</script>
