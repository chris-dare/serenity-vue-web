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
      <p class="text-sm text-primary">{{ roleName }}</p>
      <p class="text-sm text-secondary">{{ user.email }}</p>
    </div>
    <router-link
      class="text-sm text-serenity-router-linkrimary font-semibold cursor-pointer"
      :to="{name: 'TeamDetail', params: {id: user.id}}"
    >
      View Profile
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TeamCard',

  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },

  computed: {

    roleName() {
      if (!this.user || !this.user.practitioner_role) {
        return ''
      }
      return this.user.practitioner_role.name
    },
  },
}
</script>
