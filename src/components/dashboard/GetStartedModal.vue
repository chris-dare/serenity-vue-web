<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <SeForm>
        <p class="mb-1 font-bold text-xl mt-4">Welcome, {{ $utils.formatName(fullName) }}</p>
        <p class="mb-6">
          Please setup your location and department to get started
        </p>
        <div class="space-y-8">
          <MultiSelect
            v-model="form.location"
            :options="locations"
            track_by="id"
            label="location_name"
            custom-field="id"
            title="Where are you now?"
          />
          <MultiSelect
            v-model="form.starting_location"
            :options="locations"
            track_by="id"
            label="location_name"
            custom-field="id"
            title="Which clinic would you like to start in?"
          />
          <div>
            <div class="bx--label">Are you on shift now?</div>
            <cv-radio-group vertical>
              <cv-radio-button
                v-model="form.check"
                name="group-1"
                label="Yes"
                value="yes"
              />
              <cv-radio-button
                v-model="form.check"
                name="group-1"
                label="No"
                value="no"
              />
            </cv-radio-group>
          </div>
          <div>
            <DatePicker
              v-model="form.date"
              type="datetime"
              label="When is your shift ending?"
            />
          </div>
          <SeButton
            full
            label="Get Started"
            @click="visible = !visible"
          />
        </div>
      </SeForm>
    </template>
  </cv-modal>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'GetStartedModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {},
    }
  },

  computed: {
    ...mapGetters({
      fullName: 'auth/fullName',
    }),
    ...mapState({
      locations: (state) => state.locations.locations,
    }),
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>
