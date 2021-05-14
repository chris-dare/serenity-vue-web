<template>
  <div
    class="w-56 h-40  px-4 py-6 mr-4 cursor-pointer"
    :class="[customClass, isSelected ? 'bg-serenity-primary': '']"
    @click="$emit('click')"
  >
    <component
      :is="currentIconComponent"
      class="w-7 h-7"
      :class="[isSelected ? 'text-white' : 'text-serenity-primary']"
    />
    <p
      class="mt-4 mb-3 font-semibold"
      :class="[isSelected ? 'text-white' : 'text-primary']"
    >
      {{ details.label }}
    </p>
    <p
      class="text-xs"
      :class="[isSelected ? 'text-white' : 'text-secondary']"
    >
      {{ details.description }}
    </p>
  </div>
</template>

<script>
import Search from '@carbon/icons-vue/es/search/32'
import Newpatient from '@carbon/icons-vue/es/watson-health/download-study/32'
import Inpatient from '@carbon/icons-vue/es/watson-health/study--next/32'
import Outpatient from '@carbon/icons-vue/es/watson-health/study--previous/32'
import Virtualcare from '@carbon/icons-vue/es/video--chat/32'
import Schedule from '@carbon/icons-vue/es/event--schedule/32'
import Book from '@carbon/icons-vue/es/watson-health/contour-finding/32'
import Home from '@carbon/icons-vue/es/home/32'
import Diagnostic from '@carbon/icons-vue/es/microscope/32'
import Cash from '@carbon/icons-vue/es/money/32'
import Momo from '@carbon/icons-vue/es/wallet/32'
import Card from '@carbon/icons-vue/es/purchase/32'
import Insurance from '@carbon/icons-vue/es/keep-dry/32'
import Destination from '@carbon/icons-vue/es/purchase/32'
import User from '@carbon/icons-vue/es/user/32'
import Security from '@carbon/icons-vue/es/security/32'
import Lab from '@carbon/icons-vue/es/chemistry/32'
import Medication from '@carbon/icons-vue/es/medication/32'
import Reference from '@carbon/icons-vue/es/watson-health/cross-reference/32'
import Care from '@carbon/icons-vue/es/airline--passenger-care/32'
import Followup from '@carbon/icons-vue/es/arrow--down-right/32'
import Referral from '@carbon/icons-vue/es/airline--manage-gates/32'

export default {
  name: 'PatientCard',

  components: {
    Search,
    Newpatient,
    Inpatient,
    Outpatient,
    Virtualcare,
    Home,
    Diagnostic,
    Cash,
    Momo,
    Card,
    Insurance,
    Schedule,
    Book,
    Destination,
    User,
    Security,
    Lab,
    Medication,
    Reference,
    Care,
    Followup,
    Referral,
  },

  props: {
    type: {
      type: String,
      default: 'search',
    },

    details: {
      type: Object,
      default: () => {},
    },

    isSelected: {
      type: Boolean,
      default: false,
    },

    customClass: {
      type: String,
      default: 'border border-subtle border-solid',
    },
  },

  computed: {
    currentIconComponent() {
      return this.capitalizeFirstLetter(this.type)
    },
  },

  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>
