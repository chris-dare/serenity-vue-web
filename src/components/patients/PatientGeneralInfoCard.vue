<template>
  <EditableCard title="General Information">
    <div>
      <div class="flex my-2">
        <div>
            <p class="text-3xl font-bold text-serenity-primary">AB+</p>
            <p class="text-gray-400 text-xs">Blood type</p>
        </div>
        <div class="mx-5">
            <p class="text-3xl font-bold text-serenity-primary">
            {{ patient.weight }}kg
            </p>
            <p class="text-gray-400 text-xs">Weight</p>
        </div>
        <div>
            <p class="text-3xl font-bold text-serenity-primary">
            {{ patient.height }}cm
            </p>
            <p class="text-gray-400 text-xs">Height</p>
        </div>
      </div>
      <div class="h-px w-full bg-serenity-light-gray my-5"></div>
      <div class="grid grid-cols-2 gap-6 text-xs my-5">
        <div>
            <p class="text-gray-400 text-xs mb-1">Date of Birth</p>
            <p class="text-xs font-bold">{{ patient.dob }}</p>
        </div>
        <div>
            <p class="text-gray-400 text-xs mb-1">Phone Number</p>
            <p class="text-xs font-bold">{{ patient.phone }}</p>
        </div>
        <div>
            <p class="text-gray-400 text-xs mb-1">Address</p>
            <p class="text-xs font-bold">{{ patient.address }}</p>
        </div>
        <div>
            <p class="text-gray-400 text-xs mb-1">Email</p>
            <p class="text-xs font-bold">{{ patient.email }}</p>
        </div>
      </div>
    </div>
  </EditableCard>
</template>

<script>
import EditableCard from '@/components/ui/EditableCard'
export default {
  name: 'PatientGeneralInfoCard',

  components: {
    EditableCard,
  },

  props: {
    patient: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style></style>
