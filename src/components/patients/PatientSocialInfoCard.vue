<template>
  <EditableCard title="Social Information">
    <div>
      <div class="grid grid-cols-2 gap-6 text-xs my-5 w-full">
        <div>
            <p class="text-secondary text-xs mb-1">Marital Status</p>
            <p class="text-xs font-bold">{{ $faker().lorem.word() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1">Religion</p>
            <p class="text-xs font-bold">{{ $faker().lorem.word() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1">Language</p>
            <p class="text-xs font-bold">{{ $faker().lorem.word() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1 capitalize">Occupation</p>
            <p class="text-xs font-bold">{{ $faker().lorem.word() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1">Company/Employer</p>
            <p class="text-xs font-bold">{{ $faker().lorem.word() }}</p>
        </div>
        <div>
            <p class="text-secondary text-xs mb-1 lowercase">Office Number</p>
            <p class="text-xs font-bold">{{ $faker().phone.phoneNumber() }}</p>
        </div>
      </div>
    </div>
  </EditableCard>
</template>

<script>
import EditableCard from '@/components/ui/EditableCard'
export default {
  name: 'PatientSocialInfoCard',

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
