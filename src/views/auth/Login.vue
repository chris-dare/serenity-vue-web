<template>
  <div class="bg-serenity-auth h-screen w-screen">
    <div class="h-screen overflow-hidden">
      <div class="flex items-center justify-between px-8 bg-black h-12">
        <img
          src="@/assets/img/logo-full.svg"
          alt=""
        >
      </div>
      <div
        class="h-main flex w-full items-center bg-logo bg-logo-size bg-no-repeat bg-right-bottom pl-16"
      >
        <div class="w-1/4">
          <img
            src="@/assets/img/nyaho.svg"
            alt=""
          >
          <p class="text-white my-4">Welcome !</p>
          <p class="text-white w-60">
            “There is no key to happiness; the door is always open.” - Mother
            Teresa
          </p>

          <div class="mt-8">
            <cv-text-input
              v-model="form.email"
              class="my-4 se-dark-input"
              label="Your email address"
            />
            <cv-text-input
              v-model="form.password"
              label="Your password"
              type="password"
              class="se-dark-input"
            />
            <cv-button
              kind="primary"
              class="my-6 max-w-full w-full bg-serenity-primary"
              @click="login"
            >
              Sign In
            </cv-button>
            <router-link
              tag="div"
              to="/forgot-password"
              class="underline cursor-pointer text-serenity-primary my-4"
            >
              Forgot Password?
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {},
    }
  },

  methods: {
    ...mapActions({
      setLoggedIn: 'auth/setLoggedIn',
    }),
    login() {
      this.setLoggedIn(true)
      this.$router.push({ name: 'Dashboard' })
    },
  },
}
</script>
