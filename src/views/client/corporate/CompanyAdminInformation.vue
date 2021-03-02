<template>
  <div>
    <cv-form @submit.prevent="">
      <!-- title -->
      <div>
        <div class="grid grid-cols-2 gap-8 my-8">
          <cv-text-input
            v-model="form.first_name"
            label="First name (required)"
            placeholder="Admin First Name"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.last_name"
            label="Last name (required)"
            placeholder="Admin last or family name"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.other_names"
            label="Phone number"
            placeholder="Phone number"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.email"
            label="Email"
            placeholder="Email"
            class="inherit-full-input"
          />
        </div>

        <div class="flex items-center justify-between mt-12 mb-6">
          <cv-button
            class="border-serenity-primary text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary px-6"
            kind="tertiary"
          >
            Cancel
          </cv-button>
          <cv-button
            :icon="icon"
            kind="primary"
            class="bg-serenity-primary"
            @click="$trigger('success:open', 'Company successfully created!!')"
          >
            Create company
          </cv-button>
        </div>
      </div>
    </cv-form>
    <SuccessModal />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'CompanyAdminInformation',
  data() {
    return {
      form: {
        title: 'Mr.',
      },
      icon: ChevronRight,
    }
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      gender: { required },
    },
  },

  methods: {
    actionChange() {},
  },
}
</script>
