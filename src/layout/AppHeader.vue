<template>
  <SeForm>
    <cv-header class="relative bg-black flex">
      <div
        class="w-12 h-12 bg-serenity-gray flex justify-center items-center cursor-pointer"
        @click="change"
      >
        <Close32
          v-if="open"
          class="w-5 h-5 text-white"
        />
        <Menu32
          v-else
          class="w-5 h-5 text-white"
        />
      </div>
      <div class="flex justify-between items-center w-full px-4">
        <img
          src="@/assets/img/logo-full.svg"
          alt=""
          class="hidden xl:block"
        >
        <img
          src="@/assets/img/logo.svg"
          alt=""
          class="xl:hidden w-5 h-5 mx-4"
        >
        <!-- <SeForm class="flex items-center flex-1 max-w-lg mr-2">
          <cv-text-input
            v-model="search"
            class="no-label-input h-12 flex-1 text-white"
            placeholder="Search for patient name or Phone number"
          />

          <div
            class="bg-serenity-gray h-12 flex items-center justify-center px-4"
          >
            <img
              src="@/assets/img/search 1.svg"
              alt=""
            >
          </div>
        </SeForm> -->
        <div class="flex items-center">
          <div class="hidden md:flex items-center">
            <img
              src="@/assets/img/location 1.svg"
              alt=""
            >
            <cv-select
              v-model="selectedLocation"
              class="no-label-input se-black-input hover:bg-serenity-gray focus:bg-serenity-gray mx-2 lg:mx-6"
              label="false"
            >
              <cv-select-option
                v-for="(item, index) in locations"
                :key="index"
                class="text-white font-light"
                :value="item.id"
              >
                {{ item.location_name }}
              </cv-select-option>
            </cv-select>
          </div>

          <cv-select
            v-model="selected"
            class="no-label-input se-dark-input hover:bg-serenity-gray focus:bg-serenity-gray mx-2 lg:mx-6 md:block hidden"
            label="false"
            @change="actionChange"
          >
            <cv-select-option
              v-for="(item, index) in workspaces"
              :key="index"
              class="text-white font-light capitalize"
              :value="item.value"
            >
              {{ item.label }}
            </cv-select-option>
          </cv-select>

          <!-- <NotificationDetailsDropdown /> -->

          <UserHeaderDropdown />
        </div>
      </div>
    </cv-header>
  </SeForm>
</template>

<script>
import UserHeaderDropdown from '@/components/layout/UserHeaderDropdown'
// import NotificationDetailsDropdown from '@/components/layout/NotificationDetailsDropdown'
import Close32 from '@carbon/icons-vue/es/close/32'
import Menu32 from '@carbon/icons-vue/es/menu/32'
import resize from '@/mixins/resize'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'AppHeader',

  components: {
    UserHeaderDropdown,
    // NotificationDetailsDropdown,
    Close32,
    Menu32,
  },

  mixins: [resize],

  data() {
    return {
      search: '',
      open: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      locations: (state) => state.locations.locations,
      location: (state) => state.global.location,
    }),

    ...mapGetters({
      workspaces: 'auth/userWorkspaces',
    }),

    selected: {
      get() {
        return this.workspaceType
      },
      set(value) {
        this.setworkspaceType(value)
      },
    },

    selectedLocation: {
      get() {
        return this.location
      },
      set(value) {
        this.setGlobalLocation(value)
      },
    },
  },

  created() {
    this.init()
  },

  methods: {
    ...mapActions({
      setworkspaceType: 'global/setworkspaceType',
      setGlobalLocation: 'global/setGlobalLocation',
      getLocations: 'locations/getLocations',
    }),

    async init() {
      // this.open = this.isTablet
      await this.getLocations(false)

      this.selectedLocation = localStorage.getItem('location') ? localStorage.getItem('location') : this.locations.length ? this.locations[0].id : ''
    },

    actionChange(value) {
      this.setworkspaceType(value)
      this.$router.push({ name: this.workspaceType === 'ADMIN' ? 'GetStarted' : 'Dashboard'}).catch(()=>{})
    },

    change() {
      this.open = !this.open
      this.$trigger('update:nav', this.open)
    },

    setDefaultWorkspace() {
      const admin = this.workspaces.find(workspace => workspace.value === 'ADMIN')
      const opd = this.workspaces.find(workspace => workspace.value === 'ADMIN')
      let workspace = localStorage.getItem('workspace') ? localStorage.getItem('workspace')
        : !!admin ? admin.value
          : !!opd ? opd.value
            : this.workspaces[0].value
      this.setworkspaceType(workspace)
    },
  },
}
</script>
