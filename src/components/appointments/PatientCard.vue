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
