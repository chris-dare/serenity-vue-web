<template>
  <cv-modal
    :kind="type == 'delete' ? 'danger' : ''"
    size="xs"
    :visible="visible"
    :auto-hide-off="false"
    @modal-hidden="visible = false"
    @primary-click="confirm"
    @secondary-click="cancel"
  >
    <template slot="title">Are you sure you want to delete {{ label }}</template>
    <template slot="secondary-button">Cancel</template>
    <template slot="primary-button">Confirm</template>
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
      this.$resetData()
    },
  },
}
</script>