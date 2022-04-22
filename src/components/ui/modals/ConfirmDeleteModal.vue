<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template>
      <div class="w-full flex flex-col items-center justify-center pt-6 space-y-4">
        <p class="text-serenity-primary my-4 text-lg text-center">{{ label }}</p>
        <div class="flex items-center justify-between space-x-4">
          <SeButton
            variant="white"
            @click="visible = false"
          >
            Close
          </SeButton>
          <SeButton
            variant="danger"
            :loading="loading"
            @click="$emit('delete', data)"
          >
            {{ buttonLabel }}
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'

export default {
  name: 'ConfirmDeleteModal',

  mixins: [modalMixin],

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      visible: false,
      label: '',
      data: '',
      name: 'confirm-delete-modal',
      buttonLabel: 'Delete',
    }
  },

  events: {
    'confirm:delete:open': function(data){
      this.open()
      this.label = data.params[0].label
      this.data = data.params[0].data
      this.buttonLabel = data.params[0].buttonLabel || 'Delete'
    },
    'confirm:delete:close': function(){
      this.close()
    },
  },

  watch: {
    '$route'(){
      this.close()
    },
  },
}
</script>
