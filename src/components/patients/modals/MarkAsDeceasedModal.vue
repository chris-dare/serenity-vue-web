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
        <p class="text-lg font-semibold">Mark this patient as deceased</p>
        <cv-date-picker
          v-model="form.date"
          kind="single"
          class="w-full max-w-full inherit-full-input"
          placeholder="dd/mm/yyyy"
          label="Date"
        />
        <cv-text-input
          v-model="form.notes"
          label="Cause of death"
          type="text"
          placeholder="Enter cause of death"
          class="inherit-full-input w-full mb-8"
          :rows="10"
        />
        <div class="mt-12 flex flex-col items-center justify-center space-y-4">
          <SeButton
            full
          >
            Submit
          </SeButton>
          <p
            class="underline cursor-pointer"
            @click="modalVisible = false"
          >
            Go back
          </p>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'MarkAsDeceasedModal',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'profile:deceased:open': function(){
      this.visible = true
    },
    'profile:deceased:close': function(){
      this.visible = false
    },
  },
}
</script>
