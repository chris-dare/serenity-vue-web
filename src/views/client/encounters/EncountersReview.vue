<template>
  <div class="relative h-full flex flex-col pb-6">
    <div class="space-y-8 divide-y divide-solid divide-subtle flex-1">
      <p class="font-semibold">Patient Review</p>
      <EncounterDetails ref="detail" />
    </div>

    <div class="flex justify-end space-x-2 fixed bottom-4 right-4">
      <SeButton @click="save">Save All and Go To Diagnosis</SeButton>
    </div>
  </div>
</template>

<script>
import EncounterDetails from '@/components/patients/encounters/EncounterDetails'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'EncountersReview',

  components: { EncounterDetails },

  data() {
    return {
      icon: ChevronRight,
    }
  },

  beforeDestroy() {
    if (!this.$refs.detail) return
    this.$refs.detail.saveAll()
  },

  methods: {
    save() {
      this.$router.push({ name: 'EncounterDiagnosis', params: { id: this.$route.params.id } })
    },
  },
}
</script>
