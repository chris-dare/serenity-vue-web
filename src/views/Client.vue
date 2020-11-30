<template>
  <div>
    <AppHeader/>
    <div class="h-main flex">
        <AppSidebar class="h-100 relative bg-serenity-primary"/>
        <router-view/>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";

export default {
  name: "Home",
  components: {
    AppHeader,
    AppSidebar,
  },
};
</script>
