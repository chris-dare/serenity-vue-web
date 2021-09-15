<template>
  <div class="p-6">
    <Search
      v-model="filter"
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
              {{ difference(patient.last_encounter) }}
            </p>
          </div>
        </div>
        <router-link :to="{ name: currentWorkspacePatientPage, params: { id: patient.id }}">
          <See class="w-4 h-4" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { differenceInDays } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'
import dataMixin from '@/mixins/data'
import See from '@carbon/icons-vue/es/view/16'
import debounce from 'lodash/debounce'

export default {
  name: 'UtilityPatients',

  components: { See },

  mixins: [dataMixin],

  data() {
    return {
      searchTerms: null,
      filter: null,
    }
  },

  computed: {
    ...mapGetters({
      data: 'patients/patients',
      currentWorkspacePatientPage: 'global/currentWorkspacePatientPage',
    }),
  },

  watch: {
    filter(search) {
      this.searchPatients(search)
    },
  },

  methods: {
    ...mapActions({
      searchPatientsStore: 'patients/searchPatients',
    }),

    difference(date) {
      if (!date) return 'No encounter recorded'
      return `Encountered ${differenceInDays(Date.now(), new Date(date))} days ago`
    },

    searchPatients: debounce(function(search) {
      this.searchPatientsStore({ search, page: this.page, page_size: this.pageLength })
    }, 300, false),
  },
}
</script>
