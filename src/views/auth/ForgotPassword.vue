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
            Please enter your email below to get a reset link.
          </p>

          <div class="mt-8">
            <FormInput
              v-model.trim="form.email"
              v-nested-keyup:input.enter="reset"
              class="my-4"
              label="Email"
              placeholder="Enter your email"
              required
              :invalid-message="$utils.validateRequiredField($v, 'email')"
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
import { required, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'

export default {
  data() {
    return {
      form: {
        email: '',
      },
      saving: false,
    }
  },

  methods: {
    ...mapActions({
      resetPassword: 'auth/resetPassword',
    }),

    async reset() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.saving = true
      try {
        await this.resetPassword(this.form)
        this.$toast.open({
          message: 'Please check your email for a reset link',
        })
        this.$router.push({name: 'AuthLogin'})
      }catch(error){
        this.$toast.open({
          message: error.email ? error.email[0] : error.status,
          type: 'error',
        })
      }
      this.saving = false
    },
  },
  validations: {
    form: {
      email: { required, email: (val) => email(emailFormatter(val)) },
    },
  },
}
</script>
