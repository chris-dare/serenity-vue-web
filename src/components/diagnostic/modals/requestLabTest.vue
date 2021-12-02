<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template slot="title">
      <div>
        <h1>Complete blood count</h1>
        <p class="text-secondary text-sm">Malaria</p>
        <p class="text-secondary text-sm">Dr Grey Strep</p>
      </div>
    </template>
    <template>
      <div class="grid grid-cols-3 gap-4">
        <FormMixedInput
          v-model="form.rbc"
          label="RBC"
          suffix-text="x10E6/ul"
          placeholder="Value"
        />
        <FormMixedInput
          v-model="form.haemo"
          label="Haemoglobin"
          suffix-text="g/dL"
          placeholder="Value"
        />
        <FormMixedInput
          v-model="form.input"
          label="Hematocrit"
          suffix-text="%"
          placeholder="40"
        />
      </div>

      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="secondary"
          @click="close"
        >
          Go back
        </SeButton>
        <div class="flex items-center">
          <SeButton
            :loading="loading"
          >
            Submit
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'

export default {
  name: 'RequestLabModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'request-lab-modal',
    }
  },

  events: {
    'request:add:open': function() {
      this.open()
    },
  },
}
</script>
