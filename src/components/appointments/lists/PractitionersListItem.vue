<template>
  <div
    class="flex justify-between items-center hover:bg-gray-100 p-4 cursor-pointer"
    :class="{ 'bg-gray-100': doctor.id === localValue.id }"
    @click="localValue = doctor"
  >
    <InfoImageBlock
      :label="$utils.formatName(doctor.fullName)"
      :description="specialties"
    />

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
  name: 'PractionersListItem',

  mixins: [modelMixin],

  props: {
    doctor: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    specialties() {
      if (!this.doctor?.practitioner_specialty) return ''
      return this.doctor.practitioner_specialty.join(', ')
    },
  },
}
</script>
