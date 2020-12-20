<template>
  <EditableCard title="Emergency Contact">
    <div>
      <div class="grid grid-cols-2 gap-6 text-xs my-5 w-full">
        <div>
            <p class="text-secondary text-xs mb-1">First name</p>
            <p class="text-xs font-bold">{{ $faker().name.firstName() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1">Last name</p>
            <p class="text-xs font-bold">{{ patient.emergency_contact.name.split(' ')[1] }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1">Phone Number</p>
            <p class="text-xs font-bold">{{ patient.emergency_contact.phone }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1 capitalize">Place of work</p>
            <p class="text-xs font-bold">{{ $faker().lorem.word() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1">Address</p>
            <p class="text-xs font-bold">{{ $faker().address.streetAddress() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1 lowercase">Relationship Type</p>
            <p class="text-xs font-bold">Brother</p>
        </div>
      </div>
    </div>
  </EditableCard>
</template>

<script>
import EditableCard from '@/components/ui/EditableCard'
export default {
  name: 'PatientEmergencyContactCard',

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
