<template>
  <div
    class="flex justify-between items-center hover:bg-serenity-subtle-border p-4 cursor-pointer"
    :class="{ 'bg-serenity-subtle-border': doctor.id === localValue.id }"
    @click="localValue = doctor"
  >
    <InfoImageBlock
      :label="fullName"
      :description="specialties"
    />
    <p>{{ slot }}</p>
    <div>
      <CheckmarkFilled
        class="w-5 h-5 text-serenity-primary"
        :class="[doctor.id === localValue.id ? 'text-serenity-primary' : 'text-secondary']"
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
      if (!this.doctor.practitioner) return ''
      return `${this.doctor.practitioner.title || ''} ${this.doctor.practitioner.first_name || ''} ${this.doctor.practitioner.last_name || ''}`
    },

    specialties() {
      if (!this.doctor.practitioner) return ''
      return this.doctor.practitioner.practitioner_specialty.join(', ')
    },

    slot() {
      return `${this.$date.formatDate(this.doctor.start, 'hh:mm a')} - ${this.$date.formatDate(this.doctor.end, 'hh:mm a')}`
    },
  },
}
</script>
