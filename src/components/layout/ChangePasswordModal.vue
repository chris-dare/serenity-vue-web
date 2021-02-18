<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    @modal-hidden="modalVisible = false"
  >
    <template slot="content">
      <div v-if="updateSuccessful" />
      <div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-primary text-xl font-semibold">Settings</p>
            <p class="mt-4">Reset Password</p>
          </div>
        </div>
        <cv-form @submit.prevent="submit">
          <div>
            <div class="grid grid-cols-2 gap-8 my-8">
              <cv-text-input
                label="Current Password"
                value="**********"
                :disabled="true"
                type="password"
                class="inherit-full-input"
              />
              <div />
              <cv-text-input
                v-model="form.password"
                label="New Password"
                type="password"
                placeholder="At least 8 characters"
                :invalid-message="$utils.validateRequiredField($v, 'password')"
                class="inherit-full-input"
              />
              <cv-text-input
                v-model="form.confirm_password"
                label="Confirm Password"
                type="password"
                placeholder="At least 8 characters"
                :invalid-message="$utils.validateRequiredField($v, 'confirm_password')"
                class="inherit-full-input"
              />
            </div>
            <div class="flex justify-end">
              <router-link
                tag="div"
                to="/forgot-password"
                class="underline cursor-pointer inline-block text-serenity-primary my-4"
              >
                Forgot Password?
              </router-link>
            </div>
            <div class="flex items-center justify-between mt-4 mb-6">
              <cv-button
                class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
                kind="tertiary"
                @click="close"
              >
                Go Back
              </cv-button>
              <cv-button
                :icon="icon"
                kind="primary"
                class="bg-serenity-primary hover:bg-serenity-primary-highlight  ml-6"
                @click="submit"
              >
                Update Password
              </cv-button>
            </div>
          </div>
        </cv-form>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'

export default {
  data(){
    return {
      modalVisible: false,
      saving: false,
      form: {
        password: '',
        confirm_password: '',
      },
      icon: ChevronRight,
      updateSuccessful: false,
    }
  },
  validations: {
    form: {
      password: { required },
      confirm_password: { required },
    },
  },
  methods: {
    open(){
      this.modalVisible = true
    },
    close() {
      this.modalVisible = false
    },
    submit(){
      this.saving = true
      setTimeout(()=>{
        this.close()
      },300)
    },
  },
}
</script>
