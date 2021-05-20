<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <cv-form
        autocomplete="off"
        class="space-y-8"
        @submit.prevent
      >
        <p class="my-2 font-semibold">{{ form.id ? 'Edit' : 'New' }} {{ title }}</p>

        <!-- <SingleSelect
          v-model="form.role"
          title="Role"
          :options="roles"
          label="Role"
          placeholder="Select role"
          :custom-label="customLabel"
          :error-message="$utils.validateRequiredField($v, 'role')"
        /> -->

        <cv-text-area
          v-model="form.condition"
          type="text"
          label="Condition"
          placeholder="eg Malaria"
          :invalid-message="$utils.validateRequiredField($v, 'condition')"
          :rows="5"
          class="se-input-gray"
        />

        <cv-text-input
          v-model="form.rank"
          type="number"
          label="Rank"
        />

        <SeButton
          :loading="loading"
          full
          class="mt-8"
          @click="submit"
        >
          {{ form.id ? 'Update' : 'Create' }} {{ title }}
        </SeButton>

        <p
          class="text-center"
          @click="close"
        >
          Cancel
        </p>
      </cv-form>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'EncounterDiagnosisModal',

  data() {
    return {
      form: {
        role: '',
      },
      visible: false,
      loading: false,
      roles: [ 'admission-diagnosis', 'discharge-diagnosis', 'chief-complaint', 'comorbidity-diagnosis', 'pre-op-diagnosis', 'post-op-diagnosis', 'billing' ],
    }
  },

  computed: {
    title() {
      return this.form.role.includes('diagnosis') ? 'diagnosis' : 'complaint'
    },
  },

  events: {
    'encounter:add:diagnosis:open': function(data){
      this.visible = true
      this.form.role = data.params[0] || 'admission-diagnosis'
    },
    'encounter:add:diagnosis:edit': function(data){
      console.log('here')
      this.visible = true
      this.form = { ...data.params[0] }
    },
    'encounter:add:diagnosis:close': function(){
      this.visible = false
    },
  },

  validations: {
    form: {
      role: { required },
      condition: { required },
    },
  },

  methods: {
    ...mapActions({
      createDiagnosis: 'encounters/createDiagnosis',
      updateDiagnosis: 'encounters/updateDiagnosis',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true

      try {
        await this.createDiagnosis(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Diagnosis successfully added',
        })
        this.close()
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        await this.updateDiagnosis(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Diagnosis successfully updated',
        })
        this.close()
      } catch (error) {
        this.loading = false
      }
    },

    close() {
      this.form = {
        role: '',
      }
      this.$v.$reset()
      this.visible = false
    },

    customLabel (value) {
      return value.split('-').join(' ')
    },
  },
}
</script>
