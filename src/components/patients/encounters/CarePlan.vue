<template>
  <div class="relative h-main">
    <SeForm class="space-y-8">
      <p class="font-semibold">Care Plans</p>
      <cv-text-area
        v-model="form.description"
        label="Care plan"
        placeholder="Prepare a care plan"
        :input-message="$utils.validateRequiredField($v, 'description')"
        :rows="5"
      />
      <DatePicker
        v-model="date"
        type="datetimerange"
        class="se-input-gray"
      />
      <div class="flex justify-end">
        <SeButton
          :loading="loading"
          @click="submit"
        >
          Save
        </SeButton>
      </div>

      <div>
        <p class="mb-2 font-semibold">Previous Care plans</p>

        <DataTable
          small
          :data="currentEncounterCarePlans"
          :columns="columns"
          no-data-label="No Care Plan"
        >
          <template #default="{row}">
            <cv-data-table-cell>
              <div>
                <p>{{ row.description }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $date.formatDate(row.period_start) }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $date.formatDate(row.period_end) }}</p>
              </div>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>
    </SeForm>

    <div class="flex justify-between items-center absolute w-full right-0 bottom-12">
      <SeButton
        variant="secondary"
        :to="{name: 'EncounterMedications', params: { id: $route.params.id }}"
      >
        Back to medications
      </SeButton>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapGetters } from 'vuex'
import DateRangeMixin from '@/mixins/date-range'


export default {
  name: 'CarePlan',


  mixins: [DateRangeMixin],

  data() {
    return {
      form: {},
      loading: false,
      columns: ['Description', 'From', 'To'],
    }
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      encounter: (state) => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      currentEncounterCarePlans: 'encounters/currentEncounterCarePlans',
    }),
  },

  validations: {
    form: {
      description: { required },
    },
  },

  methods: {
    ...mapActions({
      createCarePlan: 'encounters/createCarePlan',
      updateCarePlan: 'encounters/updateCarePlan',
    }),

    submit(reroute= false) {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill all required fields')
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save(reroute)
      }
    },

    async save(reroute) {
      let date = this.convertFromDatePickerFormat(this.date)

      this.loading = true

      const form = {
        description: this.form.description,
        period_start: date.start,
        period_end: date.end,
      }
      

      try {
        await this.createCarePlan(form)
        this.loading = false
        this.$toast.open({
          message: 'Care Plan successfully added',
        })
        if (reroute) {
          this.$router.push({ name: 'EncounterMedications'})
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        await this.updateCarePlan(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Care Plan successfully updated',
        })
      } catch (error) {
        this.loading = false
      }
    },

    close() {
      this.form = {}
      this.$v.$reset()
    },
  },
}
</script>
