<template>
  <div class="mx-auto w-4/5 space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Team members (55)</p>

      <router-link
        :to="{name:'TeamBiodata'}"
        tag="cv-button"
        class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
        kind="primary"
      >
        Add new user 
        <Add class="ml-4 w-5 h-5 text-white" />
      </router-link>
    </div>

    <div>
      <cv-search
        v-model="search"
        placeholder="Search for user"
      />
      <div class="my-4 flex items-center space-x-2">
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          All (5)
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Reception ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          In Patient ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Out Patient ({{ 1 }})
        </cv-button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <TeamCard
        v-for="(item, index) in 10"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import TeamCard from '@/components/team/TeamCard'
import { mapActions } from 'vuex'
export default {
  name: 'Team',

  components: {TeamCard},

  data() {
    return {
      search: '',
    }
  },

  computed: {
    ...mapActions({
      getUsers: 'practitioners/getUsers',
    }),
  },

  created() {
    console.log('here')
    this.getUsers()
  },


}
</script>
