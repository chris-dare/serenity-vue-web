<template>
  <BaseModal
    :name="name"
    close-aria-label="Close"
    size="sm"
    @closed="close"
  >
    <template>
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
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'ActionsModal',

  mixins: [modalMixin],

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
      name: 'actions-modal',
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
      this.open()
      this.cancelButtonVariant = cancelButtonVariant
      this.confirmButtonVariant = confirmButtonVariant
    },
  },

  watch: {
    '$route'() {
      this.visible = false
      this.close()
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
          this.close()
        }
      } else {
        this.close()
      }
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
            this.close()
          }
        } else {
          this.close()
        }
      }
    },
  },
}
</script>