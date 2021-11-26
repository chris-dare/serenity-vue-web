<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    title="Request diagnostic test"
  >
    <template>
      <div class="space-y-4">
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
  </BaseModal>
</template>

<script>
export default {
  name: 'RequestDiagnosticTestModal',

  data() {
    return {
      form: {},
      name: 'request-diagnostic-test-modal',
    }
  },

  events: {
    'profile:test:open': function(){
      this.$modal.show(this.name)
    },
    'profile:test:close': function(){
      this.$modal.hide(this.name)
    },
  },
}
</script>
