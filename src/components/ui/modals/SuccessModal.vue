<template>
  <BaseModal
    :name="name"
  >
    <template>
      <div class="w-full flex flex-col items-center justify-center pt-6 space-y-4">
        <Checkmark class="text-serenity-primary w-12 h-12" />
        <p class="text-serenity-primary my-4 text-lg">{{ label }}</p>
        <SeButton
          @click="close"
        >
          Close
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import modalMixin from '@/mixins/modal'

export default {
  name: 'ProfileUpdateSuccessModal',

  components: { Checkmark },

  mixins: [modalMixin],

  data() {
    return {
      visible: false,
      label: '',
    }
  },

  events: {
    'success:open': function(data){
      this.open()
      this.label = data.params[0]
    },
    'success:close': function(){
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
