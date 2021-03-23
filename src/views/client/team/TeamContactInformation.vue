<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <cv-text-input
        v-model="form.phone_number"
        label="Phone number (required)"
        placeholder="eg 0349990390"
        class="inherit-full-input"
      >
        <template
          v-if="$v.form.phone_number.$error"
          slot="invalid-message"
        >
          Phone number is required
        </template>
      </cv-text-input>
      <cv-text-input
        v-model="form.email"
        label="Email address(required)"
        placeholder="Email address"
        class="inherit-full-input"
      >
        <template
          v-if="$v.form.email.$error"
          slot="invalid-message"
        >
          A valid email address is required
        </template>
      </cv-text-input>
    </div>
    <cv-text-input
      v-model="form.postal"
      label="Postal Address"
      placeholder="Postal Address"
      class="inherit-full-input my-8"
    />
    <cv-text-input
      v-model="form.address"
      label="Home/Residential address"
      placeholder="Home/Residential address"
      class="inherit-full-input my-8"
    />
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          :to="{ name: 'Team' }"
          variant="outline"
        >
          Cancel
        </SeButton>
        <SeButton
          variant="secondary"
          :to="{ name: 'TeamBiodata' }"
        >
          Go back
        </SeButton>
      </div>
      <SeButton
        :icon="icon"
        @click="save"
      >
        Next
      </SeButton>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'TeamContactInformation',

  data() {
    return {
      form: {},
      icon: ChevronRight,
    }
  },

  validations: {
    form: {
      phone_number: { required },
      email: { required, email},
    },
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.practitioners.currentUser,
    }),
  },

  created() {
    this.form = this.currentUser
  },

  methods: {
    ...mapActions({
      addToCurrentUser: 'practitioners/addToCurrentUser',
    }),

    save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.addToCurrentUser(this.form)
      this.$router.push({ name: 'TeamIdentification' })
    },
  },
}
</script>
