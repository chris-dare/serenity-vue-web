<template>
  <div>
    <Search
      v-model="search"
      placeholder="Search for medication or date or condition"
    />
    <div class="my-4 flex items-center justify-between">
      <div>
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          All ({{ patientNotes.length }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-placeholder"
          @click="visible = !visible"
        >
          Doctor’s Notes ({{ 0 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-placeholder"
        >
          Nurse’s Notes ({{ 0 }})
        </cv-button>
      </div>
    </div>
    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Notes</p>

        <IconButton
          v-if="hasActiveEncounter"
          @click="$trigger('notes:open')"
        >
          <Add class="w-4 h-4 text-serenity-primary" />
        </IconButton>
      </div>

      <DataTable
        ref="table"
        :columns="columns"
        :data="patientNotes"
        class="transparent-table"
        size="tall"
        :no-data-label="noDataLabel('notes')"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <p class="">{{ $date.formatDate(row.created_at, 'MMM. dd, yyyy') }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <InfoImageBlock
              label="Dr Chris Dare"
              description="General Practitioner"
            />
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.display }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p
                v-if="row.encounter"
                class="font-semibold underline ml-2 cursor-pointer"
                @click="viewEncounter"
              >
                View encounter
              </p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div class="flex items-center space-x-2 justify-start">
              <IconButton @click="$trigger('notes:detail:open', { data: row })">
                <ViewIcon class="w-5" />
              </IconButton>
              <IconButton @click="removeNote(row.id)">
                <Trash class="w-4" />
              </IconButton>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <NotesDetailModal :visible.sync="visible" />
    <NotesModal
      required
      @save="createNote"
      @update="updateNote"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'PatientNotes',

  components: {
    NotesDetailModal: () => import(/* webpackPrefetch: true */'@/components/patients/modals/NotesDetailModal'),
    ViewIcon: () => import(/* webpackPrefetch: true */'@carbon/icons-vue/es/view/16'),
  },

  data() {
    return {
      search: '',
      columns: [
        'Date',
        'Written By',
        'Note',
        'Encounter',
        'Action',
      ],
      visible: false,
      order: {},
    }
  },

  computed: {
    ...mapState({
      patientNotes: (state) => state.patients.patientNotes,
      provider: (state) => state.auth.provider,
    }),

    ...mapGetters({
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),
  },

  methods: {
    ...mapActions({
      createPatientNote: 'encounters/createNote',
      updatePatientNote: 'encounters/updateNote',
      deletePatientNote: 'encounters/removeNote',
      setCurrentEncounter: 'encounters/setCurrentEncounter',
    }),

    showOrder(data) {
      this.order = data
      this.visible = true
    },

    viewEncounter() {
      this.setCurrentEncounter(this.note.encounter)
      this.$router.push({ name: 'PatientEncounters', params: { id: this.$route.params.id }})
    },

    async createNote(notes) {
      this.loading = true
      try {
        // TODO recheck
        const noteForm = { display: notes, patient: this.$route.params.id }
        // practitioner_role: this.provider.practitionerRoleId }
        await this.createPatientNote(noteForm)
        this.$toast.open({
          message: 'Notes created successfully',
        })
        this.$trigger('notes:close')
      } catch (error) {
        // empty
      } finally {
        this.loading = false
      }
    },
  
    async updateNote(data) {
      this.loading = true
      try {
        
        const noteForm = { ...data, display: data.notes }
        delete noteForm.notes
        await this.updatePatientNote(noteForm)
        this.$toast.open({
          message: 'Notes created successfully',
        })
        this.$trigger('notes:close')
      } catch (error) {
        // empty
      } finally {
        this.loading = false
      }
    },

    async removeNote(id) {
      this.loading = true
      try {
        await this.deletePatientNote(id)
        this.$toast.open({
          message: 'Note removed successfully',
        })
      } catch (error) {
        // empty
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
