<template>
  <div class="bg-serenity-auth h-screen w-screen">
    <div class="h-screen overflow-hidden">
      <div class="flex items-center justify-between px-8 bg-black">
        <img src="@/assets/img/logo-full.svg" alt="" />
        <div class="w-12 flex items-center justify-center h-12">
          <img src="@/assets/img/user 1.svg" class="w-5 h-5" alt="" />
        </div>
      </div>
      <div
        class="h-main flex w-full items-center bg-logo bg-logo-size bg-no-repeat bg-right-bottom pl-16"
      >
        <div class="w-1/4">
          <img src="@/assets/img/nyaho.svg" alt="" />
          <p class="text-white my-4">Forgot Password</p>
          <p class="text-white w-60">
            Please enter your mobile number or email below to get a reset link.
          </p>

          <div class="mt-8">
            <cv-text-input
              label="Enter new password"
              v-model="form.password"
              type="password"
              class="se-dark-input my-4"
            >
            </cv-text-input>
            <cv-text-input
              label="Repeat new password"
              v-model="form.new_password"
              type="password"
              class="se-dark-input"
            >
            </cv-text-input>
            <cv-button kind="primary" class="my-3 max-w-full w-full bg-serenity-primary">
              Reset password
            </cv-button>
            <router-link tag="div" to="/login" class="underline cursor-pointer text-serenity-primary my-4">Back to login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data() {
    return {
      form: {},
    }
  },
}
</script>
