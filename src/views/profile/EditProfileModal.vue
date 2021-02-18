<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    @modal-hidden="modalVisible = false"
  >
    <template slot="content">
      <div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-primary text-xl font-semibold">Edit Profile</p>
          </div>
        </div>
        <cv-form @submit.prevent="submit">
          <div>
            <div class="flex flex-col items-center justify-center mt-8">
              <img class="h-40 w-40 rounded-full" :src="form.photo" alt="">
              <div class="mt-4">
                <FileUploadButton customClass="bg-serenity-primary text-white" title="Or upload patient photo">
                  <template slot="button">
                    <div 
                      class="cv-button bg-serenity-primary bx--btn bx--btn--primary"
                       kind="primary" 
                      >Change Profile Picture
                        <Camera class="w-4 h-4 text-white bx--btn__icon" />
                      </div>
                  </template>
                </FileUploadButton>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 my-8">
              <cv-text-input
                label="Firstname"
                v-model="form.first_name"
                placeholder="Enter Firstname"
                class="inherit-full-input"
                :invalid-message="$utils.validateRequiredField($v, 'first_name')"
              >
              </cv-text-input>
              <cv-text-input
                label="Lastname"
                v-model="form.last_name"
                placeholder="Enter Latname"
                class="inherit-full-input"
                :invalid-message="$utils.validateRequiredField($v, 'last_name')"
              >
              </cv-text-input>
            </div>
            <cv-text-input
              label="Email Address"
              v-model="form.email_address"
              type="email"
              placeholder="Enter email address"
              :invalid-message="$utils.validateRequiredField($v, 'email_address')"
              class="inherit-full-input"
            >
            </cv-text-input>
            <div class="grid grid-cols-2 gap-8 my-8">
              <cv-text-input
                label="Contact Number"
                v-model="form.phone_number"
                placeholder="Enter phone number"
                :invalid-message="$utils.validateRequiredField($v, 'phone_number')"
                class="inherit-full-input"
                >
              </cv-text-input>
            </div>
            <div class="flex items-center justify-between mt-4 mb-6">
                <cv-button @click="close" class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6" kind="tertiary">Go Back</cv-button>
                <cv-button @click="submit" :icon="icon" kind="primary" class="bg-serenity-primary hover:bg-serenity-primary-highlight  ml-6">Update</cv-button>
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
export default {
  components: {Camera},
  data(){
    return {
      modalVisible: false,
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
  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      email_address: { required },
      phone_number: { required },
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
