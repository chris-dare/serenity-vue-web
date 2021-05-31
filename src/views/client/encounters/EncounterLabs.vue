<template>
  <div class="relative h-main">
    <SeForm class="space-y-8">
      <p
        v-if="mode === 'update'"
        class="font-semibold"
      >
        Update Lab
      </p>
      <p
        v-else
        class="font-semibold"
      >
        Order Labs/ imaging
      </p>


      <div class="space-y-4">
        <MultiSelect
          v-model="form.service_request_category[0].display"
          title="Choose lab type"
          :multiple="false"
          :options="categories"
          :track_by="null"
          placeholder="Search or choose a lab text to be performed"
          :custom-label="customLabel"
          :invalid-message="$utils.validateRequiredField($v, 'service_request_category')"
        />

  
        <cv-text-area
          v-model="form.order_detail[0].display"
          label="Order details"
          placeholder="Details for this order"
          :rows="4"
          class="col-span-2"
          :invalid-message="$utils.validateRequiredField($v, 'order_detail')"
        />

        <cv-text-area
          v-model="form.patient_instruction"
          label="Note"
          placeholder="Leave a note for the lab tecnician"
          :rows="4"
          class="col-span-2"
        />

        <MultiSelect
          v-model="form.priority"
          title="Priority"
          :multiple="false"
          :options="priorities"
          track-by="code"
          label="display"
          custom-field="code"
          placeholder="Routine, ASAP, Urgent"
        />
        

        <div class="grid grid-cols-2 gap-4">
          <cv-text-input
            v-model="form.service_request_bodysite[0].display"
            type="text"
            label="Bodysite"
            placeholder="Body site"
            :invalid-message="$utils.validateRequiredField($v, 'service_request_bodysite')"
          />

          <cv-text-input
            v-model="form.code"
            type="text"
            label="Specimen"
            placeholder="Specimen"
          />
        </div>
      </div>

      <SeButton
        :loading="loading"
        :icon="add"
        @click="submit"
      >
        <template v-if="mode === 'create'">Add Another test</template>
        <template v-else>Update test</template>
      </SeButton>
    

      <div v-if="mode === 'create'">
        <p class="mb-2 font-semibold">Previous Labs</p>

        <div
          v-if="!currentEncounterServiceRequests.length"
          class="flex items-center my-4"
        >
          No labs available
        </div>
        <div
          v-else
          class="space-y-3"
        >
          <div
            v-for="(lab, index) in currentEncounterServiceRequests"
            :key="index"
            class="flex items-center space-x-4"
          >
            <div>
              {{ lab.order_detail[0].display }}
            </div>
            <div>-</div>
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4 cursor-pointer"
              @click="$router.push({ name: 'EditEncounterLab', params: { labId: lab.id } })"
            >
            <Trash
              class="w-5 h-5 cursor-pointer"
              @click="confirmDeleteLab(lab)"
            />
            <router-link
              class="underline"
              :to="{ name: 'EncounterReview', params: { ...$route.params } }"
            >
              view encounter
            </router-link>
          </div>
        </div>
      </div>
    </SeForm>

    <div
      v-if="mode === 'create'"
      class="mt-8 flex justify-between items-center w-full right-0 bottom-12"
    >
      <SeButton
        variant="secondary"
        :to="{name: 'EncounterDiagnosis', params: { id: $route.params.id }}"
      >
        Back to diagnosis
      </SeButton>
      <SeButton
        :icon="icon"
        :loading="loading"
        @click="submit(true)"
      >
        Submit and go to Medications
      </SeButton>
    </div>
    <ConfirmDeleteModal
      :loading="deleteLoading"
      @delete="removeLab"
    />
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'EncountersLabs',

  props: ['labId'],

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {
        order_detail: [{display: ''}],
        service_request_bodysite: [{display: ''}],
        service_request_category: [{display: ''}],
      },
      categories: [ 'laboratory-procedure', 'imaging', 'counselling', 'education', 'surgical-procedure' ],
      loading: false,
      deleteLoading: false,
    }
  },

  validations: {
    form: {
      service_request_category: { required },
      order_detail: {
        required,
        minLength: minLength(1),
        $each: {
          display: { required },
        },
      },
      service_request_bodysite: {
        required,
        minLength: minLength(1),
        $each: {
          display: { required },
        },
      },
    },
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      priorities: (state) => state.resources.priorities,
      encounter: (state) => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      currentEncounterServiceRequests: 'encounters/currentEncounterServiceRequests',
    }),
    mode() {
      return this.labId ? 'update' : 'create'
    },
  },

  watch: {
    labId() {
      this.init()
    },
  },

  methods: {
    ...mapActions({
      createServiceRequest: 'patients/createServiceRequest',
      updateServiceRequest: 'patients/updateServiceRequest',
      deleteServiceRequest: 'patients/deleteServiceRequest',
    }),

    init() {
      if(this.mode === 'update'){
        let lab = this.currentEncounterServiceRequests.find(el => el.id === this.labId)
        lab = JSON.parse(JSON.stringify(lab))
        Object.assign(this.form, lab)
      }
    },

    async removeLab(id) {
      this.deleteLoading = true
      try {
        await this.deleteServiceRequest(id).then(() => {
          this.$toast.open({
            message: 'Lab successfully deleted',
          })
        })
        this.deleteLoading = false
        this.$trigger('confirm:delete:close')
      /* eslint-disable-next-line */
      } catch (error) {
      }
      this.deleteLoading = false
    },

    submit(reroute= false) {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill all required fields')
        return
      }

      if (this.mode === 'update') {
        this.update()
      } else {
        // this.form.requesting_practitioner_role = this.provider.practitionerRoleId
        this.form.patient = this.$route.params.id
        this.form.location = this.location.id
        this.form.encounter = this.encounter.id
        this.save(reroute)
      }
    },

    async save(reroute) {
      this.loading = true

      try {
        await this.createServiceRequest([this.form])
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully added',
        })
        this.close()
        if (reroute) {
          this.$router.push({ name: 'EncounterMedications'})
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      this.loading = true
      try {
        await this.updateServiceRequest(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully updated',
        })
        this.$router.push({ name: 'EncounterLabs' })
        this.close()
        /* eslint-disable-next-line */
      } catch (error) {
      }
      this.loading = false
    },

    confirmDeleteLab(lab) {
      this.$trigger('confirm:delete:open', { data: lab.id, label: 'Are you sure you want to delete this lab?' })
    },

    close() {
      this.form = {
        order_detail: [{display: ''}],
        service_request_bodysite: [{display: ''}],
        service_request_category: [{display: ''}],
      }
      this.$v.$reset()
    },

    customLabel (value) {
      return value.split('-').join(' ')
    },
  },
}
</script>
