<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-4">
        <p class="text-lg font-semibold">Request diagnostic test</p>
        <cv-select
          v-model="form.location"
          label="Choose lab type"
          class="w-100"
        >
          <cv-select-option
            disabled
            selected
            hidden
          >
            Choose a lab text to be performed
          </cv-select-option>
          <cv-select-option
            value="network"
          >
            In Patient Department
          </cv-select-option>
        </cv-select>
        <cv-text-area
          v-model="form.notes"
          label="Note"
          placeholder="Leave a note for the lab tecnician"
          :rows="10"
        />
        <SeButton>Add Test <Add class="w-4 h-4 text-white ml-4" /></SeButton>
        <div class="flex items-center justify-between">
          <SeButton variant="secondary">Cancel</SeButton>
          <SeButton>Send request<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'RequestDiagnosticTestModal',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'profile:test:open': function(){
      this.visible = true
    },
    'profile:test:close': function(){
      this.visible = false
    },
  },
}
</script>
