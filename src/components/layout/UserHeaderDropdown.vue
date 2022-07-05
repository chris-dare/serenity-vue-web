<template>
  <Dropdown
    data-cy="user-header-dropdown"
    :visible.sync="visible"
  >
    <div
      slot="label"
      class="w-12 flex items-center justify-center h-12"
      :class="[visible ? 'bg-serenity-primary' : '']"
      @click="visible = !visible"
    >
      <img
        src="@/assets/img/user 1.svg"
        class="w-5 h-5 cursor-pointer"
        alt=""
      >
    </div>
    <div
      class="bg-primary w-96"
    >
      <div class="flex items-center justify-between p-4">
        <div>
          <p class="font-semibold text-lg text-white">{{ userName | capitalize }}</p>
        </div>
        <img
          src="@/assets/img/user 1.svg"
          class="w-12 h-12 rounded-full"
          alt=""
        >
      </div>
      <div class="border-t border-b border-placeholder border-solid  py-2 space-y-2">
        <p class="uppercase text-xs text-gray-400 px-4">organizations</p>
        <div>
          <div
            v-for="(organization, index) in organizations"
            :key="index"
            :data-cy="organization.organization_name"
            class="text-white hover:bg-placeholder px-4 py-2 cursor-pointer"
            :class="{'bg-placeholder': $providerId === organization.organization_uuid}"
            @click="switchOrganization(organization)"
          >
            {{ organization.first_name }}
            {{ organization.last_name }} -
            {{ organization.organization_name }}
          </div>
        </div>
      </div>
      <p
        class="text-serenity-primary px-4 py-2 cursor-pointer"
        @click="$trigger('admin:profile:open')"
      >
        Profile information
      </p>
      <p
        class="text-serenity-primary px-4 py-2 cursor-pointer"
        @click="$trigger('profile:security')"
      >
        Account security
      </p>
      <p 
        class="text-serenity-primary px-4 py-2 cursor-pointer" 
        @click="goSupport"
      >
        Support
      </p>
      <div
        class="flex items-center h-12 bg-placeholder px-4 text-white cursor-pointer"
        @click="submit"
      >
        Logout
        <ArrowRight class="w-4 h-4 ml-3 text-white" />
      </div>
    </div>
  </Dropdown>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ArrowRight from '@carbon/icons-vue/es/arrow--right/32'
export default {
  name: 'UserHeaderDropdown',

  components: { ArrowRight },

  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      loggedIn: state => state.auth.loggedIn,
    }),

    ...mapGetters({
      userName: 'auth/fullName',
      organizations: 'auth/organizations',
    }),
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
      setLoggedIn: 'auth/setLoggedIn',
      refreshCurrentOrganization: 'auth/refreshCurrentOrganization',
    }),
  
    async submit() {
      await this.logout()
      this.$router.push({ name: 'AuthLogin' })
    },

    goSupport(){
      window.open(
        'https://bit.ly/Serenity_Support',
        '_blank', // <- This is what makes it open in a new window.
      )
    },

    async switchOrganization(organization) {
      try {
        await this.refreshCurrentOrganization(organization)
        this.$router.push({ name: this.$isCurrentWorkspace('ADMIN') ? 'GetStarted' : 'Dashboard'}).catch(()=>{})
        window.location.reload(true)
        this.visible = false
      } catch (error) {
        this.$toast.error('Error in switching organizations. Please contact your admin')
      }
      
    },
  },
}
</script>
