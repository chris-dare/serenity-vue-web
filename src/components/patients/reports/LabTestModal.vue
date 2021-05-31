<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="sm"
  >
    <template slot="content">
      <div class="flex items-center justify-between mb-6 w-full">
        <p>Laboratory Test Result</p>
      </div>
      <div>
        <div class="grid grid-cols-2 gap-8 border-b border-solid border-subtle pb-6">
          <div>
            <p class="text-secondary mb-1">Test requested</p>
            <p class="text-serenity-primary">
              Full Blood Count, Fasting Blood Sugar
            </p>
          </div>
          <div>
            <p class="text-secondary mb-1">Encounter</p>
            <p>
              Nov. 10, 2020
              <span
                class="text-serenity-primary ml-1 underline"
              >View encounter</span>
            </p>
          </div>
          <div>
            <p class="text-secondary mb-1">Date requested</p>
            <p>Nov. 10, 2020</p>
          </div>
          <div>
            <p class="text-secondary mb-1">Date Completed</p>
            <p>Nov. 10, 2020</p>
          </div>
          <div>
            <p class="mb-1 text-secondary">Prescribed by</p>
            <div class="flex items-center py-2">
              <img
                class="w-10 h-10 rounded-full mr-3"
                src="@/assets/img/user 1.svg"
                alt=""
              >
              <div>
                <p>{{ 'Chris Dare' }}</p>
                <p class="text-secondary text-xs">
                  General Practitioner
                </p>
              </div>
            </div>
          </div>
          <div>
            <p class="mb-1 text-secondary">Performed by</p>
            <div class="flex items-center py-2">
              <img
                class="w-10 h-10 rounded-full mr-3"
                src="@/assets/img/user 1.svg"
                alt=""
              >
              <div>
                <p>{{ 'Chris Dare' }}</p>
                <p class="text-secondary text-xs">
                  General Practitioner
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-6">
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">Fasting blood sugar:</p>
            <p>85 mg/dl</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">85 mg/dl</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-success rounded-full mr-2" />
              <p>Normal</p>
            </div>
          </div>
          <p class="col-span-2 text-secondary">Full blood count</p>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">Red blood cells:</p>
            <p>5.12 cells/mcl</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">4.32—5.72</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-success rounded-full mr-2" />
              <p>Normal</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">Hemoglobin:</p>
            <p>127 grams/L</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">135—175</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-warning rounded-full mr-2" />
              <p>Low</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">Hematocrit:</p>
            <p>5.12 cells/mcl</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">4.32—5.72</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-success rounded-full mr-2" />
              <p>Normal</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">White blood cells:</p>
            <p>5.12 cells/mcl</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">4.32—5.72</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-success rounded-full mr-2" />
              <p>Normal</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">Platelet count:</p>
            <p>5.12 cells/mcl</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-secondary">4.32—5.72</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-success rounded-full mr-2" />
              <p>Normal</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mt-8 flex items-center">
        <SeButton variant="white">Close</SeButton>
        <SeButton variant="secondary">Repeat this test</SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'LabTestModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
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
