<template>
  <div class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
    {{ initials }}
  </div>
</template>

<script>
export default {
  name: 'Avatar',

  props: {
    name: {
      type: String,
      default: '',
    },
  },

  computed: {
    initials() {
      return this.getInitials(this.name)
    },
  },

  methods: {
    getInitials (string) {
      var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase()
            
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase()
      }
      return initials
    },
  },
}
</script>
