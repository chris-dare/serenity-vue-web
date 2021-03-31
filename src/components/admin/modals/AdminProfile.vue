<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-primary text-xl font-semibold">Update Admin Profile</p>
          </div>
        </div>
        <div>
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
                v-model="form.first_name"
                :invalid-message="$utils.validateRequiredField($v, 'first_name')"
                label="First Name (required)"
                placeholder="Enter First name"
                class="inherit-full-input"
              />
              <cv-text-input
                v-model="form.last_name"
                :invalid-message="$utils.validateRequiredField($v, 'last_name')"
                label="Last Name (required)"
                placeholder="Enter Last name"
                class="inherit-full-input"
              />
              <cv-select
                v-model="form.gender"
                :invalid-message="$utils.validateRequiredField($v, 'gender')"
                label="Gender (required)"
                class="inherit-full-input"
                placeholder="Male or female"
              >
                <cv-select-option value="male">Male</cv-select-option>
                <cv-select-option value="female">Female</cv-select-option>
              </cv-select>
              <cv-date-picker
                v-model="form.birth_date"
                :invalid-message="$utils.validateRequiredField($v, 'birth_date')"
                kind="single"
                class="inherit-full-input"
                placeholder="dd/mm/yyyy"
                date-label="Date of birth"
              />
              <cv-text-input
                v-model="form.mobile"
                :invalid-message="$utils.validateRequiredField($v, 'mobile')"
                label="Phone number (required)"
                placeholder="eg 0349990390"
                class="inherit-full-input"
              />
              <cv-text-input
                v-model="form.email"
                :invalid-message="$utils.validateRequiredField($v, 'email')"
                label="Email address (required)"
                placeholder="Email address"
                class="inherit-full-input"
              />
            </div>
            <cv-text-input
              v-model="form.address"
              label="Full user address (required)"
              placeholder="Residential address"
              class="inherit-full-input"
            />
            <div class="my-8">
              <p class="text-primary mb-2 text-left text-xs">Upload Signature</p>
              <div class="bg-gray-200 py-3">
                <div class="bg-gray-200 h-20 w-full">
                  <img
                    :src="form.signature"
                    alt=""
                  >
                </div>
                <FileUploadButton
                  custom-class="border-0 bg-gray-200"
                  title="Or upload signature photo"
                />
              </div>
            </div>
            <div class="flex items-center justify-between mt-4 mb-6">
              <cv-button
                class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
                kind="tertiary"
                @click="visible = false"
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
        </div>>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Camera from '@carbon/icons-vue/es/camera/32'

export default {
  name: 'AdminProfile',

  components: { Camera },

  data() {
    return {
      form: {
      },
      visible: false,
      loading: false,
      icon: ChevronRight,
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },

  events: {
    'admin:profile:add:open': function(){
      this.visible = true
    },
    'admin:profile:open': function(){
      this.form = Object.assign({}, this.form, this.user)
      this.visible = true
    },
  },

  validations: {
    form:  {
      first_name: {required},
      last_name: {required},
      gender: {required},
      birth_date: {required},
      email: {required, email},
      mobile: {required},
    },
  },

  methods: {
    ...mapActions({
      update: 'auth/updateProfile',
    }),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
      const data = await this.update(this.form).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        if(data.successful){
          this.$toast.open({
            message: data.message || 'Profile updated successfully',
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
  },
}
</script>
