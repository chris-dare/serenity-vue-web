<template>
  <BaseModal
    :name="name"
    close-aria-label="Close"
    size="sm"
    title="Update Admin Profile"
    height="auto"
    scrollable
    :shift-y="0.1"
    @closed="close"
  >
    <template>
      <div>
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
              <FormInput
                v-model="form.first_name"
                :invalid-message="$utils.validateRequiredField($v, 'first_name')"
                label="First Name"
                placeholder="Enter First name"
                type="text"
                class="inherit-full-input"
                required
              />
              <FormInput
                v-model="form.last_name"
                :invalid-message="$utils.validateRequiredField($v, 'last_name')"
                label="Last Name"
                type="text"
                placeholder="Enter Last name"
                class="inherit-full-input"
                required
              />
              <MultiSelect
                v-model="form.gender"
                title="Gender"
                placeholder="Male or female"
                :error-message="$utils.validateRequiredField($v, 'gender')"
                :options="['male', 'female']"
                required
              />
              <DatePicker
                v-model="form.birth_date"
                :invalid-message="$utils.validateRequiredField($v, 'birth_date')"
                kind="single"
                class="inherit-full-input se-input-gray"
                placeholder="dd/mm/yyyy"
                label="Date of birth"
                required
              />
              <PhoneInput
                v-model="form.mobile"
                :error-message="$utils.validateRequiredField($v, 'mobile')"
                label="Phone number"
                placeholder="eg 0349990390"
                required
                @input="$v.$touch()"
              />
              <FormInput
                v-model="form.email"
                :invalid-message="$utils.validateRequiredField($v, 'email')"
                label="Email address"
                type="email"
                placeholder="Email address"
                class="inherit-full-input"
                required
              />
            </div>
            <FormInput
              v-model="form.address"
              label="Full user address"
              type="text"
              placeholder="Residential address"
              class="inherit-full-input"
              required
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
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Camera from '@carbon/icons-vue/es/camera/32'
import { emailFormatter } from '@/services/custom-validators'
import modalMixin from '@/mixins/modal'

export default {
  name: 'AdminProfile',

  components: { Camera },

  mixins: [modalMixin],

  data() {
    return {
      form: {
      },
      loading: false,
      icon: ChevronRight,
      name: 'admin-profile',
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
      this.open()
    },
  },

  validations: {
    form:  {
      first_name: {required},
      last_name: {required},
      gender: {required},
      birth_date: {required},
      email: {required, email: (val) => email(emailFormatter(val))},
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
          this.close()
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
