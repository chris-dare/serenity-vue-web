<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <cv-form
        autocomplete="off"
        class="space-y-8"
      >
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} location</p>
        <cv-text-input
          v-model="form.location_name"
          type="text"
          label="Location name"
          placeholder="eg Valley Heights"
          :invalid-message="$utils.validateRequiredField($v, 'location_name')"
        />

        <cv-select
          v-model="form.country"
          label="Country"
          class="inherit-full-input"
          placeholder="Select a country"
        >
          <cv-select-option
            v-for="(country, index) in countries"
            :key="index"
            :value="country.alpha2Code"
          >
            {{ country.name }}
          </cv-select-option>
        </cv-select>

        <cv-text-input
          v-model="form.city"
          type="text"
          label="City"
          placeholder="eg Accra"
          :invalid-message="$utils.validateRequiredField($v, 'city')"
        />

        <cv-text-input
          v-model="form.street_address"
          type="text"
          label="Location Address"
          placeholder="eg No Bana Street"
          :invalid-message="$utils.validateRequiredField($v, 'street_address')"
        />

        <cv-text-input
          v-model="form.postal_code"
          label="Postal Code"
          type="text"
          placeholder="eg 00233"
          :invalid-message="$utils.validateRequiredField($v, 'postal_code')"
        />

        <MsisdnPhoneInput
          v-model="form.location_contact_number"
          label="Location contact number"
          :error-message="$utils.validateRequiredField($v, 'location_contact_number')"
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
      </cv-form>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState} from 'vuex'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AddEditLocation',

  data() {
    return {
      form: {
        location_contact_number: '',
        city: '',
        postal_code: '',
        country: 'GH',
      },
      visible: false,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      countries: (state) => state.global.countries,
    }),
  },

  events: {
    'location:add:open': function(){
      this.visible = true
    },
    'location:edit:open': function(data){
      this.visible = true
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
        this.visible = false
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
        this.visible = false
      }

      this.loading = false
    },

    close() {
      this.form = {
        country: 'GH',
      }
      this.$v.$reset()
      this.visible = false
    },
  },
}
</script>
