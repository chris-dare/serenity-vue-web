<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    :click-to-close="false"
    hide-close
  >
    <template>
      <SeForm class="space-y-8">
        <div>
          <h1 class="text-lg font-semibold">Welcome {{ fullName }}</h1>
          <p>Select your location from the list below. Search using the search bar.</p>
        </div>

        <Search
          v-model="search"
          placeholder="Search for location"
        />

        <p>Showing {{ filteredLocations.length }} out of {{ locations.length }}</p>

        <div>
          <cv-radio-group
            data-cy="set-location-radio"
            vertical
          >
            <div
              v-for="(loca, index) in filteredLocations"
              :key="index"
              class="flex space-x-2 my-2"
            >
              <cv-radio-button
                v-model="location"
                :name="loca.location_name"
                :label="loca.location_name"
                :value="loca.id"
                data-cy="set-location-radio-button"
              />

              <p>{{ loca.location_name }}</p>
            </div>
          </cv-radio-group>
        </div>
        <SeButton
          :loading="loading"
          full
          data-cy="set-location-submit"
          @click="save"
        >
          Confirm
        </SeButton>
      </SeForm>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import modalMixin from '@/mixins/modal'

export default {
  name: 'SetLocationModal',

  mixins: [modalMixin],

  data() {
    return {
      location: null,
      search: null,
      loading: false,
      name: 'set-location-modal',
    }
  },

  validations: {
    location: {
      required,
    },
  },

  events: {
    'set:location:open': function(){
      this.open()
      this.location = this.$locationId
    },
  },

  computed: {
    ...mapState({
      locations: state => state.locations.locations,
    }),
    ...mapGetters({
      fullName: 'auth/fullName',
    }),

    filteredLocations() {
      if (!this.locations.length) return []
      return this.$utils?.getFilteredData(this.locations, this.search, ['location_name'])
    },
  },

  methods: {
    ...mapActions({
      setGlobalLocation: 'global/setGlobalLocation',
    }),

    async save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'A location is required!',
          type: 'error',
        })
        return
      }
      this.loading = true

      try {
        await this.setGlobalLocation(this.location)
        this.$toast.open({
          message: 'Location selected',
        })
        this.close()

      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
