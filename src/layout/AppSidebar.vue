<template>
  <cv-side-nav
    id="side-nav"
    class="bg-serenity-primary"
  >
    <AppNavItem to="/">
      <img
        class="w-5 h-5"
        src="@/assets/img/template 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem to="/patients">
      <img
        class="w-5 h-5"
        src="@/assets/img/cross-reference 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem
      v-if="globalType != 'Reception'"
      to="/visits"
    >
      <img
        class="w-5 h-5"
        src="@/assets/img/image--medical 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem to="/appointments">
      <img
        class="w-5 h-5"
        src="@/assets/img/event--schedule 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem
      v-if="globalType != 'Reception'"
      to="/study"
    >
      <img
        class="w-5 h-5"
        src="@/assets/img/download-study 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem to="/notifications">
      <img
        class="w-5 h-5"
        src="@/assets/img/notification 2.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem
      v-if="globalType != 'Reception'"
      to="/events"
    >
      <img
        class="w-5 h-5"
        src="@/assets/img/events 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem
      v-if="globalType != 'Reception'"
      to="/activity"
    >
      <img
        class="w-5 h-5"
        src="@/assets/img/activity 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem to="/settings">
      <img
        class="w-5 h-5"
        src="@/assets/img/settings 1.svg"
        alt=""
      >
    </AppNavItem>
    <AppNavItem to="/help">
      <img
        class="w-5 h-5"
        src="@/assets/img/help 1.svg"
        alt=""
      >
    </AppNavItem>
  </cv-side-nav>
</template>

<script>
import AppNavItem from '@/layout/AppNavItem'
import { mapState } from 'vuex'
export default {
  name: 'AppSidebar',

  components: { AppNavItem },

  computed: {
    ...mapState({
      globalType: state => state.global.globalType,
    }),
  },
}
</script>

<style lang="postcss">
.bx--side-nav__footer{
    display: none;
}
</style>
