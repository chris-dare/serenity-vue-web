<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <div>
        <h1>Complete blood count</h1>
        <p class="text-secondary text-sm">Malaria</p>
        <p class="text-secondary text-sm">Dr Grey Strep</p>
      </div>
    </template>
    <template slot="content">
      <div class="grid grid-cols-3 gap-4">
        <MixedInput
          v-model="form.rbc"
          label="RBC"
          suffix-text="x10E6/ul"
          placeholder="Value"
        />
        <MixedInput
          v-model="form.haemo"
          label="Haemoglobin"
          suffix-text="g/dL"
          placeholder="Value"
        />
        <MixedInput
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
  </cv-modal>
</template>

<script>
export default {
  name: 'RequestLabModal',

  data() {
    return {
      visible: false,
      form: {},
      loading: false,
    }
  },

  events: {
    'request:add:open': function() {
      this.visible = true
    },
  },

  methods: {
    close() {
      this.visible = false
    },
  },
}
</script>
