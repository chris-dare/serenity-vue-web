<template>
  <Dropdown :visible.sync="visible" with-shadow>
    <cv-button
      size="field"
      kind="primary"
      class="px-4 bg-black hover:bg-black mr-2"
      @click="visible = !visible"
      slot="label"
    >
      Add new
      <img src="@/assets/img/chevron--sort--down 1.svg" class="ml-2" alt="" />
    </cv-button>
    <div class="w-52 bg-white">
      <router-link
        class="flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer"
        v-for="(option, index) in options"
        :key="index"
        @click="visible = !visible"
        :to="{name: option.path}"
        tag="div"
      >
        <p>{{ option.label }}</p>
        <div
          class="flex justify-center items-center rounded-full h-4 w-4 mr-3"
          :class="option.color"
        >
          <component :is="option.component" class="w-3 h-3 text-black" />
        </div>
      </router-link>
    </div>
  </Dropdown>
</template>

<script>
import HealthCross from '@carbon/icons-vue/es/health-cross/32'
import Microscope from '@carbon/icons-vue/es/microscope/32.js'
import Medication from '@carbon/icons-vue/es/medication/32.js'
import DicomOverlay from '@carbon/icons-vue/es/watson-health/dicom--overlay/32'
import StudySkip from '@carbon/icons-vue/es/watson-health/study--skip/32'

export default {
  name: 'AddNewDropdown',

  components: { HealthCross, Microscope, Medication, DicomOverlay, StudySkip },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    options() {
      return [
        {
          label: 'Vitals Information',
          component: 'HealthCross',
          color: 'bg-tetiary',
          path: 'Vitals',
        },
        {
          label: 'Diagnostic test',
          component: 'Microscope',
          color: 'bg-tetiary',
          path: 'Vitals',
        },
        {
          label: 'Medication',
          component: 'Medication',
          color: 'bg-tetiary',
          path: 'Vitals',
        },
        {
          label: 'Note',
          component: 'DicomOverlay',
          color: 'bg-tetiary',
          path: 'Vitals',
        },
        {
          label: 'Referral',
          component: 'StudySkip',
          color: 'bg-tetiary',
          path: 'Vitals',
        },
      ]
    },
  },
}
</script>
