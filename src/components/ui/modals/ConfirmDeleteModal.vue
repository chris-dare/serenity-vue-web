<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="w-full flex flex-col items-center justify-center pt-6 space-y-4">
        <p class="text-serenity-primary my-4 text-lg">{{ label }}</p>
        <div class="flex items-center justify-between space-x-4">
          <SeButton
            variant="white"
            @click="visible = false"
          >
            Close
          </SeButton>
          <SeButton
            variant="danger"
            @click="$emit('delete', data)"
          >
            Delete
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>

export default {
  name: 'ConfirmDeleteModal',

  data() {
    return {
      visible: false,
      label: '',
      data: '',
    }
  },

  events: {
    'confirm:delete:open': function(data){
      this.visible = true
      this.label = data.params[0].label
      this.data = data.params[0].data
    },
    'confirm:delete:close': function(){
      this.visible = false
    },
  },

  watch: {
    '$route'(){
      this.visible = false
    },
  },
}
</script>
