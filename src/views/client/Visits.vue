<template>
  <div>
    <div class="w-4/5 mx-auto">
      <div class="flex items-center justify-between ">
        <p class="text-xl font-bold">Visits</p>
      </div>

      <div>
        <cv-search
          placeholder="Search for patient"
          v-model="search"
        >
        </cv-search>
        <div class="my-4 flex items-center space-x-2">
          <cv-button
            size="field"
            kind="ghost"
            class="px-4 bg-white hover:bg-white text-serenity-placeholder"
          >
            <div class="w-2 h-2 rounded-full bg-green-700 mr-2"></div>
            Active ({{ 1 }})
          </cv-button>
          <cv-button
            kind="primary"
            size="field"
            class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
          >
            All (5)
          </cv-button>
        </div>

        <div>
          <cv-data-table :columns="columns" :data="patients">
            <template slot="data">
              <cv-data-table-row
                v-for="(row, rowIndex) in patients"
                :key="`${rowIndex}`"
                :value="`${rowIndex}`"
              >
                <cv-data-table-cell>
                  <div class="flex items-center py-2">
                    <img
                      class="w-12 h-12 rounded-full mr-3"
                      :src="row.image"
                      alt=""
                    />
                    <div>
                      <p class="text-sm">{{ row.name }}</p>
                      <p class="text-secondary text-xs capitalize">
                        {{ row.gender }}, {{ row.age }} years
                      </p>
                    </div>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p class="text-sm">{{ Math.random() }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p class="text-sm">Facility Visit</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p class="text-sm">Specialist Appointment</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <router-link
                    tag="div"
                    :to="`/patients/${row.id}`"
                    class="flex items-center cursor-pointer"
                  >
                    View Patient
                    <div
                      class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center"
                    >
                      <img src="@/assets/img/view 1.svg" alt="" />
                    </div>
                  </router-link>
                </cv-data-table-cell>
              </cv-data-table-row>
            </template>
          </cv-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Visits',

  data() {
    return {
      search: '',
      columns: ['Patient', 'MR Number', 'Type', 'Service', 'Action'],
    }
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
      patientsCount: (state) => state.patients.patientsCount,
    }),
  },

  mounted() {
    this.getPatients()
  },

  methods: {
    ...mapActions({
      getPatients: 'patients/getPatients',
    }),
  },
}
</script>
