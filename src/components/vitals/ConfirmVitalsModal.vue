<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <div>
        <p class="mb-2">Confirm Vitals Submission</p>
        <div class="space-y-3">
          <div class="space-y-1">
            <p class="text-secondary">Height (cm):</p>
            <p class="text-black">{{ form.height || 0 }} cm</p>
          </div>
          <div class="space-y-1">
            <p class="text-secondary">Weight (kg):</p>
            <p class="text-black">{{ form.weight || 0 }} kg</p>
          </div>
          <div class="space-y-1">
            <p class="text-secondary">(Calculated) BMI:</p>
            <p class="text-black">{{ form.bmi || 0 }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-secondary">Temperature (C):</p>
            <p class="text-black">{{ form.temperature || 0 }} °C</p>
          </div>
          <div class="space-y-1">
            <p class="text-secondary">Pulse:</p>
            <p class="text-black">{{ form.pulse || 0 }} /min</p>
          </div>
          <div class="space-y-1">
            <p class="text-secondary">Respiratory rate:</p>
            <p class="text-black">{{ form.respiration_rate || 0 }} /min</p>
          </div>
          <div class="space-y-1">
            <p class="text-secondary">Blood Pressure:</p>
            <p class="text-black">{{ form.systolic || 0 }} /{{ form.diastolic || 0 }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-secondary">Arterial blood oxygen saturation:</p>
            <p class="text-black">{{ form.saturation || 0 }} %</p>
          </div>
        </div>
        <div class="flex items-center justify-center flex-col">
          <cv-button
            kind="primary"
            @click="$router.push({ name: 'Patients' })"
            class="my-3 flex items-center justify-center bg-black text-white px-12 w-full hover:bg-black"
            full
            >Save vital information</cv-button
          >
          <cv-button
            class="border-black flex items-center justify-center mb-3 px-12 text-black hover:text-white focus:text-white focus:bg-black hover:bg-black w-full"
            kind="tertiary"
            full
            @click="modalVisible = !modalVisible"
            >Back to vital information</cv-button
          >
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'ConfirmVitalsModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    form: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>
