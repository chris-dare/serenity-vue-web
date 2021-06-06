<template>
  <div class="p-6">
    <Search
      v-model="search"
      placeholder="Search for patient"
    />

    <div class="my-4 py-4">
      <div
        v-for="(patient, index) in filteredData"
        :key="index"
        class="flex items-center justify-between py-2"
      >
        <div class="flex items-center space-x-3">
          <ImageBlock
            :alt="patient.name"
            custom-class="w-8 h-8"
          />
          <div>
            <p class="text-xs">{{ patient.name }} <span class="text-gray-500">({{ patient.gender }} {{ patient.age }})</span></p>
            <p class="text-secondary text-xs">
              Encountered {{ difference(patient.last_encounter) }} days ago
            </p>
          </div>
        </div>
        <router-link :to="{ name: 'PatientSummary', params: { id: patient.id }}">
          <IconButton small>
            <See class="w-4 h-4" />
          </IconButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { differenceInDays } from 'date-fns'
import { mapGetters } from 'vuex'
import dataMixin from '@/mixins/data'
import See from '@carbon/icons-vue/es/view/32'

export default {
  name: 'Patients',

  components: { See },

  mixins: [dataMixin],

  data() {
    return {
      searchTerms: ['name'],
    }
  },
  

  computed: {
    ...mapGetters({
      data: 'patients/patients',
    }),
  },

  methods: {
    difference(date) {
      return differenceInDays(Date.now(), new Date(date))
    },
  },
}
</script>
