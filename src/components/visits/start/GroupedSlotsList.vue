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

    <div
      v-else
      class="space-y-6"
    >
      <p>Select a doctor for the apointment</p>
      <Search
        v-model="search"
        placeholder="Search doctor"
      />
      <p v-if="hasNoFilteredData">No available doctors</p>
      <GroupedSlotsListItem
        v-for="(doctor, index) in filteredDoctors"
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

  data() {
    return {
      search: '',
    }
  },

  computed: {
    hasNoData() {
      return isEmpty(this.localValue.slot) && !this.doctors.length && !this.loading
    },

    hasSlot() {
      return !isEmpty(this.localValue.slot) && !this.loading
    },

    filteredDoctors() {
      return this.$utils.getFilteredData(this.doctors, this.search, ['practitioner_name'])
    },

    hasNoFilteredData() {
      return this.filteredDoctors.length === 0
    },
  },
}
</script>
