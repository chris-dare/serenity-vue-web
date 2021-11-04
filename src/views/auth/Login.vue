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

          <div class="text-white">
            <cv-inline-notification
              v-if="showNotification"
              kind="error"
              :sub-title="errorMessage"
              @close="showNotification = false"
            />
          </div>
          <div class="mt-8">
            <FormInput
              v-model.trim="form.email"
              required
              :invalid-message="$utils.validateRequiredField($v, 'email')"
              class="my-4 se-dark-input"
              label="Your email address"
              data-test="email"
            />
            <FormInput
              v-model="form.password"
              v-nested-keyup:input.enter="login"
              required
              :invalid-message="$utils.validateRequiredField($v, 'password')"
              label="Your password"
              type="password"
              class="se-dark-input"
              data-test="password"
            />
            <cv-button
              ref="loginButton"
              kind="primary"
              class="shake-anim my-6 max-w-full w-full bg-serenity-primary justify-start"
              data-test="submit"
              @click="login"
            >
              <img
                data-test="loading"
                :class="{hidden: !saving}"
                class="h-4 w-4 mr-4"
                src="@/assets/img/eclipse.svg"
              >
              <template>Sign In</template>
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
import { required, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'

export default {
  name: 'Login',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      showNotification: false,
      errorMessage: '',
      saving: false,
    }
  },

  validations: {
    form:  {
      email: {required, email: (val) => email(emailFormatter(val))},
      password: {required},
    },
  },

  computed: {
    dateTime(){
      var dayOfWeek = 0 //friday
      var date = new Date()
      date = new Date(date.getTime ())
      date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7)
      return date
    },
  },

  methods: {
    ...mapActions({
      setLoggedIn: 'auth/setLoggedIn',
    }),
    async login() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.saving = true
      try{
        await this.$store.dispatch('auth/login', this.form)

        this.$router.push(sessionStorage.getItem('redirectUrl') ? sessionStorage.getItem('redirectUrl') : { name: this.$isCurrentWorkspace('ADMIN') ? 'GetStarted' : 'Dashboard' })
      }catch(error){
        this.$refs.loginButton.$el.classList.add('shake-anim-active')
        setTimeout(()=> {
          this.$refs.loginButton.$el.classList.remove('shake-anim-active')
        }, 300)
        this.errorMessage = error.detail || 'Failed to login'
        this.showNotification = true
      }
      this.saving = false
    },
  },
}
</script>
