<template>
  <div>
    <cv-form @submit.prevent="">
      <!-- title -->
      <div>
        <div class="grid grid-cols-2 gap-8 my-8">
          <cv-text-input
            v-model="form.first_name"
            label="Company name (required)"
            placeholder="Company Name"
            type="text"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.email"
            label="Email (required)"
            placeholder="Email address"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.other_names"
            label="Phone number"
            placeholder="Phone number"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.tin"
            label="TIN Number"
            placeholder="TIN Number"
            class="inherit-full-input"
          />
        </div>

        <cv-text-area
          v-model="form.address"
          placeholder="Location address"
          label="Full provider address (required)"
          type="text"
          class="w-full"
        />
            
           

        <div class="flex items-center justify-between mt-12 mb-6 w-full">
          <cv-button
            class="border-serenity-primary text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary px-6"
            kind="tertiary"
          >
            Cancel
          </cv-button>
          <div class="flex items-center">
            <cv-button
              :icon="icon"
              kind="primary"
              class="bg-serenity-primary ml-6"
              @click="$router.push({name: 'CompanyAdminInformation'})"
            >
              Next
            </cv-button>
          </div>
        </div>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
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
