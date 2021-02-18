<template>
  <div class="h-screen overflow-hidden">
    <AppHeader />
    <div class="h-main flex">
      <AppSidebar class="h-100 relative bg-serenity-primary" />
      <LeftSidebarLayout class="w-full">
        <template slot="sidebar">
          <UtilityBar />
        </template>
        <template>
          <vue-page-transition>
            <router-view />
          </vue-page-transition>
        </template>
      </LeftSidebarLayout>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/layout/AppHeader'
import AppSidebar from '@/layout/AppSidebar'
import UtilityBar from '@/components/utility/UtilityBar'
import LeftSidebarLayout from '@/layout/LeftSidebarLayout'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppSidebar,
    UtilityBar,
    LeftSidebarLayout,
  },
}
</script>
