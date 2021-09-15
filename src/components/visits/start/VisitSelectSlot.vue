<template>
  <SeForm class="space-y-4">
    <p class="text-primary font-semibold">
      What time would the patient want to see the doctor?
    </p>
    <div>
      <SeButton
        :icon="time"
        :loading="loading"
        @click="getNextSlot"
      >
        Give me the next time slot
      </SeButton>
    </div>
    <div>
      <GroupedSlotsList
        v-model="localValue"
        :loading="loading"
        :doctors="slots"
        v-on="$listeners"
      />
    </div>
  </SeForm>
</template>

<script>
import GroupedSlotsList from '@/components/visits/start/GroupedSlotsList'
import { mapGetters, mapActions } from 'vuex'
import Time from '@carbon/icons-vue/es/time/16'
import modelMixin from '@/mixins/model'

export default {
  name: 'VisitSelectSlot',

  components: {GroupedSlotsList},

  mixins: [modelMixin],

  data() {
    return {
      time: Time,
      loading: false,
    }
  },

  computed: {
    ...mapGetters({
      availableSlots: 'appointments/availableSlots',
      slots: 'appointments/slots',
      practitioners: 'practitioners/practitioners',
    }),
  },

  watch: {
    localValue() {
      if (!this.slots.length) {
        this.filter()
      }
    },
  },

  created() {
    if (!this.localValue.service) {
      this.$emit('previous')
      return
    }
    this.filter()
  },

  methods: {
    ...mapActions({
      getSlots: 'appointments/getAvailableDoctors',
      getNextAvailableSlot: 'appointments/getNextAvailableSlot',
    }),

    async getNextSlot() {
      this.loading = true
      try {
        const slot = await this.getNextAvailableSlot({
          healthcareservice_id: this.localValue.service.id,
          date: this.$date.formatDate(Date.now(), 'yyyy-MM-dd'),
        })
        this.localValue.slot = slot
        this.loading = false

      } catch (error) {
        this.loading = false

      }
      this.loading = false

    },

    async filter() {
      const filters = this.convertFromDatePickerFormat(this.$date.userNow())
      await this.getSlots({ healthcareservice: this.localValue.service.id, ...filters })
    },

    convertFromDatePickerFormat(val) {
      return {
        start__gt: val,
        end__lt: this.$date.formatDate(this.$date.endOfDate(val), 'yyyy-MM-dd\'T\'HH:mm:ssxxx'),
      }
    },
  },
}
</script>
