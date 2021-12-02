<template>
  <BaseModal
    height="auto"
    scrollable
    :name="name"
    title="Service Details"
    @closed="close"
  >
    <template>
      <div class="space-y-8 left-button">
        <InfoBlock
          label="Service name"
          :description="form.healthcare_service_name"
        />

        <!-- tiers -->
        <div v-if="form.price_tiers.length">
          <div class="grid grid-cols-2 gap-8 border-b border-solid border-subtle py-2">
            <p class="text-secondary">Service Tier</p>
            <p class="text-secondary">Tier Price</p>
          </div>
          <div
            v-for="(tier, index) in form.price_tiers"
            :key="index"
            class="grid grid-cols-2 gap-8 py-2"
          >
            <p class="capitalize">{{ tier.display }}</p>
            <p>{{ tier.currency }}{{ $currency(tier.charge) }}</p>
          </div>
        </div>

        <!-- locations -->
        <div class="grid grid-cols-2 gap-8">
          <InfoBlock
            label="Service locations"
            :description="form.locations"
          />
          <InfoBlock
            label="Is service virtual?"
            :description="form.virtual"
          />

          <InfoBlock
            label="Is appointment required for this service?"
            :description="form.required"
          />

          <InfoBlock
            label="Slot duration"
            :description="`${form.duration} mins`"
          />

          <InfoBlock
            label="Service categories"
            :description="form.categories"
          />

          <InfoBlock
            label="Service specialties"
            :description="form.specialties"
          />
          <InfoBlock
            label="Service types"
            :description="form.types"
          />
        </div>
        

        <div class="border-b border-solid border-subtle w-full h-0" />

        <div class="grid grid-cols-2 gap-8">
          <InfoBlock
            label="Service available days"
            :description="form.available_days"
          />
          <InfoBlock
            label="Time range"
            :description="form.available_times"
          />
          <InfoBlock
            label="Description of unavailability"
            :description="form.description"
          />
          <InfoBlock
            label="Service unavailable dates"
            :description="form.unavailable_times"
          />
        </div>

        <div class="flex items-center justify-end space-x-4">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Cancel
          </SeButton>
          <SeButton @click="edit">
            Edit this service
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions } from 'vuex'
import modalMixin from '@/mixins/modal'

export default {
  name: 'ViewService',

  mixins: [modalMixin],

  data() {
    return {
      form: {
        price_tiers: [],
      },
      loading: false,
      name: 'view-service-modal',
    }
  },

  events: {
    'service:view:close': function(){
      this.close()
    },
    'service:view:open': function(data){
      this.open()
      this.form = { ...data.params[0] }
    },
  },

  methods: {
    ...mapActions({
      getService: 'services/getService',
    }),

    async edit() {
      await this.getService(this.form.id)
      this.$router.push({ name: 'ServiceInformation', query: {id: this.form.id}})
    },
  },
}
</script>
