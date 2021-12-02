<template>
  <BaseModal
    :name="name"
    title="Add notes"
    width="450px"
    @closed="close"
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
import modalMixin from '@/mixins/modal'

export default {
  name: 'AddNotesModal',

  components: { ChevronRight },

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      name: 'add-notes-modal',
    }
  },

  events: {
    'profile:notes:open': function(){
      this.open()
    },
    'profile:notes:close': function(){
      this.close()
    },
  },
}
</script>
