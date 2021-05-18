<template>
  <Dropdown
    :visible.sync="visible"
    with-shadow
  >
    <cv-button
      slot="label"
      size="field"
      kind="primary"
      class="px-4 bg-black hover:bg-black mr-2"
      @click="visible = !visible"
    >
      Add new
      <img
        src="@/assets/img/chevron--sort--down 1.svg"
        class="ml-2"
        alt=""
      >
    </cv-button>
    <div class="w-52 bg-white">
      <div
        v-for="(option, index) in options"
        :key="index"
        :to="{ name: option.path }"
        tag="div"
        @click="onClick(option)"
      >
        <div
          v-if="!option.permission || $userCan(option.permission)"
          class="flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer"
        >
          <p :class="{'text-orange text-lg': option.noIcon}">{{ option.label }}</p>
          <div
            v-if="!option.noIcon"
            class="flex justify-center items-center rounded-full h-4 w-4 mr-3"
            :class="option.color"
          >
            <component
              :is="option.component"
              class="w-3 h-3 text-black"
            />
          </div>
        </div>
      </div>
    </div>
  </Dropdown>
</template>

<script>
import HealthCross from '@carbon/icons-vue/es/health-cross/32'
import Microscope from '@carbon/icons-vue/es/microscope/32.js'
import Medication from '@carbon/icons-vue/es/medication/32.js'
import DicomOverlay from '@carbon/icons-vue/es/watson-health/dicom--overlay/32'
import StudySkip from '@carbon/icons-vue/es/watson-health/study--skip/32'
import Cursor32 from '@carbon/icons-vue/es/watson-health/3D-cursor--alt/32'

export default {
  name: 'AddNewDropdown',

  components: { HealthCross, Microscope, Medication, DicomOverlay, StudySkip, Cursor32 },

  data() {
    return {
      visible: false,
      admitModal: false,
    }
  },

  computed: {
    options() {
      return [
        // {
        //   label: 'Admit Patient',
        //   component: 'Cursor32',
        //   color: 'bg-tetiary',
        //   slug: 'admit',
        //   permission: null,
        //   hide: this.workspaceType === 'IPD',
        // },
        {
          label: 'Capture vitals',
          component: 'HealthCross',
          color: 'bg-tetiary',
          path: { name: 'Vitals', query: {id: this.$route.params.id} },
          permission: 'vitals.write',
        },
        {
          label: 'Diagnostic test',
          component: 'Microscope',
          color: 'bg-tetiary',
          slug: 'test',
          permission: null,
        },
        {
          label: 'Medication',
          component: 'Medication',
          color: 'bg-tetiary',
          slug: 'medication:request',
          permission: 'medication.orders.write',
        },
        {
          label: 'Note',
          component: 'DicomOverlay',
          color: 'bg-tetiary',
          slug: 'notes',
          permission: null,
        },
        {
          label: 'Referral',
          component: 'StudySkip',
          color: 'bg-tetiary',
          path: { name: 'Vitals', query: {id: this.$route.params.id} },
          permission: null,
        },
        {
          label: 'Mark as deceased',
          noIcon: true,
          slug: 'deceased',
          permission: null,
        },
      ]
    },
  },

  methods: {
    onClick(option) {
      if (option.path) {
        this.$router.push(option.path)
        return
      } else {
        this.$trigger(`profile:${option.slug}:open`)
      }
      this.visible = false
    },
  },
}
</script>
