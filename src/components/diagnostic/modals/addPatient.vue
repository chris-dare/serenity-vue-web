<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <div>
        <h1>Add new patient</h1>
        <!-- <p class="text-secondary text-sm">Add a new lab test to performed on patient</p> -->
      </div>
    </template>
    <template slot="content">
      <div>
        <div
          class="grid grid-cols-2 gap-8 py-3"
        >
          <cv-text-input
            v-model="form.first_name"
            type="text"
            label="First name"
            placeholder="First name"
          />
          <cv-text-input
            v-model="form.last_name"
            type="text"
            label="Last name"
            placeholder="Last name"
          />
        </div>
        <div
          class="grid grid-cols-2 gap-8 py-3"
        >
          <cv-select
            v-model="form.gender"
            label="Gender"
            class="inherit-full-input"
            placeholder="Male or female"
          >
            <cv-select-option value="male">Male</cv-select-option>
            <cv-select-option value="female">Female</cv-select-option>
          </cv-select>
          <cv-date-picker
            v-model="form.birth_date"
            kind="single"
            class="inherit-full-input"
            placeholder="dd/mm/yyyy"
            date-label="Date of birth"
          />
        </div>
        <div
          class="grid grid-cols-2 gap-8 py-3"
        >
          <MsisdnPhoneInput
            v-model="form.admin_phoneno"
            label="Phone number"
          />
          <cv-text-input
            v-model="form.admin_email"
            label="Email"
            placeholder="Email"
            class="inherit-full-input"
          />
        </div>
        <div
          class="grid grid-cols-2 gap-8 py-3"
        >
          <cv-text-input
            v-model="form.lab_request"
            label="Lab Request Type"
            placeholder="Lab request type"
            class="inherit-full-input"
          />
          <cv-text-input
            v-model="form.lab_number"
            label="Lab Number"
            placeholder="Lab number / ID"
            class="inherit-full-input"
          />
        </div>

        <cv-text-area
          v-model="form.diagnosis"
          label="Diagnosis"
          placeholder="Enter diagnosis here..."
          :rows="2"
          class="col-span-2  py-3"
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
            Next
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AddPatientModal',

  data() {
    return {
      visible: false,
      form: {},
      loading: false,
    }
  },

  events: {
    'labpatient:add:open': function() {
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
