<template>
  <cv-form
    autocomplete="off"
    class="space-y-8"
    @submit.prevent
  >
    <p class="text-primary mb-4 text-left">Team Member Type</p>

    <MultiSelect
      v-model="form.practitioner_role"
      :options="roles"
      label="name"
      title="Clinical Role"
      placeholder="Select a clinical role"
      :error-message="$utils.validateRequiredField($v, 'practitioner_role')"
    />

    <MultiSelect
      v-model="form.practitioner_specialty"
      multiple
      :options="specialties"
      label="Display"
      track-by="Code"
      title="Specialty"
      placeholder="Select one or more specialties"
      :error-message="$utils.validateRequiredField($v, 'practitioner_specialty')"
    />
    <!-- <cv-text-input
      v-model="form.code"
      label="Medical Practice Code"
      placeholder="Medical Practice Code"
      class="inherit-full-input my-8"
    /> -->

    <!-- <p class="text-primary mt-8 mb-4 text-left">Workspace access</p>
    <div class="grid grid-cols-3">
      <cv-checkbox
        v-for="(workspace, index) in workspaces"
        :key="index"
        v-model="form.workspaces"
        :value="workspace.id"
        :label="workspace.workspace_name"
      />
    </div> -->

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          :to="{ name: 'Team' }"
          variant="outline"
        >
          Cancel
        </SeButton>
        <SeButton
          variant="secondary"
          :to="{ name: 'TeamContactInformation' }"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :loading="loading"
          :icon="icon"
          variant="default"
          @click="save"
        >
          Submit
        </SeButton>
      </div>
    </div>
  </cv-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { required, minLength } from 'vuelidate/lib/validators'
import isEmpty from 'lodash/isEmpty'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'TeamIdentification',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        practitioner_specialty: [],
        practitioner_role: '',
        team_member_type: '',
      },
      titles: [{label:'Clinical Staff', value: 'clinical_staff'}, {label:'Non-Clinical Staff', value: 'non_clinical_staff'}],
      loading: false,
      icon: ChevronRight,
      practitionerRole: '',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.practitioners.currentUser,
      roles: (state) => state.roles.roles,
      specialties: (state) => state.resources.specialties,
      workspaces: (state) => state.workspaces.workspaces,
    }),
  },

  validations: {
    form: {
      practitioner_role: { required },
      practitioner_specialty: { required, minLength: minLength(1) },
    },
  },

  created() {
    if (isEmpty(this.storeData)) {
      this.$router.push({name: 'TeamBiodata'})
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'practitioners/addToCurrentUser',
      createUser: 'practitioners/createUser',
      reset: 'practitioners/reset',
    }),

    async save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }
      this.loading = true

      this.addToStoreData(this.form)

      try {
        await this.createUser(this.form).catch(() => {
          this.reset()
          this.$router.push({name: 'Team'})
        })
      } catch (error) {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
      }

      this.loading = false
    },
  },
}
</script>
