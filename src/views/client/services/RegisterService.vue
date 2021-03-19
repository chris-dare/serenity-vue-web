<template>
  <AppRegisterLayout
    label="Add a new service"
    :nav-items="navItems"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
export default {
  name: 'RegisterService',

  data() {
    return {
      navItems: [
        { label: 'Service Information', description: 'Name, categories, locations', path: 'ServiceInformation'},
        { label: 'Service Pricing', description: 'Type and prices', path: 'ServicePricing'},
        { label: 'Service Availability', description: 'Available and unavailable dates', path: 'ServiceAvailability'},
      ],
    }
  },
}
</script>
