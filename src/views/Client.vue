<template>
  <div>
    <AppHeader />
    <div class="h-main flex">
      <AppSidebar class="h-100 relative bg-serenity-primary" />
      <LeftSidebarLayout class="w-full">
        <template slot="sidebar">
          <UtilityBar />
        </template>
        <template>
            <router-view />
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
