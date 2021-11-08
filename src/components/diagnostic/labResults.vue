<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
    />
    <div class="my-4 flex items-center space-x-2">
      <SeButton
        :variant="selected === 'active' ? 'default' : 'white'"
        @click="selected = 'active'"
      >
        Active ({{ 0 }})
      </SeButton>
      <SeButton
        :variant="selected === 'sample' ? 'default' : 'white'"
        @click="selected = 'sample'"
      >
        Sample Requests
      </SeButton>
      <SeButton
        v-if="!hideWalk"
        :variant="selected === 'Walk' ? 'default' : 'white'"
        @click="selected = 'Walk'"
      >
        Walk-in patients
      </SeButton>
    </div>
    <DataTable
      ref="table"
      :data="filteredData || []"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          <div class="flex items-center space-x-2 py-2">
            <Avatar :name="row.patient_name" />
            <p>{{ row.patient_name | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.mr_number }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.type }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.service }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <router-link
            tag="div"
            :to="`/diagnostics/patients/${row.id}`"
            class="flex items-center cursor-pointer font-semibold"
            :disabled="!$userCan('diagnostic.requests.read')"
          >
            View patient
          </router-link>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataMixin from '@/mixins/data'
export default {
  name: 'LabsResults',

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },

    hideWalk: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
      selected: 'active',
      columns: [
        'Patient',
        'MR Number',
        'Type',
        'Service',
        'Action',
      ],
      data: [
        {
          id: '62356461-67df-4097-b103-919f811a0864',
          patient_telephone: '+2335406754445466',
          patient_name: 'David Doe',
          mr_number: '00123374',
          provider_name: 'Nyaho Medical Centre',
          type: 'Facility Visit',
          healthcareService_id: '0561be70-c5c8-4db5-93c9-d034a53c00a5',
          service: 'Full Blood Count',
        },
        {
          id: '62356461-67df-4097-b103-919f811a0864',
          patient_telephone: '+2335406754445466',
          patient_name: 'Pope Jones',
          mr_number: '00123436',
          provider_name: 'Nyaho Medical Centre',
          type: 'Facility Visit',
          healthcareService_id: '0561be70-c5c8-4db5-93c9-d034a53c00a5',
          service: 'Full Blood Count',
        },
      ],
    }
  },

  mounted() {
    this.paginate = true
    this.searchTerms = ['patient_name', 'mr_number', 'service']
  },

}
</script>
