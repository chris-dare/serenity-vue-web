<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    title="Add notes"
    width="450px"
  >
    <template>
      <div class="space-y-4">
        <cv-text-area
          v-model="form.notes"
          label="Note details"
          placeholder="Describe what this note is about"
          :rows="10"
        />
        <div class="flex items-center justify-between mt-8">
          <SeButton variant="secondary">Go back</SeButton>
          <SeButton>Submit Note<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'AddNotesModal',

  components: { ChevronRight },

  data() {
    return {
      form: {},
      name: 'add-notes-modal',
    }
  },

  events: {
    'profile:notes:open': function(){
      this.$modal.show(this.name)
    },
    'profile:notes:close': function(){
      this.$modal.hide(this.name)
    },
  },
}
</script>
