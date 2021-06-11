<template>
  <div class="space-y-4">
    <!-- <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
    /> -->
    <div class="my-4 flex items-center space-x-2">
      <cv-button
        class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
        kind="tertiary"
        @click="$router.go(-1)"
      >
        Go Back
      </cv-button>
    </div>
    <DataTable
      ref="table"
      :data="filteredData"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ row.service }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.mr_number }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.patient_name }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center">
            <SeButton
              class="mx-2"
              variant="secondary"
              @click="$trigger('rejectlab:add:open')"
            >
              Reject
            </SeButton>
            <SeButton>
              Accept
            </SeButton>
            <SeButton
              class="mx-2"
              variant="gray"
              @click="$trigger('external:add:open')"
            >
              External processing
            </SeButton>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <ExternalProcess />
    <RejectLab />
  </div>
</template>

<script>
import ExternalProcess from '@/components/diagnostic/modals/ExternalProcess'
import RejectLab from '@/components/diagnostic/modals/RejectLab'
import DataMixin from '@/mixins/data'
export default {
  name: 'LabsTable',

  components: { ExternalProcess, RejectLab },

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
      selected: 'all',
      columns: [
        'Test requested',
        'Test ID',
        'Physician',
        'State',
      ],
      data: [
        {
          id: '62356461-67df-4097-b103-919f811a0864',
          patient_telephone: '+2335406754445466',
          patient_name: 'David Doe',
          mr_number: '00123374',
          provider_name: 'Nyaho Medical Centre',
          type: 'Awaiting sample',
          healthcareService_id: '0561be70-c5c8-4db5-93c9-d034a53c00a5',
          service: 'Electrolyte panel',
        },
        {
          id: '62356461-67df-4097-b103-919f811a0864',
          patient_telephone: '+2335406754445466',
          patient_name: 'Pope Jones',
          mr_number: '00123436',
          provider_name: 'Nyaho Medical Centre',
          type: 'Done',
          healthcareService_id: '0561be70-c5c8-4db5-93c9-d034a53c00a5',
          service: 'Electrolyte panel',
        },
        {
          id: '62356461-67df-4097-b103-919f811a0864',
          patient_telephone: '+2335406754445466',
          patient_name: 'Pope Jones',
          mr_number: '00123436',
          provider_name: 'Nyaho Medical Centre',
          type: 'Awaiting results',
          healthcareService_id: '0561be70-c5c8-4db5-93c9-d034a53c00a5',
          service: 'Electrolyte panel',
        },
        {
          id: '62356461-67df-4097-b103-919f811a0864',
          patient_telephone: '+2335406754445466',
          patient_name: 'Pope Jones',
          mr_number: '00123436',
          provider_name: 'Nyaho Medical Centre',
          type: 'Done',
          healthcareService_id: '0561be70-c5c8-4db5-93c9-d034a53c00a5',
          service: 'Electrolyte panel',
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
