<template>
  <div>
    <cv-form
      autocomplete="off"
      @submit.prevent=""
    >
      <!-- title -->
      <div class="space-y-8">
        <Titles
          v-model="form.name_prefix"
        />

        <div class="grid grid-cols-2 gap-8 my-8">
          <cv-text-input
            v-model="form.first_name"
            label="First name (required)"
            placeholder="Patient First Name"
            :invalid-message="$utils.validateRequiredField($v, 'first_name')"
            type="text"
            class="inherit-full-input"
          />

          <cv-text-input
            v-model="form.last_name"
            label="Last name (required)"
            placeholder="Patient last or family name"
            :invalid-message="$utils.validateRequiredField($v, 'last_name')"
            type="text"
            class="inherit-full-input"
          />
          <div class="space-y-8">
            <cv-text-input
              v-model="form.other_names"
              label="Other names"
              placeholder="Any other name"
              type="text"
              class="inherit-full-input"
            />
            <cv-date-picker
              v-model="form.birth_date"
              kind="single"
              class="w-full max-w-full inherit-full-input"
              placeholder="dd/mm/yyyy"
              date-label="Date of Birth"
              :cal-options="calOptions"
            />

            <MultiSelect
              v-model="form.gender"
              :options="genders"
              title="Gender (required)"
              placeholder="Male or female"
              track-by="code"
              label="display"
              custom-field="code"
              preselect
              :multiple="false"
            />
          </div>
          <div>
            <p class="bx--label">Capture or Upload Patient Photo</p>
            <Webcam />
            <FileUploadButton title="Or upload patient photo" />
          </div>
        </div>

        <div class="flex items-center justify-between mt-12 mb-6">
          <SeButton
            variant="outline"
            @click="cancel"
          >
            Cancel
          </SeButton>
          <div class="flex items-center">
            <SeButton
              :icon="icon"
              @click="save"
            >
              Next: Contact Info
            </SeButton>
          </div>
        </div>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Biodata',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        name_prefix: 'Mr',
      },
      next: 'ContactInfo',
      parent: 'Patients',
      calOptions: {
        'dateFormat': 'Y-m-d',
      },
    }
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      gender: { required },
    },
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
      genders: (state) => state.resources.genders,
    }),
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),

    save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      this.addToStoreData(this.form)
      this.$router.push({ name: this.next })
    },

    actionChange() {},
  },
}
</script>
