<template>
  <div class="grid grid-cols-4 gap-4 overflow-hidden h-main">
    <div class="overflow-y-auto">
      <div class="space-y-8 p-8">
        <p class="font-semibold">Patient details</p>
        <div class="flex items-center space-x-4">
          <ImageBlock
            :url="patient.url"
            :alt="patient.name"
          />
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-secondary  capitalize">
              {{ patient.gender_age_description }}
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
              <p>Delayed</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <InfoSubBlock
            label="Blood Type"
            description="AB+"
          />
          <InfoSubBlock
            label="Weight"
            description="78kg"
          />
          <InfoSubBlock
            label="Height"
            description="172cm"
          />
        </div>
      </div>

      <div class="px-4">
        <div
          class="grid grid-cols-2"
        >
          <div
            v-for="(link, index) in links"
            :key="index"
            class="relative cursor-pointer flex-1 items-center justify-center flex border-b-2 py-4 border-serenity-primary-highlight"
            :class="[ link.slug === selected ? 'text-serenity-primary' : 'text-secondary' ]"
            @click="selected = link.slug"
          >
            {{ link.label }}
            <div
              class="w-full h-0.5 absolute bg-serenity-light-gray bottom-0"
              :class="{ 'bg-serenity-primary-highlight': link.slug === selected }"
            />
          </div>
        </div>
        <vue-page-transition name="fade">
          <component :is="selectedComponent" />
        </vue-page-transition>
      </div>
    </div>

    <div class="col-span-3 bg-white h-full p-8">
      <router-view />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapGetters } from 'vuex'
import EncounterBasicInfo from '@/components/patients/encounters/EncounterBasicInfo'
import EncounterActions from '@/components/patients/encounters/EncounterActions'

export default {
  name: 'EncountersIndex',

  components: { EncounterBasicInfo, EncounterActions },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      hasEncounter: false,
      visible: false,
      admitModal: false,
      selected: 'action',
    }
  },

  computed: {
    ...mapState({
    //   patient: (state) => state.patients.patients[0],
      workspaceType: (state) => state.global.workspaceType,
    }),

    ...mapGetters({
      patients: 'patients/patients',
    }),

    patient() {
      return this.patients[0]
    },

    links() {
      return [
        { label: 'Basic Info', slug: 'basic-info' },
        { label: 'Action', slug: 'action' },
      ]
    },

    selectedComponent() {
      if (this.selected === 'basic-info') {
        return 'EncounterBasicInfo'
      }

      return 'EncounterActions'
    },
  },

  //   beforeRouteEnter (to, from, next) {
  //     next(vm => vm.getEncounter(vm.id))
  //   },

//   methods: {
//     ...mapActions({
//       getEncounter: 'patients/getEncounter',
//     }),
//   },
}
</script>
