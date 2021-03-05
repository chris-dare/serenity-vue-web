<template>
  <div class="mx-auto w-4/5 space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Team members ({{ users.length }})</p>

      

      <div class="flex items-center space-x-2">
        <SeButton
          variant="secondary"
        >
          Upload CSV
          <Upload class="ml-4 w-5 h-5" />
        </SeButton>
        <SeButton
          @click="$router.push({name:'TeamBiodata'})"
        >
          Add new user 
          <Add class="ml-4 w-5 h-5 text-white" />
        </SeButton>
      </div>
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
          All ({{ users.length }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Reception ({{ 0 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          In Patient ({{ 0 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Out Patient ({{ 0 }})
        </cv-button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <TeamCard
        v-for="(item, index) in users"
        :key="index"
        :user="item"
        :details="item"
      />
    </div>
    <p
      v-if="!users.length"
      class="text-center w-full py-6"
    >
      No team members to show
    </p>
  </div>
</template>

<script>
import TeamCard from '@/components/team/TeamCard'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Team',

  components: {TeamCard},

  data() {
    return {
      search: '',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      users: (state) => state.practitioners.users,
    }),
    filteredUsers() {
      return this.users.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },

  // created() {
  //   this.refresh()
  // },

  methods: {
    ...mapActions({
      getUsers: 'practitioners/getUsers',
    }),

    async refresh() {
      this.loading = true
      // await this.getUsers()
      this.loading = false
    },
  },
}
</script>
