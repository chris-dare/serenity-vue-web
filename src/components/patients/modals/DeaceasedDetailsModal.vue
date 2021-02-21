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
        <p class="text-lg font-semibold">Deceased patient information</p>
        <InfoBlock
          label="Cause of death"
          description="Retroviral infection"
          description-color="text-serenity-primary"
        />
        <div class="grid grid-cols-2 gap-4">
          <InfoBlock
            label="Date of death"
            description="Nov. 10, 2020"
          />
          <InfoBlock
            label="Time of death"
            description="9:00 am"
          />
        </div>
        <InfoBlock
          label="Reported by"
        >
          <div class="flex items-center py-2">
            <img
              class="w-10 h-10 rounded-full mr-3"
              :src="$faker().image.image()"
              alt=""
            >
            <div>
              <p>Dr. {{ $faker().name.findName() }}</p>
              <p class="text-secondary text-xs">
                General Practitioner
              </p>
            </div>
          </div>
        </InfoBlock>
        <SeButton
          variant="secondary"
          full
        >
          Close
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'DeceasedDetailsModal',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'profile:deceased-info:open': function(){
      this.visible = true
    },
    'profile:deceased-info:close': function(){
      this.visible = false
    },
  },
}
</script>
