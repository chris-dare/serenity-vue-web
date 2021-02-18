<template>
  <div class="w-4/5 mx-auto">
    <div class="flex justify-between items-center">
      <p class="text-secondary font-semibold text-xl">
        Hello, <span class="text-primary">Dr. Grey Strep</span>
      </p>
      <div>
        <p class="text-xs">
          {{ $date.formatDate(Date.now(), "EEEE, MMM dd, yyyy") }}
        </p>
        <p class="font-semibold">
          {{ $date.formatDate(Date.now(), "HH:mm a") }}
        </p>
      </div>
    </div>
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6 my-4">
      <PatientCard
        @click="change(dashboard)"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        custom-class="w-full bg-white border-0"
      />
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
export default {
  name: 'Settings',

  components: { PatientCard },

  data() {
    return {
      selected: 'search',
      dashboardTypes: [
          {
          label: 'Edit Profile',
          description: '',
          type: 'user',
          value: 'profile',
        },
        {
          label: 'Security',
          description: 'Protect your account',
          type: 'security',
          value: 'security',
        },
      ],
    }
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'profile') {
        this.$trigger('profile:edit')
      }

      if (dashboard.value === 'security') {
        this.$trigger('profile:security')
      }
      
    },
  },
}
</script>
