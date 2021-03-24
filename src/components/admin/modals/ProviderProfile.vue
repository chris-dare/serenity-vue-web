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
              <cv-text-input
                v-model="form.name"
                label="Provider name (required)"
                placeholder="Provider name"
                class="inherit-full-input"
              />
              <cv-text-input
                v-model="form.email"
                label="Email (required)"
                placeholder="Email"
                type="email"
                class="inherit-full-input"
              />
              <cv-text-input
                v-model="form.phone_number"
                label="Contact Number"
                placeholder="Enter phone number"
                class="inherit-full-input"
              />
              <cv-select
                v-model="form.type"
                label="Provider type (required)"
                class="inherit-full-input"
              >
                <!-- <cv-select-option value="male">Male</cv-select-option> -->
              </cv-select>
            </div>
            <cv-text-input
              v-model="form.address"
              label="Full provider address (required)"
              placeholder="Enter residential address"
              class="inherit-full-input mb-8"
            />
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
import { mapState } from 'vuex'

export default {
  name: 'ProviderProfile',

  components: { Camera },

  data(){
    return {
      visible: false,
      saving: false,
      form: {
        first_name: this.$faker().name.firstName(),
        last_name: this.$faker().name.lastName(),
        email_address: this.$faker().internet.email(),
        phone_number: '',
        photo: this.$faker().image.image(),
      },
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
      name: { required },
      emal: { required },
      type: { required },
      phone_number: { required },
    },
  },

  events: {
    'provider:profile:close': function(){
      this.visible = false
    },
    'provider:profile:open': function(){
      this.visible = true
      this.form = { name: this.provider.organization_name}
    },
  },

  methods: {
    submit() {},
    close() {
      this.visible = false
      this.form = {}
    },
  },
}
</script>
