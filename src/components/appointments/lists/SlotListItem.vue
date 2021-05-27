<template>
  <div
    class="flex justify-between items-center hover:bg-gray-100 p-4 cursor-pointer"
    :class="{ 'bg-gray-100': doctor.id === localValue.id }"
    @click="localValue = doctor"
  >
    <InfoImageBlock
      :label="fullName"
      :description="specialties"
    />
    <p>{{ slot }}</p>
    <div>
      <CheckmarkFilled
        class="w-5 h-5"
        :class="[doctor.id === localValue.id ? 'text-serenity-primary' : 'text-transparent']"
      />
    </div>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'

export default {
  name: 'SlotListItem',

  mixins: [modelMixin],

  props: {
    doctor: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    fullName() {
      if (this.doctor.practitioner_name) return this.doctor.practitioner_name
      if (!this.doctor.practitioner) return ''
      if (this.doctor.practitioner.fullName) return this.doctor.practitioner.fullName

      return `${this.doctor.practitioner.title || ''} ${this.doctor.practitioner.first_name || ''} ${this.doctor.practitioner.last_name || ''}`
    },

    specialties() {
      if (!this.doctor.practitioner?.practitioner_specialty) return ''
      return this.doctor.practitioner.practitioner_specialty.join(', ')
    },

    slot() {
      return `${this.$date.formatDate(this.doctor.start, 'hh:mm a')} - ${this.$date.formatDate(this.doctor.end, 'hh:mm a')}`
    },
  },
}
</script>
