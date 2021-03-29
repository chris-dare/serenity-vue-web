<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} location</p>
        <cv-text-input
          v-model="form.location_name"
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
          label="City"
          placeholder="eg Accra"
          :invalid-message="$utils.validateRequiredField($v, 'city')"
        />

        <cv-text-input
          v-model="form.street_address"
          label="Location Address"
          placeholder="eg No Bana Street"
          :invalid-message="$utils.validateRequiredField($v, 'street_address')"
        />

        <cv-text-input
          v-model="form.postal_code"
          label="Postal Code"
          placeholder="eg 00233"
          :invalid-message="$utils.validateRequiredField($v, 'postal_code')"
        />

        <div>
          <p class="bx--label">Location contact number</p>
          <VuePhoneNumberInput
            v-model="form.location_contact_number"
            default-country-code="GH"
            valid-color="#0B6B74"
            required
          />
          <p
            v-if="$utils.validateRequiredField($v, 'location_contact_number')"
            class="error"
          >
            Location contact number is required
          </p>
        </div>
        
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
          @click="visible = false"
        >
          Cancel
        </p>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState} from 'vuex'
import { required } from 'vuelidate/lib/validators'
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
      location_contact_number: { required },
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
  },
}
</script>
