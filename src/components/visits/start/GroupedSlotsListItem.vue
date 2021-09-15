<template>
  <div class="border-t border-gray-300 border-solid my-4 py-4">
    <div class="space-y-4">
      <InfoImageBlock
        :label="doctor.practitioner_name"
        :description="doctor.phone"
        label-class="text-black font-semibold"
        description-class="text-sm"
      />
      <p>Available times</p>
      <div class="grid grid-cols-8 gap-2">
        <div
          v-for="(slot, index) in slots"
          :key="index"
          class="text-placeholder bg-gray-100 py-3 flex items-center justify-center cursor-pointer"
          @click="localValue.slot = slot"
        >
          {{ $date.formatDate(slot.start, 'HH:mm') }}
        </div>
      </div>
      <div class="flex justify-end">
        <SeButton
          :loading="loading"
          @click="addToQueue"
        >
          Add to doctors queue
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'GroupedSlotsListItem',

  mixins: [modelMixin],

  props: {
    doctor: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      icon: ChevronRight,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
    }),

    slots() {
      return this.$date.sortByDate(this.doctor.slots, 'start')
    },
  },

  methods: {
    ...mapActions({
      createVisit: 'visits/createVisit',
    }),

    async addToQueue() {
      try {
        this.loading = true
        await this.createVisit({
          patient: this.localValue.patient.id,
          status: 'waitlist',
          assigned_to: this.doctor.practitioner_role,
          visit_class: 'ambulatory',
          arrived_at: this.$date.queryNow(),
          service_provider: this.provider.id,
        })
        this.$toast.open({ message: 'This patient has been added to the doctor\'s queue' })
        this.loading = false
        this.$emit('close')
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
