<template>
  <div class="relative h-full">
    <SeForm class="space-y-8">
      <p class="font-semibold">Care Plans</p>
      <cv-text-area
        v-model="form.description"
        label="Care plan"
        placeholder="Prepare a care plan"
      />
      <DateRangePicker v-model="form" />
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

        <div
          v-if="!currentEncounterCarePlans.length"
          class="flex items-center my-4"
        >
          No care plans available
        </div>
        <div
          v-else
          class="space-y-3"
        >
          <div
            v-for="(diagnosis, index) in currentEncounterCarePlans"
            :key="index"
            class="flex items-center space-x-2"
          >
            <router-link
              class="underline"
              :to="{ name: 'EncounterReview', params: { ...$route.params } }"
            >
              view encounter
            </router-link>
          </div>
        </div>
      </div>
    </SeForm>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'CarePlan',

  data() {
    return {
      form: {},
      loading: false,
    }
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      priorities: (state) => state.global.priorities,
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
      this.loading = true

      const form = {
        description: this.form.description,
        period_start: this.form.start ? this.form.start : null,
        period_end: this.form.end ? this.form.end : null,
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
