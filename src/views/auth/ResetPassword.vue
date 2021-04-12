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
          <p class="text-white my-4">Forgot Password</p>
          <p class="text-white w-60">
            Please enter your mobile number or email below to get a reset link.
          </p>

          <div class="mt-8">
            <cv-text-input
              v-model="form.password"
              :invalid-message="$utils.validateRequiredField($v, 'password')"
              label="Enter new password"
              type="password"
              class="se-dark-input my-4"
            />
            <cv-text-input
              v-model="form.confirm_password"
              v-nested-keyup:input.enter="reset"
              :invalid-message="$utils.validateRequiredField($v, 'confirm_password')"
              label="Repeat new password"
              type="password"
              class="se-dark-input"
            />
            <cv-button
              kind="primary"
              class="my-3 max-w-full w-full bg-serenity-primary justify-start"
              @click="reset"
            >
              <img
                :class="{hidden: !saving}"
                class="h-4 w-4 mr-4"
                src="@/assets/img/eclipse.svg"
              >
              Reset password
            </cv-button>
            <router-link
              tag="div"
              to="/login"
              class="underline cursor-pointer text-serenity-primary my-4"
            >
              Back to login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'ResetPassword',
  data() {
    return {
      form: {
        password: '',
        confirm_password: '',
      },
      saving: false,
    }
  },
  methods: {
    ...mapActions({
      confirmResetPassword: 'auth/confirmResetPassword',
    }),

    async reset() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.saving = true
      const token = this.$route.query.token
      try{
        await this.confirmResetPassword({
          password: this.form.password,
          token: token,
        })
        this.$toast.open({
          message: 'Password has been reset successfully',
        })
        this.$router.push({name: 'AuthLogin'})
      }catch(error){
        this.$toast.open({
          message: error.password ? error.password[0] : error.status,
          type: 'error',
        })
      }
      this.saving = false
    },
  },
  validations: {
    form: {
      password: {
        required,
      },
      confirm_password: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
}
</script>
