<template>
  <AppRegisterLayout
    :label="title"
    :nav-items="navItems"
    :checked="checked"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterWard',

  data() {
    return {
      checked: '',
    }
  },

  computed: {
    title() {
      return 'Add a new service resource'
    },
    navItems() {
      return[
        { label: 'Resouce Information', description: 'Name, categories, locations', path: 'ResourceInformation' },
      ]
    },
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.checked = val.name
      },
    },
  },

  beforeRouteLeave(to, from, next) {
    this.refresh()
    next()
  },

  methods: {
    ...mapActions({
      refresh: 'services/refreshCurrentService',
    }),
  },
}
</script>
