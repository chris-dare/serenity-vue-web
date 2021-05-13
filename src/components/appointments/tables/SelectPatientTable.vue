<template>
  <div>
    <p class="text-primary mb-4">Select your patient below</p>
    <Search
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
      class="mb-4"
    />
    
    <!-- header -->
    <div
      :class="[`grid-cols-${columns.length}`]"
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
    <cv-skeleton-text
      v-if="dataLoading"
      :heading="false"
      :paragraph="true"
      :line-count="3"
      width="100%"
    />
    <div
      v-else
      class="divide-y divide-dark divide-opacity-10 divide-solid"
    >
      <div
        v-for="(row, rowIndex) in filteredData"
        :key="`${rowIndex}`"
        :class="[`grid-cols-${columns.length}`, internalPatient === row ? 'bg-serenity-subtle-border' : 'bg-white']"
        class="grid gap-4 px-4 cursor-pointer"
        @click="internalPatient = row"
      >
        <div class="flex items-center py-4 space-x-3">
          <cv-radio-button
            v-model="internalPatient"
            :value="row"
            name="group-1"
          />

          <InfoImageBlock
            :label="row.name"
            :description="row.gender_age_description"
            size="base"
          />
        </div>
        <div class="flex items-center ">
          <p class="">{{ row.phone }}</p>
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
      // search: '',
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
  },
}
</script>
