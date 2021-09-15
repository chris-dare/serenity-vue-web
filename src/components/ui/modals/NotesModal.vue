<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="space-y-4">
        <p class="text-lg font-semibold">Add notes</p>
        <FormInput
          v-model="form.notes"
          :label="label"
          :placeholder="placeholder"
          :rows="5"
          :invalid-message="$utils.validateRequiredField($v, 'notes')"
          :required="required"
          type="textarea"
        />

        <div cl>
          <SeButton
            :loading="loading"
            full
            @click="save"
          >
            {{ saveLabel }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'NotesModal',

  props: {
    label: {
      type: String,
      default: 'Add note',
    },

    placeholder: {
      type: String,
      default: 'Add note',
    },

    saveLabel: {
      type: String,
      default: 'save',
    },

    required: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      visible: false,
      form: {},
      loading: false,
      callback: null,
    }
  },

  events: {
    'notes:open': function(){
      this.visible = true
    },
    'notes:edit': function(data) {
      this.visible = true
      this.form = { ...data.params[0] }
    },
    'notes:loading': function(data) {
      this.loading = data.params[0]
    },
    'notes:close': function() {
      this.close()
    },
  },

  validations() {
    return {
      form: {
        notes: {
          required: requiredIf(() => {
            return this.required
          }),
        },
      },
    }
  },

  methods: {
    close() {
      this.form = {}
      this.$v.$reset()
      this.visible = false
      this.loading = false
      this.$emit('close')
    },

    async save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }
      this.loading = true

      if (this.form.id) {
        this.$emit('update', this.form)
      } else {
        this.$emit('save', this.form.notes)
      }


    },
  },
}
</script>
