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
        />
        <cv-text-input
          v-model="form.street_address"
          label="Address"
          placeholder="eg No Bana Street"
        />
        <cv-text-input
          v-model="form.city"
          label="City"
          placeholder="eg No Bana Street"
        />
        <!-- <cv-text-input
          v-model="form.gps"
          label="GPS"
          placeholder="eg Longitude, Latitude"
        />
        <div>
          <p class="text-primary mb-2 text-left">Location photo</p>
          <FileUploadButton
            custom-class="h-12 bg-white"
            title="Or upload photo"
          />
        </div> -->
        
        <cv-button-skeleton
          v-if="loading"
        />
        <SeButton
          v-else
          full
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
import { mapActions } from 'vuex'
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

  events: {
    'location:add:open': function(){
      this.visible = true
    },
    'location:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
    },
  },

  methods: {
    ...mapActions({
      createLocation: 'locations/createLocation',
      updateLocation: 'locations/updateLocation',
    }),

    submit(){
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
