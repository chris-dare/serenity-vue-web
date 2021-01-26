<template>
  <div>
    <cv-header class="relative bg-black flex">
      <div
        class="w-12 h-12 bg-serenity-gray flex justify-center items-center cursor-pointer"
      >
        <img src="@/assets/img/close.svg" alt="" />
      </div>
      <div class="flex justify-between items-center w-full">
        <cv-header-name href="javascript:void(0)">
          <img src="@/assets/img/logo-full.svg" alt="" />
        </cv-header-name>
        <div class="flex items-center">
          <cv-text-input
            class="no-label-input h-12 w-102 text-white"
            placeholder="Search for patient name or Phone number"
            v-model="search"
          >
          </cv-text-input>
          <div
            class="bg-serenity-gray h-12 flex items-center justify-center px-4"
          >
            <img src="@/assets/img/search 1.svg" alt="" />
          </div>
        </div>
        <div class="flex items-center mx-6">
          <div class="flex items-center">
            <img src="@/assets/img/location 1.svg" alt="" />
            <p class="ml-3 text-white text-sm">Airport Residential</p>
          </div>

          <cv-select
            class="no-label-input se-dark-input hover:bg-serenity-gray focus:bg-serenity-gray mx-6 text-sm"
            label="false"
            v-model="selected"
            @change="actionChange"
          >
            <cv-select-option
              v-for="(item, index) in options"
              :key="index"
              class="text-white font-light"
              :value="item"
              >{{ item }}</cv-select-option
            >
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
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AppHeader',

  components: { UserHeaderDropdown, NotificationDetailsDropdown },

  data() {
    return {
      search: '',
    //   selected: 'Out Patient',
      options: [
        'Reception',
        'Out Patient',
        'In Patient',
        'Pharmacy',
        'Diagnostics',
        'Billing',
        'COVID-19',
        'Virtual Care',
      ],
    }
  },

  computed: {
      ...mapState({
          globalType: (state) => state.global.globalType,
      }),
      selected: {
        get() {
            return this.globalType
        },
        set(value) {
            this.setGlobalType(value)
        },
      },
  },

  methods: {
      ...mapActions({
          setGlobalType: 'global/setGlobalType',
      }),

      actionChange(value) {
          this.setGlobalType(value)
      },
  },
}
</script>
