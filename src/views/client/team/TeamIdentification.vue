<template>
  <div>
    <p class="text-primary mb-4 text-left">Team Member Type</p>
    <!-- <div class="flex items-center space-x-6 w-full">
      <cv-radio-button
        v-for="(item, index) in titles"
        :key="index"
        v-model="form.team_member_type"
        name="group-1"
        :label="item.label"
        :value="item.value"
      />
    </div> -->
    <cv-select
      v-model="practitionerRole"
      label="Clinical Role"
      class="inherit-full-input my-8"
    >
      <template
        v-if="$v.form.practitioner_role.$error"
        slot="invalid-message"
      >
        A practitioner role is required
      </template>
      <cv-select-option
        disabled
        hidden
      >
        Nurse, Doctor etc
      </cv-select-option>
      <cv-select-option
        v-for="(role, index) in roles"
        :key="index"
        :value="role.id"
      >
        {{ role.name }}
      </cv-select-option>
    </cv-select>
    <cv-select
      v-model="form.practitioner_specialty"
      label="Specialty"
      class="inherit-full-input my-8"
    >
      <!-- <template
        v-if="$v.form.practitioner_specialty.$error"
        slot="invalid-message"
      >
        A practitioner specialty is required
      </template> -->
      <cv-select-option
        disabled
        hidden
      >
        Select one or more specialties
      </cv-select-option>
      <cv-select-option
        v-for="(specialty, index) in specialties"
        :key="index"
        :value="specialty.Code"
      >
        {{ specialty.Display }}
      </cv-select-option>
    </cv-select>
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
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'TeamIdentification',

  data() {
    return {
      form: {
        practitioner_specialty: '',
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
      currentUser: (state) => state.practitioners.currentUser,
      roles: (state) => state.roles.roles,
      specialties: (state) => state.resources.specialties,
      workspaces: (state) => state.workspaces.workspaces,
    }),
  },

  validations: {
    form: {
      practitioner_role: { required},
    },
  },

  methods: {
    ...mapActions({
      addToCurrentUser: 'practitioners/addToCurrentUser',
      createUser: 'practitioners/createUser',
      reset: 'practitioners/reset',
    }),

    async save() {
      this.form.practitioner_role = this.roles.find(r => r.id = this.practitionerRole)
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
  
      

      if(typeof(this.form.practitioner_specialty) == 'string'){
        this.form.practitioner_specialty = [this.form.practitioner_specialty]
      }

      this.addToCurrentUser(this.form)

      const data = await this.createUser(this.currentUser).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Member successfully added',
        })
        this.reset()
        this.$router.push({name: 'Team'})
      }

      this.loading = false
    },
  },
}
</script>
