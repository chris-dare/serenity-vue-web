<template>
  <DataTable
    :auto-width="true"
    small
    :data="currentEncounterMedicationRequests"
    no-data-label="No medication available"
    :columns="columns"
  >
    <template #default="{row}">
      <cv-data-table-cell>
        <p>{{ $date.formatDate(row.created_at) }}</p>
      </cv-data-table-cell>
      <cv-data-table-cell>
        <p class="text-serenity-primary ">{{ $utils.getFirstData(row.medication_detail) }} {{ $utils.getFirstData(row.medication_request_dosage_instruction, 'strength') }}</p>
      </cv-data-table-cell>
      <cv-data-table-cell>
        <p>{{ $utils.getFirstData(row.medication_request_category) }}</p>
      </cv-data-table-cell>
      <cv-data-table-cell>
        <div>
          <p>{{ $utils.getFirstData(row.medication_request_dosage_instruction, 'period') }} {{ $utils.getFirstData(row.medication_request_dosage_instruction, 'period_unit') }}</p>
        </div>
      </cv-data-table-cell>
      <cv-data-table-cell>
        <div>
          <p>{{ $utils.getFirstData(row.medication_request_dosage_instruction, 'frequency') }} {{ $utils.getFirstData(row.medication_request_dosage_instruction, 'frequency_unit') }}</p>
        </div>
      </cv-data-table-cell>
      <cv-data-table-cell>
        <div>
          <p>{{ row.dosage_form }}</p>
        </div>
      </cv-data-table-cell>
      <cv-data-table-cell v-if="!hideAction">
        <div class="flex items-center space-x-2">
          <Edit
            class="w-4 h-4 cursor-pointer"
            @click="$router.push({ name: 'EditEncounterMedication', params: { medicationId: row.id } })"
          />
          <Trash
            class="w-4 h-4 cursor-pointer"
            @click="remove(row.id)"
          />
        </div>
      </cv-data-table-cell>
    </template>
  </DataTable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EncounterMedicationTable',

  props: {
    hideAction: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapGetters({
      currentEncounterMedicationRequests: 'encounters/currentEncounterMedicationRequests',
    }),

    columns() {
      let columns = [
        'Date',
        'Drug/Proceedure',
        'Type',
        'Duration',
        'Frequency',
        'Dosage Form',
      ]
      if (!this.hideAction) {
        columns.push('Action')
      }
      return columns
    },
  },

  methods: {
    ...mapActions({
      deleteMedicationRequest: 'patients/deleteMedicationRequest',
    }),

    remove(id) {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'Delete',
        type: 'delete',
        confirmButtonVariant: 'danger',
        label: 'Are you sure you want to delete this medication?',
        callback: async () => {
          this.removeMedication(id)
        },
        cancel: async () => {

        },
      })
    },

    async removeMedication(id) {
      this.loading = true
      try {
        await this.deleteMedicationRequest(id)
        this.$toast.open({
          message: 'Medication successfully deleted',
        })
        this.loading = false

      /* eslint-disable-next-line */
      } catch (error) {
      }
      this.loading = false
    },
  },
}
</script>
