<template>
  <BaseModal
    :name="name"
    title="Add notes"
    @closed="close"
  >
    <template>
      <div class="space-y-4">
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
  </BaseModal>
</template>

<script>
import { requiredIf } from 'vuelidate/lib/validators'
import modalMixin from '@/mixins/modal'

export default {
  name: 'NotesModal',

  mixins: [modalMixin],

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
      form: {},
      loading: false,
      callback: null,
      name: 'notes-modal',
    }
  },

  events: {
    'notes:open': function(){
      this.open()
    },
    'notes:edit': function(data) {
      this.open()
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
    afterCloseFunction() {
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
