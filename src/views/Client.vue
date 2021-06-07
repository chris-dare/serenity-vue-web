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
          <vue-page-transition name="fade">
            <router-view />
          </vue-page-transition>
        </template>
      </LeftSidebarLayout>
      <ChangePasswordModal ref="changePasswordModal" />
      <EditProfileModal ref="editProfileModal" />
      <AdminProfile />
      <ConfirmActionModal />
      <ActionsModal />
    </div>

    <Offline @detected-condition="handleConnectivityChange" />
  </div>
</template>

<script>
import AppHeader from '@/layout/AppHeader'
import AppSidebar from '@/layout/AppSidebar'
import UtilityBar from '@/components/utility/UtilityBar'
import LeftSidebarLayout from '@/layout/LeftSidebarLayout'
import ChangePasswordModal from '@/components/layout/ChangePasswordModal'
import EditProfileModal from '@/components/layout/EditProfileModal'
import AdminProfile from '@/components/admin/modals/AdminProfile'

import { mapActions } from 'vuex'
import Offline from 'v-offline'

export default {
  name: 'Home',

  components: {
    AppHeader,
    AppSidebar,
    UtilityBar,
    LeftSidebarLayout,
    ChangePasswordModal,
    EditProfileModal,
    Offline,
    AdminProfile,
  },

  data() {
    return {
      isOnline: null,
    }
  },

  // watch: {
  //   isOnline: {
  //     immediate: false,
  //     handler(val, oldVal) {
  //       if (val === oldVal) {
  //         return
  //       }
  //       if (!val) {
  //         this.$toast.default('You are offline!!')
  //       } else {
  //         this.$toast.default('You are back online!!')
  //       }
  //     },
  //   },
  // },

  events: {
    'profile:edit': function(){
      this.$refs.editProfileModal.open()
    },
    'profile:security': function(){
      this.$refs.changePasswordModal.open()
    },
  },

  created() {
    this.initApp()
  },

  methods: {
    ...mapActions({
      initApp: 'global/initApp',
    }),

    handleConnectivityChange(status) {
      this.isOnline = status
    },
  },
}
</script>
