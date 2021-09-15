<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    @modal-hidden="close"
  >
    <template slot="content">
      <div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-primary text-xl font-semibold">Update Provider Profile</p>
          </div>
        </div>
        <cv-form @submit.prevent="">
          <div>
            <div class="flex flex-col items-center justify-center mt-8">
              <img
                class="h-40 w-40 rounded-full"
                :src="form.photo"
                alt=""
              >
              <div class="mt-4">
                <FileUploadButton
                  custom-class="bg-serenity-primary text-white"
                  title="Or upload patient photo"
                >
                  <template slot="button">
                    <div
                      class="cv-button bg-serenity-primary bx--btn bx--btn--primary"
                      kind="primary"
                    >
                      Change Profile Picture
                      <Camera class="w-4 h-4 text-white bx--btn__icon" />
                    </div>
                  </template>
                </FileUploadButton>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 my-8">
              <FormInput
                v-model="form.organization_name"
                label="Provider name"
                placeholder="Provider Name"
                :invalid-message="$utils.validateRequiredField($v, 'organization_name')"
                class="inherit-full-input"
                required
              />

              <PhoneInput
                v-model="form.organization_telecom"
                label="Contact Number"
                :error-message="$utils.validateRequiredField($v, 'organization_telecom')"
                required
                @input="$v.$touch()"
              />
            </div>
            <div class="flex items-center justify-between mt-4 mb-6">
              <cv-button
                class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
                kind="tertiary"
                @click="close"
              >
                Go Back
              </cv-button>
              <cv-button-skeleton
                v-if="loading"
              />
              <cv-button
                v-else
                :icon="icon"
                kind="primary"
                class="bg-serenity-primary hover:bg-serenity-primary-highlight  ml-6"
                @click="submit"
              >
                Update
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
import Camera from '@carbon/icons-vue/es/camera/32'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProviderProfile',

  components: { Camera },

  data(){
    return {
      visible: false,
      loading: false,
      form: {},
      icon: ChevronRight,
      updateSuccessful: false,
    }
  },

  computed: {
    ...mapState({
      provider: state => state.auth.provider,
    }),
  },

  validations: {
    form: {
      organization_name: { required },
      organization_telecom: { required },
    },
  },

  events: {
    'provider:profile:close': function(){
      this.visible = false
    },
    'provider:profile:open': function(){
      this.visible = true
      this.form = Object.assign(this.provider)
    },
  },

  methods: {
    ...mapActions({
      update: 'auth/updateProvider',
    }),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
      let params = {
        id: this.form.id,
        name: this.form.organization_name,
        mobile: this.form.organization_telecom,
      }
      const data = await this.update(params).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        if(data.success){
          this.$toast.open({
            message: data.message || 'Provider updated successfully',
          })
          this.visible = false
        }else{
          this.$toast.open({
            message: data.message || 'Something went wrong!',
            type: 'error',
          })
        }
      }

      this.loading = false
    },
    close() {
      this.$v.$reset()
      this.visible = false
      this.form = {}
    },
  },
}
</script>
