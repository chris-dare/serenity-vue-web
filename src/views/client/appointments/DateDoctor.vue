<template>
  <div>
    <p class="text-primary my-4 font-bold">
      What time would the patient want to see the doctor?
    </p>
    <div class="grid grid-cols-2 gap-4">
      <cv-date-picker
        kind="single"
        v-model="form.date"
        class="w-full max-w-full inherit-full-input"
        placeholder="dd/mm/yyyy"
        label="Date"
      ></cv-date-picker>
      <cv-time-picker
        label="Time"
        :time="form.time"
        ampm="AM"
        :timezone="form.timezone"
        :timezones="timezones"
        :pattern="pattern"
        class="inherit-full-input"
        placeholder="hh:mm"
        :form-item="true"
      >
      </cv-time-picker>
    </div>
    <div class="flex items-center space-x-4 my-4">
      <cv-button :icon="icon" kind="primary" class="bg-serenity-primary"
        >Give me the next time slot</cv-button
      >
      <cv-button :icon="icon" kind="primary" class="bg-success">
        Join a wait queue
      </cv-button>
    </div>
    <p class="text-primary mt-8 mb-4 font-bold" @click="form.date = Date.now()">
      Select a doctor for the appointment
    </p>
    <div class="grid gap-4">
      <cv-skeleton-text
        v-if="loading"
        :heading="false"
        :paragraph="true"
        :line-count="3"
        width="100%"
      ></cv-skeleton-text>
      <div v-for="(doctor, i) in filteredDoctors" :key="i">
        <div
          class="flex justify-between items-center hover:bg-serenity-subtle-border px-4 py-2 cursor-pointer"
          :class="{ 'bg-serenity-subtle-border': doctor.id === form.doctor.id }"
          @click="form.doctor = doctor"
        >
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-3"
              :src="doctor.image"
              alt=""
            />
            <div>
              <p class="text-black font-semibold">Dr. {{ doctor.name }}</p>
              <p class="text-xs text-secondary">{{ doctor.specialty }}</p>
            </div>
          </div>
          <div>
            <Checkmark
              :class="{ 'text-serenity-primary': doctor.id === form.doctor.id }"
              class="hover:text-serenity-primary w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary px-6 mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
          >Cancel</cv-button
        >
        <cv-button
          @click="$router.push({ name: 'ClinicsServices' })"
          class="bg-black px-6"
          kind="primary"
          >Go back</cv-button
        >
      </div>
      <div class="flex items-center">
        <cv-button
          @click="save"
          :icon="right"
          :disabled="disabled"
          kind="primary"
          class="bg-serenity-primary"
          >Next: Payment</cv-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Time from '@carbon/icons-vue/es/time/32'
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DateDoctor',

  components: { Checkmark },

  data() {
    return {
      form: {
        doctor: {},
      },
      icon: Time,
      right: ChevronRight,
      loading: false,
      selected: 1,
      timezones: [
        {
          label: 'GMT',
          value: 'GMT',
        },
        {
          label: 'Timezone-2',
          value: 'timezone2',
        },
      ],
      pattern: '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)',
    }
  },

  computed: {
    ...mapState({
      globalType: (state) => state.global.globalType,
      doctors: (state) => state.doctors.doctors,
    }),

    filteredDoctors() {
      return this.doctors
        .filter(
          (data) =>
            !this.search ||
            data.name.toLowerCase().includes(this.search.toLowerCase()),
        )
        .slice(0, 4)
    },

    disabled() {
      return !this.form.date || !this.form.doctor
    },
  },

  async mounted() {
    this.loading = true
    await this.getDoctors()
    this.loading = false
  },

  methods: {
    ...mapActions({
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      getDoctors: 'doctors/getDoctors',
    }),

    save() {
      this.addToCurrentAppointment(this.form)
      this.$router.push({ name: 'AppointmentPayment' })
    },
  },
}
</script>
