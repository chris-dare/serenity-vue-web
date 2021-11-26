<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    :title="form.id ? 'Edit locations' : 'New locations'"
    width="450px"
  >
    <template>
      <SeForm
        class="space-y-8"
      >
        <FormInput
          v-model="form.location_name"
          type="text"
          label="Location name"
          placeholder="eg Valley Heights"
          :invalid-message="$utils.validateRequiredField($v, 'location_name')"
          required
        />

        <FormCountrySelect
          v-model="form.country"
          title="Country"
          placeholder="Select a country"
        />

        <FormInput
          v-model="form.city"
          type="text"
          label="City"
          placeholder="eg Accra"
          :invalid-message="$utils.validateRequiredField($v, 'city')"
          required
        />

        <FormInput
          v-model="form.street_address"
          type="text"
          label="Location Address"
          placeholder="eg No Bana Street"
          :invalid-message="$utils.validateRequiredField($v, 'street_address')"
          required
        />

        <FormInput
          v-model="form.postal_code"
          label="Postal Code"
          type="text"
          placeholder="eg 00233"
          :invalid-message="$utils.validateRequiredField($v, 'postal_code')"
          required
        />

        <MsisdnPhoneInput
          v-model="form.location_contact_number"
          label="Location contact number"
          :error-message="$utils.validateRequiredField($v, 'location_contact_number')"
          required
          @input="$v.form.location_contact_number.$touch()"
        />

        <SeButton
          :loading="loading"
          full
          class="mt-8"
          @click="submit"
        >
          {{ form.id ? 'Update location' : 'Create location' }}
        </SeButton>

        <p
          class="text-center"
          @click="close"
        >
          Cancel
        </p>
      </SeForm>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions } from 'vuex'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import modalMixin from '@/mixins/modal'

export default {
  name: 'AddEditLocation',

  mixins: [modalMixin],

  data() {
    return {
      form: {
        location_contact_number: '',
        city: '',
        postal_code: '',
        country: 'GH',
      },
      loading: false,
      name: 'add-edit-location-modal',
    }
  },

  events: {
    'location:add:open': function(){
      this.open()
    },
    'location:edit:open': function(data){
      this.open()
      this.form = data.params[0]
    },
  },

  validations: {
    form: {
      location_name: { required },
      street_address: { required },
      city: { required },
      location_contact_number: { required, maxLength: maxLength(15), minLength: minLength(9)  },
      postal_code: { required },
    },
  },

  methods: {
    ...mapActions({
      createLocation: 'locations/createLocation',
      updateLocation: 'locations/updateLocation',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true
      const data = await this.createLocation(this.form).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Location successfully added',
        })
        this.close()
      }

      this.loading = false
    },

    async update() {
      this.loading = true
      const data = await this.updateLocation(this.form).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Location successfully updated',
        })
        this.close()
      }

      this.loading = false
    },
  },
}
</script>
