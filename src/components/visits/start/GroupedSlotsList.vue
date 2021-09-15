<template>
  <div class="h-72 overflow-y-auto">
    <cv-data-table-skeleton
      v-if="loading"
      :columns="2"
      :rows="2"
    />

    <p v-else-if="hasNoData">No available doctors</p>

    <div v-else-if="hasSlot">
      <SlotListItem
        v-model="localValue.slot"
        :doctor="localValue.slot"
      />

      <div class="flex justify-end mt-4">
        <SeButton @click="localValue.slot = {}">Change slot</SeButton>
      </div>
    </div>

    <div v-else>
      <p>Select a doctor for the apointment</p>
      <GroupedSlotsListItem
        v-for="(doctor, index) in doctors"
        :key="index"
        v-model="localValue"
        :doctor="doctor"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
import GroupedSlotsListItem from '@/components/visits/start/GroupedSlotsListItem'
import SlotListItem from '@/components/appointments/lists/SlotListItem'
import modelMixin from '@/mixins/model'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'GroupedSlotsList',

  components: { GroupedSlotsListItem, SlotListItem },

  mixins: [modelMixin],

  props: {
    doctors: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasNoData() {
      return isEmpty(this.localValue.slot) && !this.doctors.length && !this.loading
    },

    hasSlot() {
      return !isEmpty(this.localValue.slot) && !this.loading
    },
  },
}
</script>
