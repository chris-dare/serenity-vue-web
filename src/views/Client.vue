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
      <ChangePasswordModal />
      <EditProfileModal />
      <AdminProfile />
      <ConfirmActionModal />
      <ActionsModal />
      <AddEditInsuranceModal />
    </div>

    <Offline @detected-condition="handleConnectivityChange" />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import AppHeader from '@/layout/AppHeader'
import AppSidebar from '@/layout/AppSidebar'
import UtilityBar from '@/components/utility/UtilityBar'
import LeftSidebarLayout from '@/layout/LeftSidebarLayout'
import ChangePasswordModal from '@/components/layout/ChangePasswordModal'
import EditProfileModal from '@/components/layout/EditProfileModal'
import AdminProfile from '@/components/admin/modals/AdminProfile'
const AddEditInsuranceModal = () => import('@/components/insurance/AddEditInsuranceModal')

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
    AddEditInsuranceModal,
  },

  data() {
    return {
      isOnline: null,
    }
  },

  watch: {
    isOnline: {
      immediate: false,
      handler(val, oldVal) {
        if (val === oldVal) {
          return
        }
        if (!val) {
          this.$toast.error('You are offline!!')
        } else {
          this.$toast.success('You are back online!!')
        }
      },
    },
  },

  async created() {
    await this.initApp()
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
