<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="space-y-8 left-button">
        <p class="text-lg font-semibold">Service Details</p>

        <InfoBlock
          label="Service name"
          :description="form.healthcare_service_name"
        />

        <!-- tiers -->
        <div>
          <div class="grid grid-cols-2 gap-8 border-b border-solid border-subtle py-2">
            <p class="text-secondary">Service Tier</p>
            <p class="text-secondary">Tier Price</p>
          </div>
          <div
            v-for="(tier, index) in form.price_tiers"
            :key="index"
            class="grid grid-cols-2 gap-8 py-2"
          >
            <p class="capitalize">{{ tier.name }}</p>
            <p>{{ tier.cost | formatMoney | toCedis }}</p>
          </div>
        </div>

        <!-- locations -->
        <div class="grid grid-cols-2 gap-8">
          <InfoBlock
            label="Service locations"
            :description="form.locations"
          />
          <InfoBlock
            label="Slot duration"
            :description="`${form.duration} mins`"
          />
          
          <InfoBlock
            label="Is appointment required for this service?"
            :description="form.healthcare_service_appointment_required ? 'Yes':'No'"
          />
          <InfoBlock
            label="Service categories"
            :description="form.categories"
          />
          <InfoBlock
            label="Service specialties"
            :description="form.specialties"
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
          <!-- <SeButton>
            Edit this service
          </SeButton> -->
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'ViewService',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
    }
  },

  events: {
    'service:view:close': function(){
      this.visible = false
    },
    'service:view:open': function(data){
      this.visible = true
      this.form = { ...data.params[0] }
    },
  },

  methods: {
    close() {
      this.visible = false
      this.form = {}
    },
  },
}
</script>
