<template>
  <div
    class="mx-auto max-w-7xl space-y-4"
  >
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Team members ({{ dataCount }})</p>



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
        v-model="params.search"
        placeholder="Search for user"
        @input="searchData"
      />
    </div>

    <div class="grid grid-cols-4 gap-4">
      <TeamCard
        v-for="(item, index) in data"
        :key="index"
        :user="item"
        :details="item"
      />
    </div>

    
    <p
      v-if="noData"
      class="text-center w-full py-6"
    >
      No team members to show
    </p>

    <Pagination
      :value="params.page"
      :total="dataCount"
      :page-size="10"
      @change="actionOnPagination"
    />
  </div>
</template>

<script>
import TeamCard from '@/components/team/TeamCard'
import Pagination from '@/components/patients/Pagination'
import DataMixin from '@/mixins/paginated'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Team',

  components: { TeamCard, Pagination },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.practitioners.users,
    }),

    filters() {
      return [
        { display: `All (${this.dataCount })`, code: '' },
        { display: 'Reception', code: 'reception' },
        { display: 'Out patient', code: 'out-patient' },
        { display: 'In patient', code: 'in-patient' },
      ]
    },
  },

  created() {
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'practitioners/getUsers',
      reset: 'practitioners/reset',
    }),

    go() {
      this.reset()
      this.$router.push({name:'TeamBiodata'})
    },
  },
}
</script>
