<template>
  <div
    class="mx-auto max-w-7xl space-y-4"
  >
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Team members ({{ users.length }})</p>



      <div
        v-if="$userCan('practioners.write')"
        class="flex items-center space-x-2"
      >
        <SeButton
          variant="secondary"
        >
          Upload CSV
          <Upload class="ml-4 w-5 h-5" />
        </SeButton>
        <SeButton
          @click="go"
        >
          Add new team member
          <Add class="ml-4 w-5 h-5 text-white" />
        </SeButton>
      </div>
    </div>

    <div>
      <Search
        v-model="search"
        placeholder="Search for user"
      />

      <FilterGroup
        v-model="search"
        :filters="filters"
        class="my-3"
      />
    </div>

    <div class="grid grid-cols-4 gap-4">
      <TeamCard
        v-for="(item, index) in filteredUsers"
        :key="index"
        :user="item"
        :details="item"
      />
    </div>
    <p
      v-if="!filteredUsers.length"
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
      return this.users.filter(data => !this.search || data.first_name.toLowerCase().includes(this.search.toLowerCase()) || data.last_name.toLowerCase().includes(this.search.toLowerCase()))
    },

    filters() {
      return [
        { display: `All (${this.users.length })`, code: '' },
        { display: 'Reception', code: 'reception' },
        { display: 'Out patient', code: 'out-patient' },
        { display: 'In patient', code: 'in-patient' },
      ]
    },
  },

  // created() {
  //   this.refresh()
  // },

  methods: {
    ...mapActions({
      getUsers: 'practitioners/getUsers',
      reset: 'practitioners/reset',
    }),

    async refresh() {
      this.loading = true
      // await this.getUsers()
      this.loading = false
    },

    go() {
      this.reset()
      this.$router.push({name:'TeamBiodata'})
    },
  },
}
</script>
