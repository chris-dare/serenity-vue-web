<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <div>
        <p class="mb-1 font-bold text-xl mt-4">Welcome, Dr. Grey Strep.</p>
        <p class="mb-6">
          Please setup your location and department to get started
        </p>
        <cv-select
          v-model="form.location"
          label="Where are you now?"
          class="se-custom-input mb-8"
        >
          <cv-select-option disabled selected hidden>Location</cv-select-option>
          <cv-select-option value="network"
            >Airport Residential</cv-select-option
          >
        </cv-select>
        <cv-select
          v-model="form.location"
          label="Which clinic would you like to start in?"
          class="se-custom-input mb-8"
        >
          <cv-select-option disabled selected hidden
            >Choose an option</cv-select-option
          >
          <cv-select-option value="network"
            >Airport Residential</cv-select-option
          >
        </cv-select>
        <div class="mb-8">
          <div class="bx--label">Are you on shift now?</div>
          <cv-radio-group vertical>
            <cv-radio-button
              name="group-1"
              label="Yes"
              value="yes"
              v-model="form.check"
            />
            <cv-radio-button
              name="group-1"
              label="No"
              value="no"
              v-model="form.check"
            />
          </cv-radio-group>
        </div>
        <div class="mb-8">
          <div class="bx--label">When is your shift ending?</div>
          <DateTimePicker v-model="form.date" />
        </div>
        <SeButton @click="visible = !visible" full label="Get Started" />
      </div>
    </template>
  </cv-modal>
</template>

<script>
// import Diagnostic from '@carbon/icons-vue/es/microscope/32'
export default {
  name: 'GetStartedModal',

  //   components: {Diagnostic},

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {},
    }
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
