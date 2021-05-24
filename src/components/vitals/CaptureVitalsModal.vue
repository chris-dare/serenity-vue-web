<template>
  <cv-modal
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <h1>Vitals</h1>
    </template>
    <template slot="content">
      <div class="grid grid-cols-2 gap-4">
        <MixedInput
          v-for="(vital, index) in units"
          :key="index"
          v-model="form[vital.code]"
          :suffix-text="vital.display"
          :label="vital.label"
        />
      </div>
      <div class="space-y-4 mt-8">
        <div class="flex items-center justify-between">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Go back
          </SeButton>
          <SeButton
            :loading="loading"
            @click="save"
          >
            Submit<ChevronRight class="w-4 h-4 text-white ml-4" />
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'CaptureVitalsModal',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
    }
  },

  events: {
    'capture:vitals:open': function(){
      this.visible = true
    },
    'capture:vitals:close': function(){
      this.close()
    },
  },

  computed: {
    ...mapState({
      vitalsOptions: state => state.resources.vitalsUnitTypes,
    }),

    ...mapGetters({
      currentEncounterLatestVitals: 'encounters/currentEncounterLatestVitals',
    }),

    units() {
      return this.vitalsOptions.map(option => {
        option.label = option.code === 'DEGREES_CELCIUS' ? 'temperature' : option.code.split('_').join(' ').toLowerCase()
        return option
      })
    },
  },

  watch: {
    currentEncounterLatestVitals: {
      immediate: true,
      handler(val, oldVal) {
        
        if (val !== oldVal) {
          this.form = { ...val }
        }
      },
    },
  },

  methods: {
    ...mapActions({
      createVitals: 'patients/createVitals',
    }),
    close() {
      this.form = {}
      this.visible = false
    },

    async save() {

      try {
        this.loading = true
        await this.createVitals({ payload: this.form, patient: this.$route.params.id })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
