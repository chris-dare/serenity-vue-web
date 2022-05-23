<template>
  <cv-side-nav
    id="side-nav"
    class="bg-serenity-primary max-w-xl transition-all duration-50 overflow-y-auto overflow-x-hidden"
    :class="[open ? 'w-56' : 'w-12']"
  >
    <div
      v-for="(item, index) in navItems"
      :key="index"
    >
      <p
        v-if="item.group_by && open"
        class="pl-4 mb-1 mt-6 text-green-100 uppercase text-xs flex items-center"
      >
        {{ item.group_by }}
      </p>
      <AppNavItem
        :to="{ name: item.to }"
        :label="item.label"
      >
        <div class="flex items-center space-x-3 pl-4 text-white transition-all duration-50">
          <component
            :is="item.component"
            class="w-5 h-5 text-white"
          />
          <span v-if="open">{{ item.label }}</span>
        </div>
      </AppNavItem>
    </div>

    <!-- <div
      class="absolute bottom-0 p-2"
      :class="[open ? 'visible' : 'invisible']"
    >
      <p class="text-white">Internet speed {{ speed }}</p>
    </div> -->
  </cv-side-nav>
</template>

<script>
import Template from '@carbon/icons-vue/es/template/16'
import Cross from '@carbon/icons-vue/es/health-cross/16'
import Reference from '@carbon/icons-vue/es/watson-health/cross-reference/16'
import List from '@carbon/icons-vue/es/list/16'
import Events from '@carbon/icons-vue/es/events/16'
import Settings from '@carbon/icons-vue/es/settings/16'
import Baggage from '@carbon/icons-vue/es/shopping--bag/16'
import Insurance from '@carbon/icons-vue/es/umbrella/16'
import Schedule from '@carbon/icons-vue/es/event--schedule/16'
import Notification from '@carbon/icons-vue/es/notification/16'
import Medication from '@carbon/icons-vue/es/medication/16'
import Help from '@carbon/icons-vue/es/help/16'
import Star from '@carbon/icons-vue/es/star/16'
import Wallet from '@carbon/icons-vue/es/wallet/16'
import Align from '@carbon/icons-vue/es/align-box--bottom-left/16'
import Folder from '@carbon/icons-vue/es/folder/16'
import Security from '@carbon/icons-vue/es/security/16'
import Categories from '@carbon/icons-vue/es/categories/16'
import Medical from '@carbon/icons-vue/es/image--medical/16'
import Insights from '@carbon/icons-vue/es/activity/16'
import Money from '@carbon/icons-vue/es/money/16'
import Report from '@carbon/icons-vue/es/report/16'
import HospitalBed from '@carbon/icons-vue/es/hospital-bed/16'
import Result from '@carbon/icons-vue/es/archive/16'
import AppNavItem from '@/layout/AppNavItem'
import resize from '@/mixins/resize'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AppSidebar',

  components: {
    AppNavItem, Security, Categories, Template, Cross, Reference, Events, Settings, Baggage, Insurance, Notification, Help, Schedule, Star, Wallet, Align, Folder,
    Medication, Money, Report, Insights, Medical, List, HospitalBed, Result,
  },

  mixins: [resize],

  data() {
    return {
      open: true,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),

    ...mapGetters({
      navItems: 'global/navItems',
    }),

    speed() {
      return navigator.connection.downlink
    },
  },

  created() {
    this.open = !this.isTablet
  },

  events: {
    'update:nav': function (state) {
      this.open = state.params[0]
    },
  },
}
</script>

<style lang="postcss">
.bx--side-nav__footer {
  display: none;
}
</style>
