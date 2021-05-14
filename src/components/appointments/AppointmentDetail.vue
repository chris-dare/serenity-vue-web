<template functional>
  <div class="divide-y divide-solid divide-subtle">
    <div
      class="py-6"
    >
      <p class="text-secondary mb-4">Patient</p>
      <div
        v-if="props.appointment.patient"
        class="grid gap-4 items-center"
      >
        <div class="col-span-3">
          <InfoImageBlock
            :label="props.appointment.patient.fullName"
            :description="props.appointment.patient.phone"
            label-class="text-black font-semibold"
            description-class="text-sm"
          />
        </div>
        <div v-if="props.editable">
          <router-link
            tag="div"
            :to="{name: 'SelectPatient'}"
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
        v-if="props.appointment.service"
        class="grid grid-cols-7 gap-4"
      >
        <div class="flex items-center col-span-6">
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
          >
            <Diagnostic class="w-7 h-7 text-white" />
          </div>
          <div class="space-y-1">
            <p class="text-black font-semibold">{{ props.appointment.service.categories }}</p>
            <p class="text-secondary text-sm">
              Service:
              <span class="text-primary">{{ props.appointment.service.healthcare_service_name }}</span>
            </p>
            <p
              v-if="props.appointment.service_tier"
              class="text-secondary text-sm"
            >
              Price: <span class="text-primary">{{ props.appointment.service_tier.label }}</span>
            </p>
          </div>
        </div>
        <div v-if="props.editable">
          <router-link
            tag="div"
            :to="{name: 'ClinicsServices'}"
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
        v-if="props.appointment.slot"
        class="flex items-center"
      >
        <div
          class="w-12 h-12 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
        >
          <ImageBlock
            :alt="props.appointment.practitioner.fullName"
            custom-class="w-12 h-12"
          />
        </div>
        <div class="space-y-1">
          <p class="text-black font-semibold">{{ props.appointment.service.categories }}</p>
          <p class="text-secondary text-sm">
            {{ props.appointment.practitioner.role }}
          </p>
          <p
            v-if="props.appointment.service_tier"
            class="text-secondary text-sm"
          >
            Appointment time: <span class="text-primary">{{ props.appointment.slot.date }}, {{ props.appointment.slot.slot }}</span>
          </p>
        </div>
        <div v-if="props.editable">
          <router-link
            tag="div"
            :to="{name: 'DateDoctor'}"
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
          <p>{{ props.appointment.comment || '-' }}</p>
        </div>
        <div v-if="props.editable">
          <router-link
            tag="div"
            :to="{name: 'AppointmentNotes'}"
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
    <div
      v-if="props.appointment.isCancelled"
      class="py-6"
    >
      <p class="text-secondary mb-2">Cancellation Reason:</p>
      <div class="grid grid-cols-7 gap-4">
        <div class="flex items-center col-span-6">
          <p>{{ props.appointment.cancelationReason }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
