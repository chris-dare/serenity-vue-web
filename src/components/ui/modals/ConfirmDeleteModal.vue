<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollables
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
            Delete
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>

export default {
  name: 'ConfirmDeleteModal',

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
    }
  },

  events: {
    'confirm:delete:open': function(data){
      this.$modal.show(this.name)
      this.label = data.params[0].label
      this.data = data.params[0].data
    },
    'confirm:delete:close': function(){
      this.$modal.hide(this.name)
    },
  },

  watch: {
    '$route'(){
      this.$modal.hide(this.name)
    },
  },
}
</script>
