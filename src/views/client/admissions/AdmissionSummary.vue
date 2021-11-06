<template>
  <MultiStepBase
    :icon="icon"
    next-label="Record Admission"
    :previous="previous"
    :query="$route.query"
    @cancel="cancel"
    @save="reRoute"
  >
    <div>
      <div class="divide-y divide-solid divide-subtle">
        <div
          class="py-6"
        >
          <p class="text-secondary mb-4">Patient</p>
          <div
            v-if="appointment.patient"
            class="grid gap-4 items-center"
          >
            <div class="col-span-3">
              <InfoImageBlock
                :label="$utils.formatName(appointment.patient.fullName)"
                :description="appointment.patient.phone"
                label-class="text-black font-semibold"
                description-class="text-sm"
              />
            </div>
            <div v-if="editable">
              <router-link
                tag="div"
                :to="{name: 'AdmissionSelectPatient'}"
                class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
              >
                <img
                  src="@/assets/img/edit 1.svg"
                  class="w-4 h-4"
                >
              </router-link>
            </div>
          </div>
          <p v-else>No patient selected</p>
        </div>
        <div
          class="py-6"
        >
          <p class="text-secondary mb-4">Clinic and Services</p>
          <div
            v-if="appointment.service"
            class="grid grid-cols-7 gap-4"
          >
            <div class="flex items-center col-span-6">
              <div
                class="w-12 h-12 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
              >
                <Diagnostic class="w-7 h-7 text-white" />
              </div>
              <div class="space-y-1">
                <p class="text-black font-semibold">{{ appointment.service.categories }}</p>
                <p class="text-secondary text-sm">
                  Service:
                  <span class="text-primary">{{ appointment.service.healthcare_service_name }}</span>
                </p>
                <p
                  v-if="appointment.service_tier"
                  class="text-secondary text-sm"
                >
                  Price: <span class="text-primary">{{ appointment.service_tier.label }}</span>
                </p>
              </div>
            </div>
            <div v-if="editable">
              <router-link
                tag="div"
                :to="{ name: 'AdmissionPricing' }"
                class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
              >
                <img
                  src="@/assets/img/edit 1.svg"
                  class="w-4 h-4"
                >
              </router-link>
            </div>
          </div>
          <p v-else>No service selected</p>
        </div>
        <div class="py-6">
          <p class="text-secondary mb-4">Date and Doctor</p>
          <div
            v-if="appointment.slot"
            class="flex items-center"
          >
            <div
              class="w-12 h-12 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
            >
              <ImageBlock
                :alt="appointment.slot.practitioner_name ? appointment.slot.practitioner_name : appointment.practitioner.fullName"
                custom-class="w-12 h-12"
              />
            </div>
            <div class="space-y-1">
              <p class="text-black font-semibold">{{ appointment.slot.practitioner_name ? appointment.slot.practitioner_name : appointment.practitioner.fullName }}</p>
              <p
                v-if="appointment.practitioner"
                class="text-secondary text-sm"
              >
                {{ appointment.practitioner ? appointment.practitioner.role : appointment.slot.practitioner.role }}
              </p>
              <p
                v-if="appointment.service_tier"
                class="text-secondary text-sm"
              >
                Appointment time: <span
                  v-if="appointment.slot.slot"
                  class="text-primary"
                >{{ appointment.slot.date }}, {{ appointment.slot.slot }}</span>
                <span
                  v-else
                  class="text-primary"
                >{{ $date.formatDate(appointment.slot.start, 'dd/MM, hh:mm a') }}</span>
              </p>
            </div>
            <div v-if="editable">
              <router-link
                tag="div"
                :to="{name: 'AdmissionDetails'}"
                class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
              >
                <img
                  src="@/assets/img/edit 1.svg"
                  class="w-4 h-4"
                >
              </router-link>
            </div>
          </div>
          <p v-else>No date and doctor selected</p>
        </div>
        <div class="py-6">
          <p class="text-secondary mb-2">Appointment notes:</p>
          <div class="grid grid-cols-7 gap-4">
            <div class="flex items-center col-span-6">
              <p>{{ appointment.comment || '-' }}</p>
            </div>
            <div v-if="editable">
              <router-link
                tag="div"
                :to="{name: 'AdmissionNotes'}"
                class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
              >
                <img
                  src="@/assets/img/edit 1.svg"
                  class="w-4 h-4"
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AdmissionSummary',

  mixins: [MultiStep],

  data() {
    return {
      form: {},
      icon: ChevronRight,
      next: this.$route.meta.next,
      parent: this.$route.meta.parent,
      previous: this.$route.meta.previous,
      selected: '',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
    }),
  },

  validations: {
    form: {
      patient: { minLength: minLength(1), required  },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
    }),

    onClick(type) {
      if (type.value === 'existing') {
        this.selected = type.value
      } else {
        this.$router.push({ name: 'Biodata', query: { reroute: true } })
      }
      
    },
  },
}
</script>
