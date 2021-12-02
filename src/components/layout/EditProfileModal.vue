<template>
  <BaseModal
    class="se-no-title-modal"
    :name="name"
    close-aria-label="Close"
    title="Edit Profile"
    @closed="close"
  >
    <template>
      <SeForm>
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
              label="First Name"
              placeholder="Enter first name"
              type="text"
              class="inherit-full-input"
              :invalid-message="$utils.validateRequiredField($v, 'first_name')"
              required
            />
            <FormInput
              v-model="form.last_name"
              label="Last Name"
              placeholder="Enter last name"
              type="text"
              class="inherit-full-input"
              :invalid-message="$utils.validateRequiredField($v, 'last_name')"
              required
            />
          </div>
          <FormInput
            v-model.trim="form.email_address"
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            :invalid-message="$utils.validateRequiredField($v, 'email_address')"
            class="inherit-full-input"
            required
          />
          <div class="grid grid-cols-2 gap-8 my-8">
            <FormInput
              v-model="form.phone_number"
              label="Contact Number"
              placeholder="Enter phone number"
              :invalid-message="$utils.validateRequiredField($v, 'phone_number')"
              class="inherit-full-input"
              required
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
            <SeButton
              :icon="icon"
              @click="submit"
            >
              Update
            </SeButton>
          </div>
        </div>
      </SeForm>
    </template>
  </BaseModal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Camera from '@carbon/icons-vue/es/camera/32'
import modalMixin from '@/mixins/modal'

export default {
  name: 'EditProfileModal',

  components: {Camera},

  mixins: [modalMixin],

  data(){
    return {
      saving: false,
      form: {},
      icon: ChevronRight,
      updateSuccessful: false,
      name: 'edit-profile-modal',
    }
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      email_address: { required },
      phone_number: { required },
    },
  },
  events: {
    'profile:edit': function(){
      this.open()
    },
  },
  methods: {
    submit(){
      this.saving = true
      setTimeout(()=>{
        this.close()
      },300)
    },
  },
}
</script>
