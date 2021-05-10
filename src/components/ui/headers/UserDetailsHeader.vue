<template>
  <div>
    <div class="flex justify-between items-center">
      <p class="text-secondary font-semibold text-xl">
        Welcome back,
        <span class="text-primary">{{ fullName || "Dr. Grey Strep" }}</span>
      </p>
      <div class="text-right">
        <p class="text-xs">
          {{ $date.formatDate(Date.now(), "EEEE, MMM dd, yyyy") }}
        </p>
        <p class="font-semibold">
          {{ $date.formatDate(Date.now(), "HH:mm a") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserDetailsHeader',
  computed: {
    ...mapGetters({
      fullName: 'auth/fullName',
    }),
  },
}
</script>
