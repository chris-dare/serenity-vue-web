<template>
  <div>
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
      <div class="flex justify-between items-center w-full">
        <img
          src="@/assets/img/logo-full.svg"
          alt=""
          class="hidden lg:block"
        >
        <img
          src="@/assets/img/logo.svg"
          alt=""
          class="lg:hidden w-5 h-5 mx-6"
        >
        <div class="lg:flex items-center hidden">
          <cv-text-input
            v-model="search"
            class="no-label-input h-12 lg:w-102 text-white"
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
        </div>
        <div class="flex items-center mx-6">
          <div class="hidden md:flex items-center">
            <img
              src="@/assets/img/location 1.svg"
              alt=""
            >
            <cv-select
              v-model="selectedLocation"
              class="no-label-input se-black-input hover:bg-serenity-gray focus:bg-serenity-gray mx-6"
              label="false"
              @change="selectLocation"
            >
              <cv-select-option
                v-for="(item, index) in locations"
                :key="index"
                class="text-white font-light"
                :value="item.location_name"
              >
                {{ item.location_name }}
              </cv-select-option>
            </cv-select>
          </div>

          <cv-select
            v-model="selected"
            class="no-label-input se-dark-input hover:bg-serenity-gray focus:bg-serenity-gray mx-6 md:block hidden"
            label="false"
            @change="actionChange"
          >
            <cv-select-option
              v-for="(item, index) in workspaces"
              :key="index"
              class="text-white font-light"
              :value="item.value"
            >
              {{ item.label }}
            </cv-select-option>
          </cv-select>

          <NotificationDetailsDropdown />

          <UserHeaderDropdown />
        </div>
      </div>
    </cv-header>
  </div>
</template>

<script>
import UserHeaderDropdown from '@/components/layout/UserHeaderDropdown'
import NotificationDetailsDropdown from '@/components/layout/NotificationDetailsDropdown'
import Close32 from '@carbon/icons-vue/es/close/32'
import Menu32 from '@carbon/icons-vue/es/menu/32'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AppHeader',

  components: {
    UserHeaderDropdown,
    NotificationDetailsDropdown,
    Close32,
    Menu32,
  },

  data() {
    return {
      search: '',
      open: '',
      selectedLocation: '',
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      workspaces: (state) => state.global.workspaces,
      locations: (state) => state.locations.locations,
    }),
  
    selected: {
      get() {
        return this.workspaceType
      },
      set(value) {
        this.setworkspaceType(value)
      },
    },
  },

  async created() {
    await this.getLocations(false)
    this.selectedLocation = this.locations.length ? this.locations[0].location_name : ''
  },

  methods: {
    ...mapActions({
      setworkspaceType: 'global/setworkspaceType',
      getLocations: 'locations/getLocations',
    }),

    actionChange(value) {
      this.setworkspaceType(value)
    },

    selectLocation() {},

    change() {
      this.open = !this.open
      this.$trigger('update:nav', this.open)
    },
  },
}
</script>
