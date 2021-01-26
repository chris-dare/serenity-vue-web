<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="sm"
  >
    <template slot="content">
      <div>
        <p class="my-2 font-semibold">Start patient visit</p>
        <p>Find patient</p>

        <cv-search
          placeholder="Search for patient, enter name or MR number"
          v-model="search"
          class="my-4"
        ></cv-search>

        <cv-data-table
          :columns="columns"
          :data="filteredPatients"
          ref="table"
        >
        <template slot="data">
          
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredPatients"
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
                  <p class="text-secondary text-xs">
                    {{ row.gender }}, {{ row.age }} years
                  </p>
                </div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ row.recent }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ $faker().random.boolean() ? 'Cash' : 'Corporate' }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <SeButton @click="$router.push(`/patients/${row.id}`)">Start Visit</SeButton>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
        </cv-data-table>
        <div class="w-full h-28 bg-white flex items-center justify-center" v-if="!filteredPatients">
            No data
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StartVisitModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
      columns: ['Patient', 'Appointment', 'Payment Type', 'Action'],
    }
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
    }),
    filteredPatients() {
      return this.patients.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
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
