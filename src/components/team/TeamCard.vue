<template>
  <div
    class="bg-white w-full h-60 space-y-4 flex flex-col justify-center items-center"
  >
    <img
      v-if="user.photo"
      :src="user.photo"
      alt=""
      class="w-16 h-16 rounded-full"
    >
    <Avatar
      v-else
      class="w-16 h-16"
      :name="`${ user.first_name }  ${ user.last_name }}`"
    />
    
    <div class="space-y-1 flex items-center flex-col justify-center">
      <p class="font-semibold">{{ user.title }} {{ user.first_name }} {{ user.last_name }}</p>
      <p class="text-sm text-primary">General Practitioner</p>
      <p class="text-sm text-secondary">{{ user.email }}</p>
    </div>
    <p
      class="text-sm text-serenity-primary font-semibold cursor-pointer"
      @click="go"
    >
      View Profile
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TeamCard',

  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapState({
      cursor: (state) => state.practitioners.cursor,
    }),
  },

  methods: {
    ...mapActions({
      setCurrentUser: 'practitioners/setCurrentUser',
      getUser: 'practitioners/getUser',
    }),

    async go() {
      // this.setCurrentUser(this.user)
      await this.getUser(this.user.id)
      this.$router.push(`/team/${1}`)
    },
  },
}
</script>
