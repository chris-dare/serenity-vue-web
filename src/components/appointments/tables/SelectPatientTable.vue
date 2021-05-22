<template>
  <div>
    <p class="text-primary mb-4">Select your patient below</p>
    <Search
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
      class="mb-4"
    />

    <cv-data-table-skeleton
      v-if="dataLoading"
      :columns="2"
      :rows="3"
    />
    
    <!-- header -->
    <div v-else>
      <div
        :class="[`grid-cols-${columns.length + 1}`]"
        class="grid gap-4 px-4 h-12 bg-table"
      >
        <div
          v-for="(column, index) in columns"
          :key="index"
          class="flex items-center"
        >
          <p class="font-semibold">{{ column }}</p>
        </div>
      </div>
      <!-- body -->
      <div
      
        class="divide-y divide-dark divide-opacity-10 divide-solid"
      >
        <div
          v-for="(row, rowIndex) in filteredData"
          :key="`${rowIndex}`"
          :class="[`grid-cols-${columns.length + 1}`, internalPatient.id === row.id ? 'bg-gray-100' : 'bg-white']"
          class="grid gap-4 items-center hover:bg-gray-100 p-4 cursor-pointer"
          @click="internalPatient = row"
        >
          <InfoImageBlock
            :label="row.name"
            :description="row.gender_age_description"
            size="base"
          />
          <p>{{ row.phone }}</p>
          <div class="flex justify-end">
            <CheckmarkFilled
              class="w-5 h-5 text-serenity-primary"
              :class="[internalPatient.id === row.id ? 'text-serenity-primary' : 'text-secondary']"
            />
          </div>
        </div>
        <cv-pagination
          :number-of-items="normalizedData.length"
          :page="page" 
          :backwards-button-disabled="page === 1"
          :forwards-button-disabled="false"
          :page-sizes="pagination.pageSizes"
          @change="actionOnPagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import data from '@/mixins/data'
export default {
  name: 'SelectPatientTable',

  mixins: [data],

  props: {
    columns: {
      type: Array,
      default:() => [],
    },
    patient: {
      type: Object,
      default: () => {},
    },
    dataLoading: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      selected: false,
    }
  },
  

  computed: {
    ...mapGetters({
      data: 'patients/patients',
    }),

    internalPatient: {
      set(val) {
        this.$emit('update:patient', val)
      },
      get() {
        return this.patient
      },
    },

    filteredDat() {
      return this.$utils.getFilteredData(this.data, this.search, ['first_name', 'last_name', 'mr_number'])
    },
  },

  created() {
    this.searchTerms = ['first_name', 'last_name', 'mr_number']
    this.paginate= true
    this.pageLength = 5
    this.pageSizes = [5,10, 15, 20, 25]

    if (this.patient.first_name) {
      this.search = this.patient.first_name
    }
  },
}
</script>
