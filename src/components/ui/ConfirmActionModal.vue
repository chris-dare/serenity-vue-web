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
        <p class="text-serenity-primary my-4 text-lg">Are you sure you want to delete {{ label }}</p>
        <div class="flex items-center justify-between space-x-4">
          <SeButton
            variant="white"
            @click="cancel"
          >
            Close
          </SeButton>
          <SeButton
            :variant="type == 'delete' ? 'danger' : 'default'"
            @click="confirm"
          >
            <span class="capitalize">{{ type }}</span>
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'ConfirmActionModal',

  data() {
    return {
      visible: false,
      label: '',
      type: '',
      data: null,
      callback: null,
    }
  },

  events: {
    'confirm-action-modal:open': function(_ev, {type, label, data, callback}){
      if(this.visible)return
      this.$resetData()
      this.type = type || 'delete'
      this.label = label
      this.data = data
      this.callback = callback
      this.visible = true
    },
  },

  watch: {
    '$route'(){
      this.visible = false
    },
  },

  methods: {
    async confirm() {
      this.visible = false
      if(this.callback){
        try {
          await this.callback(this.data)
        } catch {
          //empty
        }finally{
          this.cancel()
        }
      }
    },
    cancel() {
      this.visible = false
    },
  },
}
</script>