<template>
  <div>
    <p class="text-primary mb-4 text-left">Team Member Type</p>
    <div class="flex items-center space-x-6 w-full">
      <cv-radio-button
        v-for="(item, index) in titles"
        :key="index"
        v-model="form.team_member_type"
        name="group-1"
        :label="item.label"
        :value="item.value"
      />
    </div>
    <cv-select
      v-model="practitionerRole"
      label="Clinical Role"
      class="inherit-full-input my-8"
    >
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
    <cv-text-input
      v-model="form.code"
      label="Medical Practice Code"
      placeholder="Medical Practice Code"
      class="inherit-full-input my-8"
    />

    <!-- <p class="text-primary mt-8 mb-4 text-left">Workspace access</p>
    <div class="grid grid-cols-3">
      <cv-checkbox
        v-for="(workspace, index) in workspaces"
        :key="index"
        v-model="form.workspaces"
        :value="workspace.id"
        :label="workspace.name"
      />
    </div> -->

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary px-6 mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
        >
          Cancel
        </cv-button>
        <cv-button
          class="bg-black px-6"
          kind="primary"
          @click="$router.push({ name: 'TeamContactInformation' })"
        >
          Go back
        </cv-button>
      </div>
      <div class="flex items-center">
        <cv-button-skeleton v-if="loading" />
        <cv-button
          v-else
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary ml-6"
          @click="save"
        >
          Submit
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'TeamIdentification',

  data() {
    return {
      form: {
        // workspaces: [],
      },
      titles: [{label:'Clinical Staff', value: 'clinical_staff'}, {label:'Non-Clinical Staff', value: 'non_clinical_staff'}],
      // workspaces: ['Reception', 'ER', 'Outpatient', 'Inpatient', 'Pharmacy', 'Diagnostics'],
      loading: false,
      icon: ChevronRight,
      practitionerRole: '',
    }
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.practitioners.currentUser,
      roles: (state) => state.roles.roles,
      specialties: (state) => state.specialties.specialties,
      workspaces: (state) => state.workspaces.workspaces,
    }),
  },

  methods: {
    ...mapActions({
      addToCurrentUser: 'practitioners/addToCurrentUser',
      createUser: 'practitioners/createUser',
      reset: 'practitioners/reset',
    }),

    async save() {
      this.loading = true
      this.form.practitioner_role = this.roles.find(r => r.id = this.practitionerRole)
      console.log('form', this.form)
      this.addToCurrentUser(this.form)
      const data = await this.createUser(this.currentUser).catch((error) => {
        console.info(error)
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })
      console.info(data)

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
