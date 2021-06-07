<template>
  <Dropdown :visible.sync="visible">
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
      <div class="flex items-center justify-between px-4 py-4">
        <div>
          <p class="font-semibold text-lg text-white">{{ userName }}</p>
          <p class="text-secondary">General Practitioner</p>
        </div>
        <img
          src="@/assets/img/user 1.svg"
          class="w-12 h-12 rounded-full"
          alt=""
        >
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
      <p class="text-serenity-primary px-4 py-2 cursor-pointer">Support</p>
      <div
        class="flex items-center h-12 bg-serenity-placeholder px-4 text-white cursor-pointer"
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
    ...mapState('auth', ['user', 'loggedIn']),
    ...mapGetters({
      userName: 'auth/fullName',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      setLoggedIn: 'auth/setLoggedIn',
    }),
  
    async submit() {
      // await this.logout()
      this.setLoggedIn(false)
      this.$router.push({ name: 'AuthLogin' })
    },
  },
}
</script>
