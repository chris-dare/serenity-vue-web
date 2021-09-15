<template>
  <div>
    <div class="my-4">
      <p class="text-lg font-bold pt-3"> Current Patient </p>
      <div class="flex items-center py-2">
        <div class="w-1/3">
          <p class="text-secondary text-xs">Name</p>
          <p>{{ internalPatient.fullName || '-' }}</p>
        </div>
        <div class="w-1/3">
          <p class="text-secondary text-xs"> Phone Number</p>
          <p>{{ internalPatient.phone || '-' }}</p>
        </div>
        <div class="w-1/3">
          <p class="text-secondary text-xs"> Bio Info </p>
          <p>{{ internalPatient.gender_age_description || '-' }}</p>
        </div>
      </div>
    </div>
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
          v-for="(row, rowIndex) in normalizedData"
          :key="`${rowIndex}`"
          :class="[`grid-cols-${columns.length + 1}`, internalPatient.id === row.id ? 'bg-gray-100' : 'bg-white']"
          class="grid grid-cols-3 gap-4 items-center hover:bg-gray-100 p-4 cursor-pointer"
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
              class="w-5 h-5"
              :class="[internalPatient.id === row.id ? 'text-serenity-primary' : 'text-transparent']"
            />
          </div>
        </div>
        <cv-pagination
          :number-of-items="dataCount"
          :page="page"
          :backwards-button-disabled="page === 1"
          :forwards-button-disabled="false"
          :page-sizes="pagination.pageSizes"
          @change="storePagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import data from '@/mixins/data'
import isEmpty from 'lodash/isEmpty'

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
    hideSelectedPatient: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      selected: false,
      searchTerms: null,
    }
  },


  computed: {
    ...mapState({
      total: (state) => state.patients.patientsCount,
      meta: (state) => state.patients.patientsMeta,
    }),
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

    patientSelected() {
      return this.internalPatient && !isEmpty(this.internalPatient)
    },
  },


  watch: {
    search(val) {
      this.searchPatients(val)
    },
  },

  created() {
    this.pageLength = 5
    this.pageSizes = [5, 10, 15, 20, 25]
    if (!this.hideSelectedPatient && this.patient.first_name) {
      this.search = this.patient.first_name
    }
  },


  mounted() {
    this.paginate = true
    this.pageLength = 5
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      searchPatientsStore: 'patients/searchPatients',
    }),

    searchPatients: debounce(function(search) {
      this.searchPatientsStore({ search, page: 1, page_size: 5 })
    }, 300, false),
  },
}
</script>
