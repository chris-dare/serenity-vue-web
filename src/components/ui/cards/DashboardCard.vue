<template>
  <div
    class="w-full h-40 px-4 py-6 cursor-pointer"
    :class="[customClass, isSelected ? 'bg-serenity-primary' : '']"
    @click="$emit('click')"
  >
    <component
      :is="details.type"
      class="w-7 h-7"
      :class="[isSelected ? 'text-white' : 'text-serenity-primary']"
    />
    <p
      class="mt-4"
      :class="[
        isSelected ? 'text-white font-semibold' : 'text-secondary',
        details.description ? 'text-white' : 'text-secondary',
      ]"
    >
      {{ details.label }}
    </p>
    <p
      class="text-3xl font-bold"
      :class="[isSelected ? 'text-white' : 'text-black']"
    >
      {{ details.value }}
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
import Stethoscope from '@carbon/icons-vue/es/stethoscope/32'
import Reference from '@carbon/icons-vue/es/watson-health/cross-reference/32'
import Indentification from '@carbon/icons-vue/es/identification/32'
import Calendar from '@carbon/icons-vue/es/calendar/32'
import Add from '@carbon/icons-vue/es/add/32'
import User from '@carbon/icons-vue/es/user/32'
import Download from '@carbon/icons-vue/es/download/32'
import Cross from '@carbon/icons-vue/es/health-cross/32'
import Categories from '@carbon/icons-vue/es/categories/32'

export default {
  name: 'DashboardCard',

  components: {
    Stethoscope,
    Reference,
    Indentification,
    Calendar,
    Add,
    User,
    Download,
    Cross,
    Categories,
  },

  props: {
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
}
</script>
