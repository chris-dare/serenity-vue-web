<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="cancel"
  >
    <template slot="content">
      <div class="w-full flex flex-col items-center justify-center pt-6 space-y-4">
        <p class="text-serenity-primary my-4 text-lg">{{ label }}</p>
        <div class="flex items-center justify-between space-x-4">
          <SeButton
            :variant="cancelButtonVariant"
            class="capitalize"
            @click="handleAction('cancel')"
          >
            {{ cancelButtonText }}
          </SeButton>
          <SeButton
            :variant="confirmButtonVariant"
            :loading="loading"
            @click="handleAction('confirm')"
          >
            <span class="capitalize">{{ confirmButtonText }}</span>
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'ActionsModal',

  data() {
    return {
      visible: false,
      label: '',
      type: '',
      data: null,
      callback: null,
      confirmButtonText: '',
      confirmCallback: null,
      cancelButtonText: '',
      cancelCallback: null,
      cancelButtonVariant: 'secondary',
      confirmButtonVariant: 'default',
      loading: false,
    }
  },

  events: {
    'actions-modal:open': function(_ev, { confirmButtonText = 'save', cancelButtonText = 'cancel', label, data, callback, cancel, type = 'success', cancelButtonVariant = 'secondary', confirmButtonVariant = 'default' }){
      if(this.visible)return
      this.$resetData()
      this.confirmButtonText = confirmButtonText
      this.cancelButtonText = cancelButtonText
      this.label = label
      this.type = type
      this.data = data
      this.confirmCallback = callback
      this.cancelCallback = cancel
      this.visible = true
      this.cancelButtonVariant = cancelButtonVariant
      this.confirmButtonVariant = confirmButtonVariant
    },
  },

  watch: {
    '$route'() {
      this.visible = false
    },
  },

  methods: {
    async confirm() {
      if(this.confirmCallback){
        try {
          this.loading = true
          await this.confirmCallback(this.data)
          this.loading = false
        } catch {
          //empty
        }finally{
          this.cancel()
        }
      } else {
        this.cancel()
      }
    },
    cancel() {
      this.visible = false
    },

    async handleAction(action) {
      if (action === 'confirm') {
        this.confirm()
      } else {
        if(this.cancelCallback){
          try {
            await this.cancelCallback(this.data)
          } catch {
          //empty
          }finally{
            this.cancel()
          }
        } else {
          this.cancel()
        }
      }
    },
  },
}
</script>