<template>
  <cv-side-nav
    id="side-nav"
    class="bg-serenity-primary max-w-xl transition-all duration-50"
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
  </cv-side-nav>
</template>

<script>
import Template from '@carbon/icons-vue/es/template/32'
import Cross from '@carbon/icons-vue/es/health-cross/32'
import Reference from '@carbon/icons-vue/es/watson-health/cross-reference/32'
import Events from '@carbon/icons-vue/es/events/32'
import Settings from '@carbon/icons-vue/es/settings/32'
import Baggage from '@carbon/icons-vue/es/shopping--bag/32'
import Schedule from '@carbon/icons-vue/es/event--schedule/32'
import Notification from '@carbon/icons-vue/es/notification/32'
import Medication from '@carbon/icons-vue/es/medication/32'
import Help from '@carbon/icons-vue/es/help/32'
import Star from '@carbon/icons-vue/es/star/32'
import Wallet from '@carbon/icons-vue/es/wallet/32'
import Align from '@carbon/icons-vue/es/align-box--bottom-left/32'
import Folder from '@carbon/icons-vue/es/folder/32'
import Security from '@carbon/icons-vue/es/security/32'
import Categories from '@carbon/icons-vue/es/categories/32'
import AppNavItem from '@/layout/AppNavItem'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AppSidebar',

  components: { AppNavItem, Security, Categories, Template, Cross, Reference, Events, Settings, Baggage, Notification, Help, Schedule, Star, Wallet, Align, Folder,
    Medication,
  },

  data() {
    return {
      open: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),

    ...mapGetters({
      navItems: 'global/navItems',
    }),
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
