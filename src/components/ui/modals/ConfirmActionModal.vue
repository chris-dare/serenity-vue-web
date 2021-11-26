<template>
  <BaseModal
    name="confirm-action-modal"
    close-aria-label="Close"
    size="sm"
    height="auto"
  >
    <template>
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
  </BaseModal>
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
      this.$modal.show('confirm-action-modal')
    },
  },

  watch: {
    '$route'(){
      this.visible = false
      this.$modal.hide('confirm-action-modal')
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
      this.$modal.hide('confirm-action-modal')
    },
  },
}
</script>